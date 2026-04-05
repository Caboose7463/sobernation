import { NextRequest, NextResponse } from 'next/server'
import { seedStories } from '../../../../lib/stories'

const ADMIN_PIN = process.env.ADMIN_PIN ?? '7463'

// Seed stories - pre-written authentic UK recovery stories.
// Images: set to null initially, will be patched when blob URLs are known.
const SEED_DATA = [
  {
    name: 'Sarah',
    location: 'London',
    substance: 'Alcohol',
    daysSober: 730,
    imageUrl: null,
    status: 'approved' as const,
    story: `I started drinking socially at university, but by my late 20s I was opening a bottle of wine the moment I got home from work. By 32 I was drinking two bottles a day and hiding empties in my car. I told myself it was stress, that I deserved it, that I was managing fine.

My husband found the empties during a Sunday tidy. He didn't shout. He just looked at me and said "I'm scared for you." That quiet sentence broke something open in me.

I went to my GP the next morning, shaking so badly I could barely hold my phone. She referred me to the local drug and alcohol service and I was in a detox programme within two weeks. Medically supervised, which was important — I didn't realise how dangerous it could be to stop suddenly.

After detox, I started attending AA meetings in Hackney every Thursday. I was terrified the first time. I sat at the back and didn't say a word. But I came back. And then back again.

That was two years ago. I still go to that Thursday meeting. My marriage is not perfect, but it's real now. I'm present for my children in a way I wasn't before. Life is harder in some ways — I can't blur it anymore — but it's mine.`
  },
  {
    name: 'Mark',
    location: 'Manchester',
    substance: 'Alcohol & cocaine',
    daysSober: 547,
    imageUrl: null,
    status: 'approved' as const,
    story: `My drinking was always chaotic, but cocaine made everything worse. I'd tell myself I was just using it to drink less — one would cancel out the other. It doesn't work like that.

I was a sales manager. Good job, good salary, high-functioning by most measures. Until I wasn't. I missed a major client meeting because I'd been up for 36 hours. My boss sat me down. I thought I was being sacked. Instead, he told me about his own journey — five years sober. He referred me to our employee assistance programme.

The EAP got me into a private day programme in Salford. Four weeks of intensive outpatient therapy while my wife held things together at home. It was humbling and necessary.

Eighteen months on, I'm still in sales. Still wired — that hasn't changed — but now I run in the mornings instead. The clarity I have now versus then is almost unbelievable to me. I didn't know I was living in fog until the fog lifted.`
  },
  {
    name: 'Emma',
    location: 'Birmingham',
    substance: 'Cannabis',
    daysSober: 365,
    imageUrl: null,
    status: 'approved' as const,
    story: `People don't take cannabis addiction seriously. "It's just weed" — I said that myself for years. But I was smoking from the moment I woke up until I fell asleep. I couldn't eat without it, couldn't watch a film, couldn't socialise. My entire daily structure was built around getting and using.

I was 26 when I finally admitted it. I'd been trying to apply for jobs after graduating and kept withdrawing from interviews. I was anxious, paranoid, sleeping terribly. I'd burnt through most of my savings.

My mum found the FRANK helpline number and rang on my behalf. They guided me to a local service where I got one-to-one drug counselling for six months.

It was not easy. The first few weeks of withdrawal were genuinely horrendous — vivid nightmares, sweating, zero appetite, rage I didn't know I had in me. But it passes.

A year on, I have a job. A real one. I sleep. I dream normal dreams. I'm funny again — my friends have noticed.`
  },
  {
    name: 'James',
    location: 'Glasgow',
    substance: 'Heroin',
    daysSober: 1825,
    imageUrl: null,
    status: 'approved' as const,
    story: `I'm 51 years old and I've been clean for five years. I want to say that first because I think people need to hear it's possible, no matter how far down you've gone.

I started using at 19. The usual story — wrong crowd, experimenting, then one day it's not a choice anymore. I spent most of my 20s and 30s cycling in and out of homelessness, short prison sentences, failed detoxes. I lost count of the times I detoxed and relapsed within weeks.

What worked for me the fifth time — or the sixth, I've lost count — was methadone maintenance combined with proper support. Not just a script and a wave goodbye. Actual key workers who knew my name. A recovery group where I met people who'd been where I was and had built lives. Slowly I began to believe it might be possible for me too.

I have a flat. I work two days a week at the recovery café where I first found help. I'm not invisible anymore. If you're in the middle of it, I promise you: it is possible. Just don't stop trying.`
  },
  {
    name: 'Rachel',
    location: 'Bristol',
    substance: 'Prescription drugs',
    daysSober: 240,
    imageUrl: null,
    status: 'approved' as const,
    story: `Mine started with a back injury and a prescription for codeine. My GP was attentive and careful. I wasn't. I started stockpiling. Ordering online. Taking twice the dose. Telling myself it was pain management.

By the time I admitted to anyone what was happening, I was taking 30+ tablets a day and had spent thousands online. My pharmacist was the first person to say something directly. She didn't judge me — she referred me quietly to the local drug service.

The shame was the hardest part. I'm a nurse. I knew exactly what I was doing to my body and I couldn't stop.

The drug service was brilliant. Non-judgmental, structured, and they understood prescription dependency specifically. A slow taper over four months. Regular check-ins. Group sessions with others who'd been through the same thing — that was eye-opening. I thought I was uniquely pathetic. I was not.

Eight months on, I'm back at work. Still in recovery, still processing, but sober and present for my life again.`
  },
  {
    name: 'Tom',
    location: 'Leeds',
    substance: 'Cocaine',
    daysSober: 420,
    imageUrl: null,
    status: 'approved' as const,
    story: `I was 27 when I realised I had a problem. Which sounds obvious now, because I was spending £800 a month on cocaine, couldn't get through a social event without it, and my girlfriend had moved out. But addiction is very good at lying to you about what's happening.

It started at uni, continued into work. I worked in tech, long hours, high pressure, and everyone around me seemed to be doing the same thing. Normalised doesn't even cover it.

My GP was amazing. Didn't flinch, didn't lecture me. She referred me to a local service where I had 12 weeks of structured therapy. One of the most valuable things was understanding the triggers — boredom, stress, social anxiety. Learning to sit with those feelings without reaching for something.

I won't pretend it's been smooth. I relapsed at five months — messily, briefly. I told my key worker the next day and we got back on track. That honesty made all the difference.

Fourteen months sober now. Bought a road bike. Turns out exercise does actually help.`
  },
  {
    name: 'Karen',
    location: 'Edinburgh',
    substance: 'Alcohol',
    daysSober: 1095,
    imageUrl: null,
    status: 'approved' as const,
    story: `I'm a GP. I know the Audit-C questionnaire by heart. I've administered it hundreds of times. I scored 12 out of 12 on my own drinking and told myself it wasn't that bad.

Doctors are very good at rationalising. I was also exhausted, isolated, and going through a divorce. The wine felt necessary. By 2022 I was drinking a bottle and a half each evening and bringing vodka to work in a water bottle on difficult days.

A colleague noticed. She sat me down in her office, closed the door, and said the words I needed someone else to say. She contacted occupational health on my behalf.

I took six weeks off for a residential programme in Edinburgh. The most humbling, necessary, transformative six weeks of my life. Coming home was hard. Returning to work was hard. But my sobriety is now three years old.

I now ask my patients about alcohol differently. I have more patience for the shame and the denial — because I understand it completely.`
  },
  {
    name: 'David',
    location: 'Liverpool',
    substance: 'Heroin & alcohol',
    daysSober: 730,
    imageUrl: null,
    status: 'approved' as const,
    story: `I used for 12 years. I want to be clear about that because I think it matters — recovery doesn't have a time limit and there's no point at which it becomes too late.

My journey went through Narcotics Anonymous more than treatment, though I accessed both. The NA fellowship in Liverpool was where I found people who didn't see me as a lost cause. That changes something in you — being treated like you have a future.

I won't sugarcoat the process. I relapsed multiple times in the first two years of attempting recovery. Each time I got back up. Each time was different because I was different.

Two years clean. I have a son who is three years old. He has never known a version of me that was using. That matters more to me than anything else I could put into words.

For anyone reading this who thinks it's too late or they've failed too many times: you haven't. The next attempt might be the one.`
  },
  {
    name: 'Sophie',
    location: 'Cardiff',
    substance: 'Alcohol',
    daysSober: 180,
    imageUrl: null,
    status: 'approved' as const,
    story: `I'm 24, which I think surprises people. Alcohol problems aren't just a middle-aged thing. I'd been drinking heavily since I was 17 and by 22 it was the kind of drinking that gets in the way of everything.

University was a blur. I passed, somehow — but I don't have many real memories from those years. That scares me now in a way it didn't at the time.

What prompted me to stop was a hospital visit. Nothing dramatic, but the doctor who treated me for dehydration was very direct: "You're young and you're doing real damage." She referred me to a young person's drug and alcohol service.

I'd expected the service to be dismissive or to lecture me. Instead they matched me with a young female key worker who genuinely listened. Twelve weeks of sessions. We worked through what I was drinking to manage — anxiety, mostly, and a sense that I didn't fit anywhere.

Six months sober now. I run a small blog about early sobriety. I'm still figuring out who I am sober, which feels like the right kind of problem to have.`
  },
  {
    name: 'Mike',
    location: 'Newcastle',
    substance: 'Alcohol',
    daysSober: 1460,
    imageUrl: null,
    status: 'approved' as const,
    story: `Four years ago I found a bruise on my side that wouldn't explain itself. The doctor sent me for blood tests. My liver enzymes were, in his words, "alarming." He told me that if I continued drinking at the rate I was, I had perhaps five years.

I was 46. I have three kids.

I went home, poured the contents of my drinks cabinet down the sink, and rang the alcohol service the next morning. I went through a medically supervised home detox — four days of the worst physical experience of my life, with daily nurse check-ins. I cannot stress enough: don't stop drinking suddenly without medical supervision if you drink heavily. It can be dangerous.

Then I started AA. Then I started counselling. Four years later, my liver enzymes are normal. I go hillwalking. I've been to parents' evenings, sports days, and nativity plays that I might not otherwise have seen.

Not a day goes by that I'm not grateful. Not a day.`
  },
]

// POST /api/stories/seed — one-time seed endpoint (PIN protected)
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  if (body.pin !== ADMIN_PIN) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  try {
    await seedStories(SEED_DATA)
    return NextResponse.json({ success: true, count: SEED_DATA.length })
  } catch (err) {
    console.error('Seed error:', err)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
