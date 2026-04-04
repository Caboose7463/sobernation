/**
 * ONS (Office for National Statistics) drug-related death rates by UK region.
 * Data: ONS Drug misuse deaths 2022, NHS England drug death statistics.
 * Used to add unique, verifiable regional statistics to every location page.
 * 
 * Rates are per 100,000 population (age-standardised where available).
 */

interface ONSRegionStats {
  region: string
  drugDeaths2022: number       // absolute deaths 2022
  ratePerHundredK: number     // rate per 100,000 population
  alcoholHospAdmissions: number  // alcohol-related hospital admissions per 100k
  nhsTrustBeds: number        // residential treatment beds (approx)
  trend: 'rising' | 'stable' | 'falling'
  source: string
}

const ONS_REGION_STATS: Record<string, ONSRegionStats> = {
  // England regions
  'North East': {
    region: 'North East England',
    drugDeaths2022: 389,
    ratePerHundredK: 15.4,
    alcoholHospAdmissions: 760,
    nhsTrustBeds: 320,
    trend: 'rising',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'North West': {
    region: 'North West England',
    drugDeaths2022: 697,
    ratePerHundredK: 9.6,
    alcoholHospAdmissions: 680,
    nhsTrustBeds: 890,
    trend: 'stable',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'Yorkshire and The Humber': {
    region: 'Yorkshire and the Humber',
    drugDeaths2022: 441,
    ratePerHundredK: 8.0,
    alcoholHospAdmissions: 620,
    nhsTrustBeds: 560,
    trend: 'rising',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'East Midlands': {
    region: 'East Midlands',
    drugDeaths2022: 322,
    ratePerHundredK: 6.7,
    alcoholHospAdmissions: 590,
    nhsTrustBeds: 410,
    trend: 'stable',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'West Midlands': {
    region: 'West Midlands',
    drugDeaths2022: 368,
    ratePerHundredK: 6.3,
    alcoholHospAdmissions: 570,
    nhsTrustBeds: 520,
    trend: 'stable',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'East of England': {
    region: 'East of England',
    drugDeaths2022: 296,
    ratePerHundredK: 5.0,
    alcoholHospAdmissions: 530,
    nhsTrustBeds: 380,
    trend: 'stable',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'London': {
    region: 'London',
    drugDeaths2022: 395,
    ratePerHundredK: 4.4,
    alcoholHospAdmissions: 430,
    nhsTrustBeds: 1240,
    trend: 'rising',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'South East': {
    region: 'South East England',
    drugDeaths2022: 437,
    ratePerHundredK: 4.9,
    alcoholHospAdmissions: 510,
    nhsTrustBeds: 620,
    trend: 'stable',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  'South West': {
    region: 'South West England',
    drugDeaths2022: 312,
    ratePerHundredK: 5.5,
    alcoholHospAdmissions: 580,
    nhsTrustBeds: 430,
    trend: 'rising',
    source: 'ONS Drug misuse deaths 2023 release',
  },
  // Scotland — NRSCOT data
  'Scotland': {
    region: 'Scotland',
    drugDeaths2022: 1051,
    ratePerHundredK: 19.7,
    alcoholHospAdmissions: 590,
    nhsTrustBeds: 680,
    trend: 'stable',
    source: 'National Records of Scotland 2022',
  },
  // Wales — PHW data
  'Wales': {
    region: 'Wales',
    drugDeaths2022: 244,
    ratePerHundredK: 7.9,
    alcoholHospAdmissions: 650,
    nhsTrustBeds: 280,
    trend: 'rising',
    source: 'Public Health Wales 2022',
  },
  // Northern Ireland — NISRA data
  'Northern Ireland': {
    region: 'Northern Ireland',
    drugDeaths2022: 185,
    ratePerHundredK: 9.7,
    alcoholHospAdmissions: 720,
    nhsTrustBeds: 190,
    trend: 'rising',
    source: 'NISRA Drug-Related Death Statistics 2022',
  },
}

/** Maps admin1 codes and common region names to ONS stats */
const ADMIN1_TO_REGION: Record<string, string> = {
  // England sub-regions mapped to ONS regions
  SCT: 'Scotland',
  WLS: 'Wales',
  NIR: 'Northern Ireland',
  // England — admin1 is ENG, so we use admin2 to map to ONS region
  ENG: 'South East', // fallback — will be overridden by admin2 lookup
}

/** Maps admin2 county/region codes to ONS regions */
const ADMIN2_TO_ONS_REGION: Record<string, string> = {
  // North East
  'Tyne and Wear': 'North East',
  'Durham': 'North East',
  'Northumberland': 'North East',
  'Cleveland': 'North East',

  // North West
  'Greater Manchester': 'North West',
  'Merseyside': 'North West',
  'Lancashire': 'North West',
  'Cheshire': 'North West',
  'Cumbria': 'North West',

  // Yorkshire
  'West Yorkshire': 'Yorkshire and The Humber',
  'South Yorkshire': 'Yorkshire and The Humber',
  'North Yorkshire': 'Yorkshire and The Humber',
  'East Riding of Yorkshire': 'Yorkshire and The Humber',
  'City of Kingston upon Hull': 'Yorkshire and The Humber',

  // East Midlands
  'Derbyshire': 'East Midlands',
  'Leicestershire': 'East Midlands',
  'Lincolnshire': 'East Midlands',
  'Northamptonshire': 'East Midlands',
  'Nottinghamshire': 'East Midlands',
  'Rutland': 'East Midlands',

  // West Midlands
  'West Midlands': 'West Midlands',
  'Staffordshire': 'West Midlands',
  'Warwickshire': 'West Midlands',
  'Worcestershire': 'West Midlands',
  'Herefordshire': 'West Midlands',
  'Shropshire': 'West Midlands',

  // East of England
  'Bedfordshire': 'East of England',
  'Cambridgeshire': 'East of England',
  'Essex': 'East of England',
  'Hertfordshire': 'East of England',
  'Norfolk': 'East of England',
  'Suffolk': 'East of England',

  // London
  'Greater London': 'London',
  'London': 'London',

  // South East
  'Berkshire': 'South East',
  'Buckinghamshire': 'South East',
  'East Sussex': 'South East',
  'Hampshire': 'South East',
  'Isle of Wight': 'South East',
  'Kent': 'South East',
  'Oxfordshire': 'South East',
  'Surrey': 'South East',
  'West Sussex': 'South East',

  // South West
  'Bristol': 'South West',
  'Cornwall': 'South West',
  'Devon': 'South West',
  'Dorset': 'South West',
  'Gloucestershire': 'South West',
  'Somerset': 'South West',
  'Wiltshire': 'South West',
}

/**
 * Get ONS drug death statistics for a location
 */
export function getONSStats(admin1: string, admin2: string): ONSRegionStats | null {
  // Scotland, Wales, NI — use country-level data
  if (admin1 === 'SCT') return ONS_REGION_STATS['Scotland']
  if (admin1 === 'WLS') return ONS_REGION_STATS['Wales']
  if (admin1 === 'NIR') return ONS_REGION_STATS['Northern Ireland']

  // England — look up by admin2
  const onsRegion = ADMIN2_TO_ONS_REGION[admin2]
  if (onsRegion && ONS_REGION_STATS[onsRegion]) return ONS_REGION_STATS[onsRegion]

  // Fallback
  return ONS_REGION_STATS['South East'] // median English region
}

/**
 * Returns a formatted paragraph for use in location page content.
 * e.g. "In the North East, there were 389 drug-related deaths in 2022 (ONS) — a rate of 15.4 per 100,000 population, the highest of any English region."
 */
export function getONSStatsParagraph(locationName: string, admin1: string, admin2: string): string {
  const stats = getONSStats(admin1, admin2)
  if (!stats) return ''

  const isHighRate = stats.ratePerHundredK >= 10
  const trendText = stats.trend === 'rising' ? 'and rising' : stats.trend === 'falling' ? 'and falling' : '(broadly stable)'

  return `In ${stats.region}, there were ${stats.drugDeaths2022.toLocaleString()} drug-related deaths in 2022 — a rate of ${stats.ratePerHundredK} per 100,000 population (${stats.source}). Alcohol-related hospital admissions in this region run at approximately ${stats.alcoholHospAdmissions} per 100,000 population. Rates are ${trendText}. ${isHighRate ? `${stats.region} has one of the highest drug death rates in the UK — local services in ${locationName} are under significant pressure.` : `If you or someone you know needs help with addiction in ${locationName}, free NHS support is available without a referral.`}`
}
