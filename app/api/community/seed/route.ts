import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

const PIN = '7463'

// Seed users (anonymous usernames, no real accounts needed for read-only seed)
const USERS = [
  { username: 'quiet_storm_42' },
  { username: 'hopeful_helen_84' },
  { username: 'one_day_at_a_time' },
  { username: 'still_standing_mark' },
  { username: 'mum_of_three_sober' },
  { username: 'lapsed_but_trying' },
  { username: 'sober_since_tuesday' },
  { username: 'northernlass_recovery' },
  { username: 'justkeepswimming99' },
  { username: 'davefromleeds' },
  { username: 'sunrisesober' },
  { username: 'clearheaded_finally' },
  { username: 'tired_but_here' },
  { username: 'recovering_slowly' },
  { username: 'grateful_for_today' },
]

const SEED_DATA = [
  // SUPPORT
  {
    category: 'support',
    username: 'quiet_storm_42',
    title: 'relapsed last night after 14 months. feeling utterly broken',
    body: 'i dont even know why i did it. everything was going well. work is ok, me and sarah are in a better place. i just... did it. 14 months gone and i feel sick with shame. not sure why im writing this here tbh. just needed somewhere to put it',
    comments: [
      { username: 'one_day_at_a_time', body: '14 months isnt gone. its still in you. a slip doesnt erase what you built. ive been where you are twice and youre still here which means something. please dont spiral on your own tonight' },
      { username: 'hopeful_helen_84', body: 'oh god i remember this feeling so well. that sick cold shame in your stomach. please be kind to yourself right now. you reached out which is exactly what you should do. thats not nothing' },
      { username: 'quiet_storm_42', body: 'thank you both. im not going to pick up again today. thats all i can promise right now' },
      { username: 'still_standing_mark', body: 'one day is everything mate. ring your sponsor or whoever you trust. dont sit with this alone' },
      { username: 'northernlass_recovery', body: 'I relapsed at 11 months and it felt like the world ended. Ill be 3 years clean in June. This is not the end of your story' },
      { username: 'quiet_storm_42', body: 'june. ok. thats something to hold onto. thank you' },
    ]
  },
  {
    category: 'support',
    username: 'tired_but_here',
    title: 'does anyone else feel completely hollow in early sobriety',
    body: 'im on day 19. i thought id start feeling better by now but everything just feels flat. like nothing is enjoyable and i dont really feel anything. is this normal or is something wrong with me',
    comments: [
      { username: 'sober_since_tuesday', body: 'completely normal. its called PAWS and it can last weeks or months. your brain is literally rewiring itself. drink water. sleep. be patient. it does shift' },
      { username: 'clearheaded_finally', body: 'day 19 is still very early. i felt like this until around week 6 or 7. one morning i woke up and noticed the birds were loud and i actually enjoyed that. small things come back first' },
      { username: 'tired_but_here', body: 'week 6 or 7. ok thats not that far. i can do that. thank you for being honest with me' },
      { username: 'mum_of_three_sober', body: 'the hollowness is real. for me it was my brain realising it had been numbing itself for years and now it had to feel things without help. its hard but its also you healing' },
    ]
  },
  {
    category: 'support',
    username: 'lapsed_but_trying',
    title: 'my therapist dropped me and now ive got nothing',
    body: 'was seeing someone through the NHS for alcohol issues and they said my case was being closed because i had made progress. but i dont feel ready. i feel like im one bad week away from going back to where i was. dont know what to do',
    comments: [
      { username: 'davefromleeds', body: 'that is so frustrating and i am genuinely sorry. the NHS criteria for ending treatment is rubbish sometimes. have you looked at SMART recovery meetings? theyre free and there are online ones too' },
      { username: 'hopeful_helen_84', body: 'Turning Point do free community support as well depending on where you are. also this forum isnt therapy but we are here every day. please keep checking in' },
      { username: 'lapsed_but_trying', body: 'i hadnt heard of SMART recovery. looking it up now. thank you' },
      { username: 'one_day_at_a_time', body: 'asking your GP for a referral to a different service is also worth trying. you are allowed to advocate for yourself' },
    ]
  },

  // MILESTONES
  {
    category: 'milestones',
    username: 'hopeful_helen_84',
    title: '6 months today. i genuinely never thought this was possible for me',
    body: 'six months. i keep saying it out loud. last year at this time i woke up in the hospital for the second time and the nurse asked me if i wanted to live and i honestly wasnt sure. today i walked my dog in the sunshine and cried because it was just so lovely. if you are at the start please just know this is real',
    comments: [
      { username: 'mum_of_three_sober', body: 'this made me cry in a good way. congratulations. you deserve every second of that sunshine' },
      { username: 'quiet_storm_42', body: 'the dog walk in the sunshine is so relatable. its the small things that hit you hardest isnt it. well done helen' },
      { username: 'northernlass_recovery', body: 'SIX MONTHS! absolute legend. write this day down' },
      { username: 'hopeful_helen_84', body: 'i actually took a photo of the path where we walked. saved it as my lockscreen to remind myself on hard days' },
      { username: 'sunrisesober', body: 'that photo thing is a brilliant idea. saving this thread for bad days' },
      { username: 'still_standing_mark', body: 'hospital to 6 months. what a turnaround. respect to you genuinely' },
    ]
  },
  {
    category: 'milestones',
    username: 'davefromleeds',
    title: 'one whole year without a drink. still feels surreal',
    body: 'a year ago today my wife found me passed out at 11am on a tuesday. today she made me a cake with a little 365 written on it and the kids made me a card. i ate too much cake and watched football and that was my celebration. which is actually everything',
    comments: [
      { username: 'clearheaded_finally', body: 'the cake. the kids card. football on the telly. that IS everything. congratulations dave' },
      { username: 'recovering_slowly', body: 'this made my morning genuinely. thank you for sharing this' },
      { username: 'hopeful_helen_84', body: 'your wife making you that cake after finding you like that is love. a year is incredible. well done to all four of you' },
      { username: 'davefromleeds', body: 'she is unreal honestly. i dont deserve her but im trying to be worth it. thank you all' },
      { username: 'grateful_for_today', body: 'trying to be worth it is all any of us can do. one year is massive' },
    ]
  },
  {
    category: 'milestones',
    username: 'recovering_slowly',
    title: '30 days. just 30 days but its mine',
    body: 'not going to pretend 30 days is loads. i know people here have years. but for me it feels like everything. ive tried and failed so many times. this is the longest stretch ive had in 8 years. just needed to tell someone',
    comments: [
      { username: 'tired_but_here', body: '30 days is loads. dont you dare say its not. its 30 more than zero' },
      { username: 'one_day_at_a_time', body: 'we are all on day 1 at some point. 30 days is real and it is yours. write it down somewhere. well done' },
      { username: 'justkeepswimming99', body: 'i remember my first 30 days feeling this exact way. the longest in years. now im at 14 months. it just keeps going if you let it' },
      { username: 'recovering_slowly', body: 'thank you. this thread is going to get me through the afternoon i think' },
    ]
  },
  {
    category: 'milestones',
    username: 'sober_since_tuesday',
    title: '2 years clean from heroin and cocaine today',
    body: 'two years. i was on the streets 3 years ago. genuinely sleeping rough in birmingham. i got a place in a recovery house, worked the programme for a year and now ive got a flat and a job in a warehouse. my mum speaks to me again. i cried telling her the date this morning. just sharing because when i was out there i honestly didnt think this was available to me',
    comments: [
      { username: 'northernlass_recovery', body: 'your story needs to be heard by everyone who thinks its too late. wow. congratulations so much' },
      { username: 'mum_of_three_sober', body: 'the bit about your mum speaking to you again. i cannot imagine what that phone call was like. two years from rough sleeping to flat and job is remarkable. you should be so proud' },
      { username: 'still_standing_mark', body: 'this is the post i needed today. going to save it. thank you for coming back to share it' },
      { username: 'sober_since_tuesday', body: 'it was rocky and i wobbled loads of times in the recovery house but they never gave up on me. if anyone is looking for residential options please do look into them. changed my life' },
      { username: 'hopeful_helen_84', body: 'two years from street to flat to job to mum. what a human being you are' },
    ]
  },

  // DAILY
  {
    category: 'daily',
    username: 'sunrisesober',
    title: 'how is everyone doing today. monday check in',
    body: 'mondays are hard for me. felt good over the weekend and now the week stretches out and the anxiety kicks in. checking in here as part of my routine. how is everyone?',
    comments: [
      { username: 'justkeepswimming99', body: 'struggling a bit tbh. didnt sleep well and the cravings were loud this morning. but im here and had breakfast which counts' },
      { username: 'recovering_slowly', body: 'day 32 for me. feeling ok. bit emotional but in a good way if that makes sense' },
      { username: 'clearheaded_finally', body: 'mondays are always hard for me too. had a good morning though. going to the gym after work. small wins' },
      { username: 'sunrisesober', body: 'love this. we are all just getting through it together arent we. hope the gym helps clearheaded' },
      { username: 'tired_but_here', body: 'day 24 here. still flat but a tiny bit less flat than last week. progress is weird isnt it' },
      { username: 'grateful_for_today', body: 'doing alright. made a proper lunch for the first time in ages. its the small things' },
    ]
  },
  {
    category: 'daily',
    username: 'grateful_for_today',
    title: 'three things i am grateful for today. join in if you want',
    body: '1. my cat woke me up by sitting on my face which is annoying but also hilarious\n2. it is not raining\n3. i am sober\nthats it. thats the whole post. your turn',
    comments: [
      { username: 'mum_of_three_sober', body: '1. kids all got to school on time\n2. someone made me tea without being asked\n3. i am sober and so grateful' },
      { username: 'hopeful_helen_84', body: '1. slept through the night first time in a week\n2. this post made me smile\n3. six months tomorrow and i AM READY' },
      { username: 'quiet_storm_42', body: 'ok \n1. called my mum which i kept putting off\n2. made actual food not just toast\n3. made it to day 3 after my slip. every day matters' },
      { username: 'davefromleeds', body: 'love this thread. 1. wife and kids. always. 2. coffee while its hot. 3. one year yesterday so today is day 366' },
    ]
  },

  // TREATMENT
  {
    category: 'treatment',
    username: 'northernlass_recovery',
    title: 'has anyone been to Clouds House in Wiltshire. would love to hear experiences',
    body: 'im being assessed for residential next month and Clouds House keeps coming up. has anyone actually been? im nervous about leaving my job and kids for 28 days. trying to weigh it all up',
    comments: [
      { username: 'sober_since_tuesday', body: 'i did 12 weeks in a different residential (foundation house in birmingham) and the time away from normal life was honestly what made it work for me. you cant detox and do everything else at the same time. the kids will be ok. you will be a better parent out the other side' },
      { username: 'grateful_for_today', body: 'havent been to clouds house specifically but i read good things. the therapeutic community model is really solid for some people. what specifically are you worried about' },
      { username: 'northernlass_recovery', body: 'mostly the kids. my mum would have them but i feel guilty. and losing income for a month' },
      { username: 'mum_of_three_sober', body: 'i understand the mum guilt so much. i went away for 3 weeks and it was the hardest thing but my kids are better for it now. they need a well parent more than a present unwell one. not trying to minimise how hard it is. just saying the guilt is worth it' },
      { username: 'one_day_at_a_time', body: 'also check with your employer whether it can be sickness leave. some people use it that way. and some residential places can work with ESA or other benefits. worth asking them directly' },
    ]
  },
  {
    category: 'treatment',
    username: 'lapsed_but_trying',
    title: 'what actually happens in a home detox. terrified',
    body: 'gp has offered me a home detox from alcohol. i drink about half a bottle of spirits a day. she said it would be medication over 7 days. im scared of withdrawals. anyone been through this at home',
    comments: [
      { username: 'davefromleeds', body: 'i did a home detox 2 years ago. they put me on chlordiazepoxide which reduces the seizure risk and helps with the shakes and anxiety. someone needs to be with you ideally or checking in. the first 3 days were rough but manageable. after that it got much better' },
      { username: 'clearheaded_finally', body: 'make sure you tell your GP exactly how much you drink and be honest. the medication dose is based on that. also stock up on foods that are easy to eat because you wont feel like cooking. dry crackers, soup, that kind of thing' },
      { username: 'lapsed_but_trying', body: 'this is really helpful. is there anything i should watch out for that would mean i need to go to hospital' },
      { username: 'davefromleeds', body: 'the GP should go through this with you but: seizures obviously, confusion, severe vomiting, shaking so bad you cant hold anything, fever. if any of that happens get help quickly. they should give you a leaflet. having someone with you who knows the signs is really important' },
      { username: 'hopeful_helen_84', body: 'been through this. the anticipation was worse than the actual experience. trust the medication. drink water. rest. you can do this' },
    ]
  },
  {
    category: 'treatment',
    username: 'justkeepswimming99',
    title: 'NHS vs private rehab. does it actually matter',
    body: 'i qualify for NHS funded treatment apparently but theres a wait. im wondering if its worth trying to borrow money for private. does the quality actually differ that much or is it mostly just the room',
    comments: [
      { username: 'sober_since_tuesday', body: 'honestly the quality of the programme matters more than the thread count on the sheets. ive met people who paid 20k for private and relapsed immediately because they werent ready. and people who did NHS residential and are still clean years later. its about your commitment as much as anything' },
      { username: 'recovering_slowly', body: 'that said the wait for NHS can be months and in that time things can change. if the private option means getting in sooner and you are ready now that might matter. ring the private one and ask what the wait is too. sometimes not much different' },
      { username: 'justkeepswimming99', body: 'this is really balanced thank you. i think i was assuming private meant better automatically. will speak to both' },
    ]
  },

  // SUBSTANCES
  {
    category: 'substances',
    username: 'clearheaded_finally',
    title: 'alcohol withdrawal timeline. what to actually expect',
    body: 'putting this here because i wish someone had told me clearly before my detox. this is my experience only and everyone is different but hopefully useful',
    comments: [
      { username: 'clearheaded_finally', body: 'hours 6 to 24: anxiety, shakiness, sweating, trouble sleeping. some people get mild hallucinations (i did, it was weird not terrifying)\nhours 24 to 48: peak danger for seizures, symptoms at worst\nday 3 to 5: starting to stabilise, appetite slowly coming back, exhausted\nweek 2+: PAWS begins. emotional flatness, low motivation. this is normal and passes' },
      { username: 'tired_but_here', body: 'this is really useful. i wish i had found this on day 1. the PAWS thing explains so much of what im going through now' },
      { username: 'lapsed_but_trying', body: 'saving this. im about to start my home detox. any tips you wish you had' },
      { username: 'clearheaded_finally', body: 'yes. prestock the house with easy food. tell everyone who might contact you that you are unwell so you dont have to manage expectations. keep the curtains closed if bright light bothers you. have something you can do lying down like podcasts or audio books. and let yourself be properly looked after if someone is with you' },
      { username: 'hopeful_helen_84', body: 'the podcast tip is gold. i went through probably 4 series of things during my worst week' },
    ]
  },
  {
    category: 'substances',
    username: 'still_standing_mark',
    title: 'cannabis. does anyone else feel like no one takes it seriously as an addiction',
    body: 'been using daily for 12 years. tried stopping 4 times. the anxiety when i stop is brutal. but whenever i mention it people say oh its just weed. even my GP seemed a bit dismissive. anyone else had this',
    comments: [
      { username: 'northernlass_recovery', body: 'yes. constantly. as someone who came from heroin i almost felt embarrassed saying cannabis was causing me problems but cannabis dependency is very real. the anxiety and sleep disruption can be severe. you are not making it up' },
      { username: 'sunrisesober', body: 'i smoked every day for 16 years. stopping was one of the hardest things i have done. the insomnia alone was horrendous for weeks. persevere - it does clear. but it takes time and you are right that not enough people take it seriously' },
      { username: 'still_standing_mark', body: 'week 2 without it now. the dreams are insane and i am not sleeping much but i feel more like myself than i have in years which is a weird thing to realise' },
      { username: 'justkeepswimming99', body: 'the vivid dreams are your brain switching REM back on. annoying but its actually healing. keep going' },
    ]
  },

  // FAMILY
  {
    category: 'family',
    username: 'mum_of_three_sober',
    title: 'my husband is still drinking and im in recovery. how do you manage',
    body: 'i am 8 months sober. my husband drinks a lot but doesnt see it as a problem and i cant make him. we have three kids. the house has wine in the fridge and he drinks on weekends while i am trying to stay sober. i love him but this is really hard. has anyone navigated this',
    comments: [
      { username: 'quiet_storm_42', body: 'this is genuinely tough and i dont think there is an easy answer. does he know how hard it is for you having it in the house' },
      { username: 'mum_of_three_sober', body: 'yes and he tries. he has started drinking outside on the back step or keeping it in a different cupboard. but i can still smell it. and i worry about what the kids are seeing' },
      { username: 'hopeful_helen_84', body: 'have you looked at AL-Anon for him? its for family members of people with alcohol problems but i wonder if there is a version for partners of people in recovery too. also SMART Recovery have family sessions' },
      { username: 'grateful_for_today', body: 'your sobriety comes first. that is not selfish, it is survival. can you talk to your sponsor or whoever supports you about setting some clear boundaries for what you need at home to stay safe. you can love someone and still need them to change how they behave around you' },
      { username: 'mum_of_three_sober', body: 'the boundaries thing is where i get stuck. ive never been good at that. this gives me something to think about. thank you' },
    ]
  },
  {
    category: 'family',
    username: 'sunrisesober',
    title: 'what do you say to your kids about why you went to rehab',
    body: 'my kids are 9 and 12. i did three weeks residential. they knew i was poorly but i kept it vague. now my 12 year old is asking questions and i dont know how honest to be. has anyone had this conversation',
    comments: [
      { username: 'davefromleeds', body: 'we were fairly honest with ours who are a similar age. not graphic detail but yes, daddy had an illness with alcohol and he went somewhere to get help. kids often know more than we think and filling the gap of silence with something true and manageable works better than secrets' },
      { username: 'one_day_at_a_time', body: 'there are some really good books aimed at children about a parent having an addiction. might be worth looking for something you could read together or let them read. makes it something you can talk about without it coming out of nowhere' },
      { username: 'sunrisesober', body: 'i like the idea of a book. less pressure than a conversation from scratch. any specific recommendations' },
      { username: 'mum_of_three_sober', body: 'someone told me about Alateen which is a group for teens with a parent who has had addiction issues. might be worth knowing about for your 12 year old as they get older' },
    ]
  },

  // GENERAL
  {
    category: 'general',
    username: 'justkeepswimming99',
    title: 'scared about going to my first AA meeting tomorrow',
    body: 'booked myself in. church hall. 7pm. absolutely terrified. i dont know what to expect and i am worried i will be the youngest person there or that i wont fit in or that someone will recognise me. anyone been through that first meeting',
    comments: [
      { username: 'still_standing_mark', body: 'everyone is terrified at their first meeting. every single person there has sat in that seat. they will not bite. you do not have to speak. you can literally just sit and listen and say pass if they go around the room' },
      { username: 'recovering_slowly', body: 'the recognition fear is so common and understandable. the tradition of anonymity is taken seriously. what is said in the room stays in the room. and statistically the chances of knowing someone are really low' },
      { username: 'justkeepswimming99', body: 'the pass option is really reassuring. i was dreading having to speak' },
      { username: 'clearheaded_finally', body: 'go 10 minutes early and introduce yourself to someone. i know that sounds awful but it makes the room feel less scary before it fills up. and have a plan for afterwards. go for a walk or ring someone. dont just be alone with your thoughts' },
      { username: 'justkeepswimming99', body: 'UPDATE. went. did not speak. cried a bit when someone else told their story. a woman called pat gave me a leaflet and her number. it was not what i expected at all. going back thursday' },
      { username: 'hopeful_helen_84', body: 'pat sounds wonderful. going back thursday is everything. well done' },
    ]
  },
  {
    category: 'general',
    username: 'grateful_for_today',
    title: 'the things that actually helped. make a list with me',
    body: 'im nearly 9 months in and i keep being asked by people just starting what helped. here is mine. please add yours\n\nwalking every morning even for 10 minutes\nnot keeping booze in the house obviously\ntelling one person the truth\ndrinking stupid amounts of sparkling water\nsundayassembly app for sober community stuff',
    comments: [
      { username: 'northernlass_recovery', body: 'for me: writing every morning, not always about recovery just anything, distracts the part of the brain that wants to catastrophise. also having a physical craving plan written down for when it hits not when you are already in crisis' },
      { username: 'davefromleeds', body: 'changing where i sat in the house in the evenings. my chair was my drinking chair. moving to a different spot sounds ridiculous but it helped so much. also telling the kids something age appropriate so they could be part of it' },
      { username: 'tired_but_here', body: 'this will sound silly but unfollowing anyone on social media who posted a lot of wine content. out of sight really does help' },
      { username: 'mum_of_three_sober', body: 'al anon for my husband actually helped me too, hearing how families talk about a loved one in addiction gave me a lot of perspective about my own thinking patterns. also accountability texts with a friend every morning. just one line. alive and sober. it keeps you connected to someone' },
    ]
  },
]

export async function POST(request: NextRequest) {
  const { pin } = await request.json()
  if (pin !== PIN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  // Get categories
  const { data: categories } = await admin.from('categories').select('id, slug')
  const catMap = Object.fromEntries((categories || []).map((c: { id: number; slug: string }) => [c.slug, c.id]))

  let postCount = 0
  let commentCount = 0

  for (const item of SEED_DATA) {
    const categoryId = catMap[item.category]
    if (!categoryId) continue

    const baseSlug = item.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').slice(0, 60)
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 8)}`

    // Create post with a fake user_id (null for seed data)
    const { data: post, error: postError } = await admin.from('posts').insert({
      category_id: categoryId,
      user_id: null,
      username: item.username,
      title: item.title,
      body: item.body,
      slug,
      upvotes: Math.floor(Math.random() * 40) + 2,
      comment_count: item.comments.length,
    }).select('id').single()

    if (postError || !post) continue
    postCount++

    // Create comments
    for (const c of item.comments) {
      const { error: commentError } = await admin.from('comments').insert({
        post_id: post.id,
        user_id: null,
        username: c.username,
        body: c.body,
        upvotes: Math.floor(Math.random() * 15),
      })
      if (!commentError) commentCount++
    }
  }

  return NextResponse.json({ success: true, posts: postCount, comments: commentCount })
}
