import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ThreadClient from './ThreadClient'

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title, body')
    .eq('slug', slug)
    .single()

  if (!post) return { title: 'Post not found' }

  return {
    title: `${post.title} | SoberNation Community`,
    description: post.body.slice(0, 160),
    openGraph: { title: post.title, description: post.body.slice(0, 160) },
  }
}

export default async function ThreadPage({ params }: Props) {
  const { category, slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select(`
      id, title, body, username, upvotes, comment_count,
      is_pinned, is_hidden, created_at,
      categories(slug, name, icon)
    `)
    .eq('slug', slug)
    .single()

  if (!post || post.is_hidden) notFound()

  // Schema markup for SEO
  const threadUrl = `https://www.sobernation.co.uk/community/${category}/${slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: post.title,
    text: post.body,
    // Community members have no public profile pages, so the author URL points
    // at the thread they wrote (Search Console requires author.url).
    author: { '@type': 'Person', name: post.username || 'SoberNation member', url: threadUrl },
    datePublished: post.created_at,
    url: threadUrl,
    mainEntityOfPage: threadUrl,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ThreadClient post={post as unknown as Parameters<typeof ThreadClient>[0]['post']} categorySlug={category} />
    </>
  )
}
