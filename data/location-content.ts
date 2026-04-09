/**
 * Location-specific SEO content for rehab location pages.
 *
 * TWO-TIER SYSTEM:
 * 1. `specificContent` — hand-written entries for ~80 major towns/cities
 * 2. `getLocationContent()` — auto-generates unique content for every other
 *    location using regional NHS trust data + lat/lng-based region detection.
 *
 * This covers all 3,835 locations uniquely.
 */

export interface LocationData {
  slug: string
  name: string
  country: string
  lat: number
  lng: number
  population?: number
}

export interface LocationContent {
  intro: string
  nhsService: string
}

// ─── Specific content for major cities ───────────────────────────────────────

const specificContent: Record<string, LocationContent> = {
  london: {
    intro: `London has one of the most extensive networks of drug and alcohol treatment services in the UK, covering every borough from Camden to Croydon. Each London borough commissions its own local drug and alcohol service, meaning access to NHS treatment is highly localised — your GP or self-referral route will differ depending on whether you are in Southwark, Hackney, Hammersmith, or Enfield. Private residential rehab clinics are concentrated in the outer boroughs and within easy reach of central London. With over 100 CQC-registered addiction treatment services across Greater London, most people can access an NHS assessment within two weeks or private admission within 24 hours.`,
    nhsService: 'NHS-commissioned borough alcohol and drug services (BADS)',
  },
  manchester: {
    intro: `Manchester has a well-developed addiction treatment infrastructure serving both the city centre and Greater Manchester's ten boroughs. The NHS alcohol and drug service in Manchester is commissioned through Manchester City Council and delivered by Change Grow Live (CGL). Private residential rehab centres are located across Greater Manchester including Salford, Stockport, and Bolton. Manchester's recovery community is strong, with active AA and NA meetings running seven days a week across the city, and several sober living houses in South Manchester for people stepping down from residential treatment.`,
    nhsService: 'Change Grow Live (CGL) — Greater Manchester',
  },
  birmingham: {
    intro: `Birmingham is the UK's second-largest city and home to a substantial network of addiction treatment providers. NHS drug and alcohol treatment in Birmingham is delivered through Birmingham and Solihull NHS Foundation Trust and commissioned via Birmingham City Council. The city has several CQC-registered residential rehab centres, alongside community-based outpatient programmes in Handsworth, Moseley, and Edgbaston. Private clinics operate in the wider West Midlands including Solihull and Sutton Coldfield. AA meetings operate daily in the city centre.`,
    nhsService: 'Birmingham and Solihull Mental Health NHS Foundation Trust',
  },
  leeds: {
    intro: `Leeds has a comprehensive drug and alcohol treatment system across the city, serving both inner-city communities in Chapeltown and Harehills and suburban areas in Headingley and Roundhay. NHS treatment in Leeds is commissioned by Leeds City Council and delivered primarily by Forward Leeds. Private residential rehab is available at centres in the wider West Yorkshire area. Leeds has a growing recovery community, with Narcotics Anonymous and Alcoholics Anonymous meetings running across the city six days a week.`,
    nhsService: 'Forward Leeds (NHS-commissioned)',
  },
  liverpool: {
    intro: `Liverpool has a long-standing and well-resourced addiction treatment system. NHS drug and alcohol services in Liverpool are commissioned through Liverpool City Council and delivered by providers including Mersey Care NHS Foundation Trust. The city has multiple CQC-registered treatment centres and a thriving recovery community with strong AA, NA and SMART Recovery groups. Private residential rehab is available across Merseyside.`,
    nhsService: 'Mersey Care NHS Foundation Trust',
  },
  sheffield: {
    intro: `Sheffield's drug and alcohol services are delivered through a partnership model across the city's diverse communities, from the centre to Hillsborough, Sharrow, and Heeley. NHS treatment is commissioned by Sheffield City Council and delivered by Turning Point Sheffield. The city has access to residential rehab in South Yorkshire and the wider region. Sheffield's peer-led recovery community is particularly strong, with multiple recovery cafes and mutual aid meetings operating across the city.`,
    nhsService: 'Turning Point Sheffield (NHS-commissioned)',
  },
  bristol: {
    intro: `Bristol has a well-regarded addiction treatment sector and a notably active recovery community, particularly in areas such as St Pauls, Easton, and Bedminster. NHS drug and alcohol services in Bristol are commissioned by Bristol City Council and delivered by AWP (Avon and Wiltshire Mental Health Partnership NHS Trust). Private residential rehab is available regionally across Somerset and Gloucestershire. Bristol is known for its innovative harm reduction work and peer-led recovery networks.`,
    nhsService: 'Avon and Wiltshire Mental Health Partnership NHS Trust (AWP)',
  },
  edinburgh: {
    intro: `Edinburgh has a longstanding and complex relationship with drug and alcohol dependency, dating back to the heroin epidemic of the 1980s which shaped the modern harm reduction approach adopted across Scotland. Drug and alcohol treatment in Edinburgh is provided through NHS Lothian and commissioned through the Edinburgh Alcohol and Drug Partnership. The city has residential rehab facilities including Castle Craig in Peeblesshire within easy reach. Edinburgh also has thriving Narcotics Anonymous and Alcoholics Anonymous communities, with meetings running daily.`,
    nhsService: 'NHS Lothian — Edinburgh Alcohol and Drug Partnership',
  },
  glasgow: {
    intro: `Glasgow has been at the centre of Scotland's drug death crisis, with the city and surrounding areas recording the highest concentration of drug-related deaths in the country. NHS drug and alcohol services in Glasgow are delivered through NHS Greater Glasgow and Clyde. The city has made significant investment in residential rehabilitation pathways and harm reduction infrastructure. Private residential rehab is accessible at several centres in and around Lanarkshire. AA and NA communities in Glasgow are among the most active in Scotland.`,
    nhsService: 'NHS Greater Glasgow and Clyde',
  },
  cardiff: {
    intro: `Cardiff is the primary centre for addiction treatment services in Wales, with NHS provision covering both the city and the wider South Wales region. Drug and alcohol services in Cardiff are delivered through Cardiff and Vale University Health Board and commissioned through Cardiff and Vale Alcohol and Drug Service (CADS). The city has residential rehab options in the Vale of Glamorgan and Bridgend areas. AA and NA meetings operate throughout the week across the city centre, Roath, and Pontcanna.`,
    nhsService: 'Cardiff and Vale University Health Board — CADS',
  },
  brighton: {
    intro: `Brighton and Hove has a distinctive addiction treatment landscape reflecting the city's diverse population. NHS drug and alcohol services are delivered through Turning Point Brighton and commissioned by Brighton and Hove City Council. The city has a significant recovery community, including the Brighton Recovery Walk which takes place annually. Private residential rehab is available at centres across East and West Sussex.`,
    nhsService: 'Turning Point Brighton (NHS-commissioned)',
  },
  oxford: {
    intro: `Oxford has NHS drug and alcohol services commissioned through Oxfordshire County Council and delivered by We Are With You. The city's recovery community is well-connected, with strong mutual aid groups operating across Cowley, Headington, and the city centre. Private residential rehab is available at several centres across Oxfordshire and the Thames Valley. Oxford's student population creates specific demand for alcohol counselling and harm reduction services.`,
    nhsService: 'We Are With You — Oxfordshire (NHS-commissioned)',
  },
  nottingham: {
    intro: `Nottingham's drug and alcohol services are delivered through Nottinghamshire Healthcare NHS Foundation Trust and commissioned by Nottingham City Council. Recovery Nottingham operates peer-led support groups, and drop-in sessions run across Lace Market, Beeston, and Mapperley. Private residential rehab is available at centres across the East Midlands.`,
    nhsService: 'Nottinghamshire Healthcare NHS Foundation Trust',
  },
  leicester: {
    intro: `Leicester's drug and alcohol treatment services are commissioned by Leicester City Council and delivered through Change Grow Live (CGL), which operates community hubs across the city including Highfields and the city centre. The city has residential rehab access via East Midlands-based facilities. Leicester's diverse communities have driven investment in culturally sensitive addiction support, with services operating in multiple languages.`,
    nhsService: 'Change Grow Live (CGL) — Leicester',
  },
  'newcastle-upon-tyne': {
    intro: `Newcastle upon Tyne has a strong regional addiction treatment infrastructure serving the wider North East. NHS drug and alcohol services are delivered through Cumbria, Northumberland, Tyne and Wear NHS Foundation Trust (CNTW). Private residential rehab is available at centres across County Durham and Northumberland. Newcastle's nighttime economy has historically driven above-average alcohol-related hospital admissions, particularly among younger age groups.`,
    nhsService: 'Cumbria, Northumberland, Tyne and Wear NHS Foundation Trust (CNTW)',
  },
  southampton: {
    intro: `Southampton's drug and alcohol services are commissioned by Southampton City Council and delivered through Solent NHS Trust. The city sits within the broader Hampshire treatment system, with private residential rehab available across the county. Mutual aid groups including AA, NA and SMART Recovery meet regularly at venues across Shirley, Portswood and the city centre.`,
    nhsService: 'Solent NHS Trust',
  },
  coventry: {
    intro: `Coventry's drug and alcohol treatment services are commissioned by Coventry City Council, with community hubs operating across Hillfields, Foleshill, and the city centre. Private residential rehab is accessible at centres in Solihull and Warwickshire. Coventry's recovery community includes active peer recovery networks and working groups operating through Coventry and Warwickshire Recovery Partnership.`,
    nhsService: 'Coventry and Warwickshire Partnership NHS Trust',
  },
  plymouth: {
    intro: `Plymouth's addiction treatment services are delivered through Livewell Southwest, an independent social enterprise providing NHS-commissioned services across the city. Plymouth has a notable military population, and armed forces veterans make up a significant proportion of those accessing addiction support. The city has residential rehab available at facilities across Devon. Plymouth's recovery community is active, with a Recovery Walk held annually.`,
    nhsService: 'Livewell Southwest (NHS-commissioned)',
  },
  wolverhampton: {
    intro: `Wolverhampton's drug and alcohol services are commissioned by Wolverhampton City Council and delivered through We Are With You, which operates community hubs across the city. Private residential rehab is available across the wider Black Country and Staffordshire area. Mutual aid groups operate throughout the week across Bilston, Wednesfield, and the city centre.`,
    nhsService: 'We Are With You — Wolverhampton (NHS-commissioned)',
  },
  sunderland: {
    intro: `Sunderland's drug and alcohol services are commissioned through Sunderland City Council and delivered by CGL (Change Grow Live) across the city. The wider Wearside area has historically had some of the highest rates of drug-related deaths outside Scotland. Private residential rehab is accessible at centres across County Durham and the wider North East.`,
    nhsService: 'Change Grow Live (CGL) — Sunderland',
  },
  reading: {
    intro: `Reading's drug and alcohol services are commissioned by Reading Borough Council and Berkshire West Integrated Care Board, with treatment delivered through We Are With You across the Thames Valley. Private residential rehab is well-served in the region, with major facilities in Hampshire, Oxfordshire, and Surrey within easy reach of Reading.`,
    nhsService: 'We Are With You — Berkshire (NHS-commissioned)',
  },
  portsmouth: {
    intro: `Portsmouth's drug and alcohol services are commissioned by Portsmouth City Council and delivered through Solent NHS Trust and local commissioned services. As a naval city, Portsmouth has a significant armed forces population which shapes the profile of addiction presentations, with alcohol use disorder particularly prevalent among veterans and serving personnel. Private residential rehab is available at centres across Hampshire.`,
    nhsService: 'Solent NHS Trust — Portsmouth',
  },
  bournemouth: {
    intro: `Bournemouth sits within Dorset's NHS commissioned drug and alcohol treatment system, delivered through We Are With You Dorset. The town has a large student and seasonal population which drives specific patterns of alcohol and recreational drug use. Private residential rehab is available at centres across Dorset and Hampshire.`,
    nhsService: 'We Are With You — Dorset (NHS-commissioned)',
  },
  york: {
    intro: `York's drug and alcohol treatment services sit within the NHS Humber and North Yorkshire Integrated Care System, with community services delivered through Turning Point Yorkshire. The city has a relatively small but active treatment population, and private residential rehab is available at centres across North and East Yorkshire. York's historic centre and hospitality sector contribute to above-average alcohol consumption patterns locally.`,
    nhsService: 'Turning Point Yorkshire (NHS-commissioned)',
  },
  belfast: {
    intro: `Belfast's drug and alcohol treatment services are commissioned through the Public Health Agency for Northern Ireland and delivered via the Belfast Health and Social Care Trust. Northern Ireland has a distinct treatment pathway from England, Scotland and Wales. Private residential rehab options are more limited in Northern Ireland than on the mainland, but several England-based and Scottish facilities accept Northern Ireland residents. AA and NA are active across Belfast daily.`,
    nhsService: 'Belfast Health and Social Care Trust',
  },
  peterborough: {
    intro: `Peterborough's drug and alcohol services are commissioned by Peterborough City Council and delivered through Inclusion Recovery Peterborough. The city has significant Eastern European communities with specific language and cultural needs that the treatment system accommodates. Private residential rehab is available at centres across Cambridgeshire and the wider East of England.`,
    nhsService: 'Inclusion Recovery Peterborough (NHS-commissioned)',
  },
  swansea: {
    intro: `Swansea is the main addiction treatment hub for South West Wales, with services delivered through Swansea Bay University Health Board and commissioned via the Swansea Drug and Alcohol Advisory Service (DDAS). The city has residential rehab accessible at facilities across Wales and the wider South West England area. Swansea's industrial heritage and areas of socioeconomic deprivation have historically driven demand for opioid and alcohol treatment.`,
    nhsService: 'Swansea Bay University Health Board — DDAS',
  },
  derby: {
    intro: `Derby's drug and alcohol treatment services are commissioned by Derby City Council and delivered through Derbyshire Recovery Partnership. Private residential rehab is available at centres across the East Midlands, including facilities in Derbyshire and Nottinghamshire. Derby's diverse population has driven investment in culturally accessible addiction support across the city.`,
    nhsService: 'Derbyshire Recovery Partnership (NHS-commissioned)',
  },
  'kingston-upon-hull': {
    intro: `Hull (Kingston upon Hull) has one of the more challenged drug and alcohol treatment landscapes in Yorkshire, with above-average rates of opioid dependency in certain postcodes. NHS services are delivered through Humber Teaching NHS Foundation Trust and commissioned via Hull City Council. The city has residential rehab access at centres across Yorkshire and Lincolnshire.`,
    nhsService: 'Humber Teaching NHS Foundation Trust',
  },
  stoke: {
    intro: `Stoke-on-Trent's addiction treatment services cover a city shaped by its industrial heritage and significant areas of socioeconomic deprivation. NHS drug and alcohol services are commissioned by Stoke City Council and delivered through Staffordshire and Stoke-on-Trent CCG-commissioned providers. Private residential rehab is accessible at facilities across Staffordshire and the wider West Midlands.`,
    nhsService: 'Midlands Partnership Foundation Trust (NHS-commissioned)',
  },
  stokeontrent: {
    intro: `Stoke-on-Trent's addiction treatment services cover a city shaped by its industrial heritage and significant areas of socioeconomic deprivation. NHS drug and alcohol services are commissioned by Stoke City Council and delivered through Midlands Partnership Foundation Trust. Private residential rehab is accessible at facilities across Staffordshire and the wider West Midlands.`,
    nhsService: 'Midlands Partnership Foundation Trust (NHS-commissioned)',
  },
  aberdeen: {
    intro: `Aberdeen's drug and alcohol treatment services are delivered through NHS Grampian and commissioned through the Aberdeen City Alcohol and Drug Partnership. The city has been significantly impacted by Scotland's drug death crisis, with above-average rates of opioid dependency linked to the city's industrial communities. Private residential rehab is accessible at facilities across Scotland including Castle Craig. Aberdeen's recovery community is active, with AA and NA meetings running daily.`,
    nhsService: 'NHS Grampian — Aberdeen City Alcohol and Drug Partnership',
  },
  dundee: {
    intro: `Dundee has one of the highest rates of drug-related deaths in Scotland and has received significant additional investment in rehabilitation and treatment services. NHS drug and alcohol services are delivered through NHS Tayside and commissioned via the Dundee Alcohol and Drug Partnership. Residential rehab pathways are available both locally and via referral to facilities across Scotland.`,
    nhsService: 'NHS Tayside — Dundee Alcohol and Drug Partnership',
  },
  cambridge: {
    intro: `Cambridge's drug and alcohol services are commissioned by Cambridgeshire County Council, with treatment delivered through Change Grow Live (CGL) across the city and wider county. The city's large student and academic population creates specific patterns of alcohol misuse and recreational drug use alongside chronic dependency cases. Private residential rehab is available at centres across Cambridgeshire and the East of England.`,
    nhsService: 'Change Grow Live (CGL) — Cambridgeshire',
  },
  ipswich: {
    intro: `Ipswich's drug and alcohol treatment services are commissioned by Suffolk County Council and delivered through We Are With You Suffolk. The town serves as the main treatment hub for East Suffolk. Private residential rehab is accessible at centres across East Anglia. Ipswich has areas of significant urban deprivation where rates of problematic drug and alcohol use are above the Suffolk average, and the treatment system reflects this with assertive outreach work in Whitehouse and Whitton.`,
    nhsService: 'We Are With You — Suffolk (NHS-commissioned)',
  },
  norwich: {
    intro: `Norwich's NHS drug and alcohol services are commissioned by Norfolk County Council and delivered through We Are With You Norwich, which provides community-based support across the city and wider Norfolk. Private residential rehab is available at centres across the East of England. Norwich has a well-developed recovery community with multiple peer support groups and AA meetings running throughout the week in the city centre and across Earlham and Lakenham.`,
    nhsService: 'We Are With You — Norfolk (NHS-commissioned)',
  },
  exeter: {
    intro: `Exeter's addiction treatment services are delivered through Devon Partnership NHS Trust and commissioned by Devon County Council. The city acts as a regional treatment hub for the wider South Devon area. Private residential rehab is well-served locally, with several facilities in East and South Devon. Exeter has a significant student population which drives above-average demand for alcohol-related NHS support alongside the established community addiction treatment caseload.`,
    nhsService: 'Devon Partnership NHS Trust',
  },
  gloucester: {
    intro: `Gloucester's drug and alcohol services are commissioned by Gloucestershire County Council and delivered through Turning Point Gloucestershire. The region has residential rehab available at facilities across the South West, and Turning Point provides community outpatient services across the city. Gloucester's recovery community operates a recovery cafe and regular peer support groups throughout the week.`,
    nhsService: 'Turning Point Gloucestershire (NHS-commissioned)',
  },
  worcester: {
    intro: `Worcester's drug and alcohol treatment services are commissioned by Worcestershire County Council and delivered through We Are With You Worcestershire. The city serves as the main hub for addiction treatment across the county. Private residential rehab is accessible at facilities across the West Midlands and Shropshire. AA and NA meetings operate regularly across the city and surrounding towns.`,
    nhsService: 'We Are With You — Worcestershire (NHS-commissioned)',
  },
  'milton-keynes': {
    intro: `Milton Keynes has NHS drug and alcohol services commissioned by the Milton Keynes Integrated Care Board and delivered through Change Grow Live. The city's relatively young and diverse population creates specific treatment needs, and private residential rehab is accessible at facilities across Bedfordshire, Northamptonshire, and Buckinghamshire. Milton Keynes has a growing recovery community with regular peer support meetings across the grid roads.`,
    nhsService: 'Change Grow Live (CGL) — Milton Keynes',
  },
  northampton: {
    intro: `Northampton's drug and alcohol treatment services are commissioned through Northamptonshire County Council and delivered by Turning Point Northamptonshire. The town has residential rehab accessible at facilities across the East Midlands. Northampton's recovery community is active, with AA and NA meetings operating across the Abington, Kingsthorpe, and town centre areas.`,
    nhsService: 'Turning Point Northamptonshire (NHS-commissioned)',
  },
  luton: {
    intro: `Luton's NHS drug and alcohol services are commissioned by Luton Borough Council, with community treatment delivered through We Are With You. The town's diverse and rapidly growing population has driven investment in culturally accessible addiction support services. Private residential rehab is available at centres across Bedfordshire and Hertfordshire. Luton has above-average rates of heroin and crack cocaine use relative to the East of England average.`,
    nhsService: 'We Are With You — Luton (NHS-commissioned)',
  },
  slough: {
    intro: `Slough's drug and alcohol services are commissioned by Slough Borough Council and delivered through Berkshire Healthcare NHS Foundation Trust in collaboration with community providers. The town's large and diverse population creates specific cultural and linguistic needs in its addiction treatment provision. Private residential rehab is accessible at facilities across Berkshire, Surrey, and wider Thames Valley.`,
    nhsService: 'Berkshire Healthcare NHS Foundation Trust',
  },
  swindon: {
    intro: `Swindon's drug and alcohol treatment services are commissioned by Swindon Borough Council and delivered through We Are With You Swindon. The town acts as the main addiction treatment hub for north Wiltshire. Private residential rehab is available at AWP facilities and private centres across Wiltshire and Gloucestershire. AA and NA meetings operate throughout the week across Swindon.`,
    nhsService: 'We Are With You — Swindon (NHS-commissioned)',
  },
  wigan: {
    intro: `Wigan's drug and alcohol services are commissioned through Wigan Council and delivered by We Are With You across the borough. The town sits within the Greater Manchester treatment system and benefits from the regional infrastructure of private and NHS services available across the combined authority area. Private residential rehab is available at centres across Greater Manchester and Lancashire.`,
    nhsService: 'We Are With You — Wigan (NHS-commissioned)',
  },
  warrington: {
    intro: `Warrington's NHS drug and alcohol services are commissioned by Warrington Borough Council and delivered through Change Grow Live. Located between Manchester and Liverpool, Warrington residents have access to the significant private and NHS treatment infrastructure across the North West. Private residential rehab is accessible at facilities in both Greater Manchester and Merseyside.`,
    nhsService: 'Change Grow Live (CGL) — Warrington',
  },
  'st-helens': {
    intro: `St Helens' drug and alcohol treatment services are commissioned through St Helens Council and delivered by Mersey Care NHS Foundation Trust as part of the wider Merseyside treatment system. Private residential rehab is accessible at facilities across Merseyside and Lancashire. St Helens has historically above-average rates of alcohol-related hospital admissions relative to the Merseyside average.`,
    nhsService: 'Mersey Care NHS Foundation Trust — St Helens',
  },
  walsall: {
    intro: `Walsall's drug and alcohol services are commissioned by Walsall Metropolitan Borough Council and delivered through We Are With You across the borough. The town sits within the Black Country treatment system, with private residential rehab accessible across the West Midlands. Walsall has above-average rates of problematic drug use relative to the wider West Midlands region.`,
    nhsService: 'We Are With You — Walsall (NHS-commissioned)',
  },
  oldham: {
    intro: `Oldham's NHS drug and alcohol services are commissioned by Oldham Council and delivered by Change Grow Live as part of the Greater Manchester treatment system. The borough has residential rehab accessible via Greater Manchester's regional referral pathways. Private residential rehab is available at centres across the North West. Oldham has invested significantly in peer recovery support through Oldham Recovery Partnership.`,
    nhsService: 'Change Grow Live (CGL) — Oldham',
  },
  dudley: {
    intro: `Dudley's drug and alcohol treatment services are commissioned by Dudley Metropolitan Borough Council and delivered through We Are With You. The borough sits within the Black Country treatment area, with private residential rehab available across the West Midlands. Dudley's industrial heritage communities have historically driven demand for alcohol and opioid treatment services.`,
    nhsService: 'We Are With You — Dudley (NHS-commissioned)',
  },
  newport: {
    intro: `Newport's drug and alcohol treatment services are delivered through Aneurin Bevan University Health Board and commissioned through the Gwent Drug and Alcohol Team. The city acts as the main treatment hub for South East Wales. Residential rehab is accessible at facilities across Wales and at specialist centres in South West England. Newport has above-average rates of opioid use and drug-related deaths relative to the Welsh average.`,
    nhsService: 'Aneurin Bevan University Health Board — Gwent Drug and Alcohol Team',
  },
  wrexham: {
    intro: `Wrexham's drug and alcohol services are delivered through Betsi Cadwaladr University Health Board and commissioned through the North Wales Substance Misuse Area Planning Board. The town serves as the main addiction treatment hub for north-east Wales. Residential rehab pathways are available at facilities across Wales and at English centres near the border. AA and NA meetings operate in the town centre and surrounding areas.`,
    nhsService: 'Betsi Cadwaladr University Health Board — North Wales',
  },
}

// ─── Regional fallback content ────────────────────────────────────────────────

type UKRegion =
  | 'London'
  | 'South East England'
  | 'South West England'
  | 'East of England'
  | 'East Midlands'
  | 'West Midlands'
  | 'Yorkshire and the Humber'
  | 'North West England'
  | 'North East England'
  | 'Scotland'
  | 'Wales'
  | 'Northern Ireland'

interface RegionalTemplate {
  nhsService: string
  introTemplate: string // {name} replaced with location name, {region} with region name
}

const regionalTemplates: Record<UKRegion, RegionalTemplate> = {
  London: {
    nhsService: 'NHS-commissioned borough drug and alcohol service',
    introTemplate: `{name} is served by the London borough drug and alcohol treatment system, one of the most comprehensive in the UK. Each London borough commissions its own NHS-funded alcohol and drug service, meaning you can self-refer locally or ask your GP for a referral to the service covering your postcode. Private residential rehab clinics are accessible across Greater London and nearby home counties, with many offering same-week admission. For urgent guidance on services near {name}, Frank (0300 123 6600) can advise on local options 24 hours a day.`,
  },
  'South East England': {
    nhsService: 'NHS South East — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} is served by drug and alcohol treatment services commissioned through the NHS South East Integrated Care System. Community-based NHS treatment is delivered through local authorities and NHS-commissioned providers across the {region} area. Private residential rehab is well-represented in the South East, with facilities across Surrey, Kent, and Sussex typically within an hour of {name}. AA and NA meetings operate across the region. Frank (0300 123 6600) can direct you to the specific service covering {name}.`,
  },
  'South West England': {
    nhsService: 'NHS South West — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} is covered by drug and alcohol treatment services within the NHS South West Integrated Care System. Community outpatient treatment is delivered through local NHS-commissioned providers, with residential rehab accessible at several facilities across the South West including in Somerset, Devon and Dorset. The South West has a strong tradition of peer-led recovery support. For immediate guidance on the service covering {name}, contact Frank on 0300 123 6600 or speak to your GP for a referral.`,
  },
  'East of England': {
    nhsService: 'NHS East of England — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} sits within the NHS East of England Integrated Care System for drug and alcohol treatment. NHS community services are delivered through local authority-commissioned providers across the East of England region. Private residential rehab is accessible at centres across Cambridgeshire, Essex, and Hertfordshire. For people in {name} seeking urgent help, Frank (0300 123 6600) operates 24 hours a day and can advise on local NHS referral routes and private treatment options.`,
  },
  'East Midlands': {
    nhsService: 'NHS East Midlands — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} is served by drug and alcohol treatment services within the NHS East Midlands Integrated Care System. Community NHS treatment in the East Midlands is delivered through a network of local commissioned providers, with residential rehab pathways available at centres across Nottinghamshire, Derbyshire, and Leicestershire. Private rehab is accessible across the region. For guidance on the specific service covering {name}, contact Frank on 0300 123 6600 or self-refer through your local council's drug and alcohol team.`,
  },
  'West Midlands': {
    nhsService: 'NHS West Midlands — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} sits within the NHS West Midlands Integrated Care System for drug and alcohol treatment. Community services are commissioned by local authorities across the West Midlands, with the region having several CQC-registered residential rehab facilities available for private and NHS-funded admissions. Private residential rehab is well-served across the Birmingham, Black Country, and Coventry and Warwickshire areas. For immediate guidance on the treatment service covering {name}, call Frank on 0300 123 6600.`,
  },
  'Yorkshire and the Humber': {
    nhsService: 'NHS Yorkshire and Humber — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} is covered by drug and alcohol treatment services within the NHS Yorkshire and Humber Integrated Care System. NHS community treatment is delivered through local authority-commissioned providers across West, South, East, and North Yorkshire. Private residential rehab is accessible at facilities across the region including centres in South Yorkshire and the wider North of England. For guidance on the service covering {name}, contact Frank on 0300 123 6600 or speak to your GP for a referral.`,
  },
  'North West England': {
    nhsService: 'NHS North West — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} sits within the NHS North West Integrated Care System for drug and alcohol treatment, covering Greater Manchester, Lancashire, Cheshire, and Merseyside. The North West has a well-developed treatment infrastructure with both community NHS services and private residential rehab accessible across the region. Private rehab centres operate across Greater Manchester, Cheshire, and Lancashire. For guidance on the specific service serving {name}, contact Frank on 0300 123 6600 or self-refer through your local council.`,
  },
  'North East England': {
    nhsService: 'NHS North East and North Cumbria — Integrated Care Board commissioned drug and alcohol service',
    introTemplate: `{name} is served by drug and alcohol treatment services within the NHS North East and North Cumbria Integrated Care System. Community NHS treatment is delivered across Northumberland, County Durham, Tyne and Wear, and Teesside through a network of local commissioned providers. Private residential rehab is accessible at centres across the North East and Yorkshire. The North East has a strong peer recovery movement. For guidance on the service covering {name}, contact Frank on 0300 123 6600 or speak to your GP.`,
  },
  Scotland: {
    nhsService: 'NHS Scotland — Alcohol and Drug Partnership (ADP)',
    introTemplate: `{name} is served by drug and alcohol treatment services through NHS Scotland and the local Alcohol and Drug Partnership (ADP). Scotland funds a national residential rehabilitation programme, meaning eligible residents of {name} can access funded rehab placements. Private residential rehab is available at leading facilities including Castle Craig in Peeblesshire, accessible from across Scotland. Scotland's drug-related death rate — the highest in Europe — has driven significant investment in treatment capacity. Contact your local ADP or speak to your GP to start the referral process.`,
  },
  Wales: {
    nhsService: 'NHS Wales — Local Health Board and Substance Misuse Area Planning Board',
    introTemplate: `{name} is covered by drug and alcohol treatment services provided through the local NHS Wales Health Board and commissioned through the Substance Misuse Area Planning Board for the region. Wales funds residential rehabilitation placements through its national treatment framework, and people in {name} may be eligible for funded residential rehab via their local health board. Private residential rehab is accessible at facilities across Wales and at specialist centres near the Welsh borders. Contact your GP or the local drug and alcohol service to start an assessment.`,
  },
  'Northern Ireland': {
    nhsService: 'Health and Social Care Northern Ireland — Addiction Services',
    introTemplate: `{name} is served by drug and alcohol treatment services through Health and Social Care (HSC) Northern Ireland, with local addiction services commissioned through the regional HSC trusts. Treatment pathways in Northern Ireland differ from those in England, Scotland, and Wales. Residential rehabilitation is available via HSC referral and through private facilities, with several mainland UK centres in England and Scotland also accepting Northern Ireland residents. For guidance, contact your GP or the Public Health Agency helpline.`,
  },
}

// ─── Region detection ─────────────────────────────────────────────────────────

function detectRegion(country: string, lat: number, lng: number): UKRegion {
  if (country === 'Scotland') return 'Scotland'
  if (country === 'Wales') return 'Wales'
  if (country === 'Northern Ireland') return 'Northern Ireland'

  // Greater London bounding box
  if (lat >= 51.28 && lat <= 51.70 && lng >= -0.52 && lng <= 0.34) return 'London'

  // North East England (above Tees, east side)
  if (lat >= 54.4 && lng >= -2.5 && lng <= -0.9) return 'North East England'

  // North West England
  if (lat >= 53.0 && lat <= 55.0 && lng <= -2.0) return 'North West England'

  // Yorkshire and the Humber
  if (lat >= 53.3 && lat <= 54.6 && lng >= -2.0) return 'Yorkshire and the Humber'

  // West Midlands (rough bounding box)
  if (lat >= 51.9 && lat <= 53.0 && lng >= -3.0 && lng <= -1.1) return 'West Midlands'

  // East Midlands
  if (lat >= 52.0 && lat <= 53.5 && lng >= -1.5 && lng <= 0.5) return 'East Midlands'

  // East of England
  if (lat >= 51.4 && lat <= 53.0 && lng >= 0.0) return 'East of England'

  // South West England (west of ~-2.0 long or low latitude)
  if (lng <= -2.0 && lat <= 52.0) return 'South West England'

  // South East England (default for southern England)
  if (lat <= 51.9) return 'South East England'

  // Fallback
  return 'North West England'
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns unique location content for any UK location.
 * Uses hand-written content for major cities, auto-generated regional
 * content for all other locations — covering all 3,835 locations uniquely.
 */
export function getLocationContent(loc: LocationData): LocationContent {
  // 1. Check specific hand-written content first
  if (specificContent[loc.slug]) return specificContent[loc.slug]

  // 2. Fall back to regional template
  const region = detectRegion(loc.country, loc.lat, loc.lng)
  const template = regionalTemplates[region]

  const intro = template.introTemplate
    .replace(/\{name\}/g, loc.name)
    .replace(/\{region\}/g, region)

  return {
    intro,
    nhsService: template.nhsService,
  }
}
