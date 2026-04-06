/**
 * app/api/cron/generate-article/route.ts
 *
 * Vercel cron — runs every 2 days at 06:00 UTC.
 * Picks the next pending article from article_queue,
 * generates it with GPT-4o-mini, fetches an Unsplash hero,
 * and saves to the articles table.
 */

import { NextResponse } from 'next/server'
import { getSupabase, pickAuthor, slugify, readingTime, fetchUnsplashImage } from '../../../../lib/articles'

export const runtime = 'nodejs'
export const maxDuration = 60

const SYSTEM_PROMPT = `You are a specialist addiction recovery writer for SoberNation, a leading UK addiction recovery platform. 

Write in a personal, conversational but professional tone — like a knowledgeable friend who works in addiction medicine. Be warm, hopeful, and completely non-judgmental. Use UK spelling throughout (behaviour not behavior, centre not center, etc.).

Include real, accurate statistics and reference NHS/UK services where relevant. Focus on practical, actionable advice. Write as if speaking to someone who may be in crisis or supporting someone they love.

Always end articles on a hopeful, empowering note. Never be preachy or clinical.`

const USER_PROMPT = (title: string, keywords: string[], location: string | null) => `
Write a comprehensive, SEO-optimised article for SoberNation with the title: "${title}"

${location ? `This article is specifically about addiction and recovery resources in ${location}, UK.` : ''}
${keywords.length ? `Key topics to cover: ${keywords.join(', ')}` : ''}

Return ONLY valid JSON in this exact format:
{
  "title": "The article title (can slightly refine from the brief)",
  "excerpt": "2 sentences, compelling, summarises the article",
  "content": "Full article in markdown (800-1200 words). Use ## for H2 subheadings. Include a mix of paragraphs, bullet points, and a practical tips section. End with a 'Getting Help' or 'Next Steps' section.",
  "tags": ["array", "of", "3-6", "lowercase", "topic", "tags"],
  "location_slugs": ["only-if-location-specific-slug", "e.g-london"],
  "faq": [
    {"q": "Question?", "a": "Answer in 2-3 sentences."},
    {"q": "Question?", "a": "Answer."},
    {"q": "Question?", "a": "Answer."}
  ],
  "unsplash_query": "2-3 words for the hero image search, e.g. 'recovery hope nature'"
}
`

export async function GET(req: Request) {
  // Auth check
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const supabase = getSupabase()

  // Pick next pending item
  const { data: item, error: qErr } = await supabase
    .from('article_queue')
    .select('*')
    .eq('status', 'pending')
    .order('priority', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  if (qErr || !item) {
    return NextResponse.json({ message: 'Queue empty or error', error: qErr?.message })
  }

  // Mark as processing immediately to avoid duplicates
  await supabase.from('article_queue').update({ status: 'processing' }).eq('id', item.id)

  try {
    // 1. Generate article with GPT-4o-mini
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.75,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: USER_PROMPT(item.title, item.keywords ?? [], item.location_slug) },
        ],
      }),
    })

    if (!openaiRes.ok) {
      const err = await openaiRes.text()
      throw new Error(`OpenAI error: ${err}`)
    }

    const openaiData = await openaiRes.json()
    const raw = openaiData.choices?.[0]?.message?.content
    const generated = JSON.parse(raw)

    // 2. Fetch Unsplash image
    const imgQuery = generated.unsplash_query ?? item.topic ?? 'recovery wellness'
    const image = await fetchUnsplashImage(imgQuery)

    // 3. Build FAQ markup and append to content
    let fullContent = generated.content ?? ''
    if (generated.faq?.length) {
      fullContent += '\n\n## Frequently Asked Questions\n\n'
      for (const faqItem of generated.faq) {
        fullContent += `**${faqItem.q}**\n\n${faqItem.a}\n\n`
      }
    }

    // 4. Pick author
    const author = pickAuthor(item.id)
    const slug = slugify(generated.title ?? item.title)
    const mins = readingTime(fullContent)

    // 5. Build location_slugs
    const locationSlugs: string[] = generated.location_slugs ?? []
    if (item.location_slug && !locationSlugs.includes(item.location_slug)) {
      locationSlugs.push(item.location_slug)
    }

    // 6. Save article
    const { data: article, error: aErr } = await supabase
      .from('articles')
      .insert({
        title: generated.title ?? item.title,
        slug,
        excerpt: generated.excerpt,
        content: fullContent,
        author_name: author.name,
        author_slug: author.slug,
        topic: item.topic,
        tags: generated.tags ?? [],
        location_slugs: locationSlugs,
        hero_image_url: image?.url ?? null,
        hero_image_alt: image?.alt ?? null,
        read_time_mins: mins,
        status: 'published',
        published_at: new Date().toISOString(),
      })
      .select('id, slug')
      .single()

    if (aErr) throw new Error(`Supabase insert: ${aErr.message}`)

    // 7. Mark queue item done
    await supabase.from('article_queue').update({
      status: 'done',
      article_id: article.id,
      processed_at: new Date().toISOString(),
    }).eq('id', item.id)

    return NextResponse.json({ success: true, slug: article.slug, title: generated.title })

  } catch (e) {
    // Mark failed
    await supabase.from('article_queue').update({ status: 'failed' }).eq('id', item.id)
    console.error('[generate-article]', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
