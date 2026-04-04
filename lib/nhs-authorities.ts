/**
 * Maps UK regions / admin areas to their NHS Integrated Care Board (ICB)
 * or equivalent health authority (HSCP in Scotland, LHB in Wales).
 * 
 * Used to add genuine local content to every location page —
 * "Your local NHS drug and alcohol service is run by [ICB]"
 * This makes each page meaningfully unique and demonstrates local relevance.
 * 
 * Sources: NHS England ICB directory, NHS Scotland HSCPs, NHS Wales LHBs
 */

interface NHSAuthority {
  name: string           // Full name e.g. "NHS Greater Manchester ICB"
  type: 'ICB' | 'HSCP' | 'LHB' | 'Trust'
  frankUrl: string       // Frank service finder URL
  website?: string
  phone?: string         // Local DAAT phone if known
}

/** Maps admin2 region codes / names to NHS authority */
const NHS_AUTHORITY_MAP: Record<string, NHSAuthority> = {
  // === ENGLAND — NHS ICBs (Integrated Care Boards since July 2022) ===

  // North West
  'greater-manchester': { name: 'NHS Greater Manchester ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=M1+1AE', website: 'https://gmintegratedcare.org.uk' },
  'cheshire-and-merseyside': { name: 'NHS Cheshire and Merseyside ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=L1+1JH' },
  'lancashire-and-south-cumbria': { name: 'NHS Lancashire and South Cumbria ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=PR1+2PP' },

  // Yorkshire
  'west-yorkshire': { name: 'NHS West Yorkshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=LS1+1BA' },
  'south-yorkshire': { name: 'NHS South Yorkshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=S1+2PP' },
  'humber-and-north-yorkshire': { name: 'NHS Humber and North Yorkshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=YO1+8QA' },

  // North East
  'north-east-and-north-cumbria': { name: 'NHS North East and North Cumbria ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=NE1+5DL' },

  // Midlands
  'birmingham-and-solihull': { name: 'NHS Birmingham and Solihull ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=B1+1BB' },
  'black-country': { name: 'NHS Black Country ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=WV1+1RL' },
  'coventry-and-warwickshire': { name: 'NHS Coventry and Warwickshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=CV1+2GF' },
  'derby-and-derbyshire': { name: 'NHS Derby and Derbyshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=DE1+2FT' },
  'leicester-leicestershire-and-rutland': { name: 'NHS Leicester, Leicestershire and Rutland ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=LE1+6TH' },
  'lincolnshire': { name: 'NHS Lincolnshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=LN1+3DZ' },
  'northamptonshire': { name: 'NHS Northamptonshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=NN1+2HJ' },
  'nottingham-and-nottinghamshire': { name: 'NHS Nottingham and Nottinghamshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=NG1+3GG' },
  'shropshire-telford-and-wrekin': { name: 'NHS Shropshire, Telford and Wrekin ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=SY1+1PD' },
  'staffordshire-and-stoke-on-trent': { name: 'NHS Staffordshire and Stoke-on-Trent ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=ST1+1LQ' },
  'herefordshire-and-worcestershire': { name: 'NHS Herefordshire and Worcestershire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=WR1+2EA' },

  // East of England
  'hertfordshire-and-west-essex': { name: 'NHS Hertfordshire and West Essex ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=AL1+3TW' },
  'bedfordshire-luton-and-milton-keynes': { name: 'NHS Bedfordshire, Luton and Milton Keynes ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=MK9+3DS' },
  'cambridge-and-peterborough': { name: 'NHS Cambridgeshire and Peterborough ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=CB1+1LH' },
  'norfolk-and-waveney': { name: 'NHS Norfolk and Waveney ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=NR1+3QH' },
  'suffolk-and-north-east-essex': { name: 'NHS Suffolk and North East Essex ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=IP1+2TG' },
  'mid-and-south-essex': { name: 'NHS Mid and South Essex ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=CM2+0QH' },

  // London
  'north-central-london': { name: 'NHS North Central London ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=N1+2JD' },
  'north-east-london': { name: 'NHS North East London ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=E1+6QH' },
  'north-west-london': { name: 'NHS North West London ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=W2+1NY' },
  'south-east-london': { name: 'NHS South East London ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=SE1 7EH' },
  'south-west-london': { name: 'NHS South West London ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=SW1A 1AA' },

  // South East
  'kent-and-medway': { name: 'NHS Kent and Medway ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=ME14 1XX' },
  'surrey-heartlands': { name: 'NHS Surrey Heartlands ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=GU1 1LR' },
  'sussex': { name: 'NHS Sussex ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=BN1 1UA' },
  'hampshire-and-isle-of-wight': { name: 'NHS Hampshire and Isle of Wight ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=SO14 7DW' },
  'buckinghamshire-oxfordshire-and-berkshire-west': { name: 'NHS Buckinghamshire, Oxfordshire and Berkshire West ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=OX1 2BQ' },

  // South West
  'bath-and-north-east-somerset-swindon-and-wiltshire': { name: 'NHS Bath and North East Somerset, Swindon and Wiltshire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=BA1 1HE' },
  'bristol-north-somerset-and-south-gloucestershire': { name: 'NHS Bristol, North Somerset and South Gloucestershire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=BS1 4DJ' },
  'cornwall-and-the-isles-of-scilly': { name: 'NHS Cornwall and the Isles of Scilly ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=TR1 2LR' },
  'devon': { name: 'NHS Devon ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=EX1 1GE' },
  'dorset': { name: 'NHS Dorset ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=DT1 1AJ' },
  'gloucestershire': { name: 'NHS Gloucestershire ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=GL1 1QH' },
  'somerset': { name: 'NHS Somerset ICB', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help?postcode=TA1 1JW' },

  // === SCOTLAND — Health and Social Care Partnerships ===
  'city-of-edinburgh': { name: 'Edinburgh HSCP (NHS Lothian)', type: 'HSCP', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://www.nhslothian.scot' },
  'glasgow-city': { name: 'Glasgow City HSCP (NHS Greater Glasgow and Clyde)', type: 'HSCP', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://www.nhsggc.org.uk' },
  'aberdeen-city': { name: 'Aberdeen City HSCP (NHS Grampian)', type: 'HSCP', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://www.nhsgrampian.org' },
  'dundee-city': { name: 'Dundee City HSCP (NHS Tayside)', type: 'HSCP', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://www.nhstayside.scot.nhs.uk' },
  'highland': { name: 'Highland HSCP (NHS Highland)', type: 'HSCP', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://www.nhshighland.scot.nhs.uk' },

  // === WALES — Local Health Boards ===
  'cardiff': { name: 'Cardiff and Vale University LHB', type: 'LHB', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://cavuhb.nhs.wales' },
  'swansea': { name: 'Swansea Bay University LHB', type: 'LHB', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://sbuhb.nhs.wales' },
  'newport': { name: 'Aneurin Bevan University LHB', type: 'LHB', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://abuhb.nhs.wales' },
  'wrexham': { name: 'Betsi Cadwaladr University LHB', type: 'LHB', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://bcuhb.nhs.wales' },

  // === NORTHERN IRELAND ===
  'belfast': { name: 'Belfast Health and Social Care Trust', type: 'Trust', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://www.belfasttrust.hscni.net' },
  'derry': { name: 'Western Health and Social Care Trust', type: 'Trust', frankUrl: 'https://www.talktofrank.com/get-help', website: 'https://www.westerntrust.hscni.net' },
}

/** Country-level fallback by admin1 code */
const COUNTRY_FALLBACK: Record<string, NHSAuthority> = {
  ENG: { name: 'your local NHS Integrated Care Board (ICB)', type: 'ICB', frankUrl: 'https://www.talktofrank.com/get-help' },
  SCT: { name: 'your local Health and Social Care Partnership (HSCP)', type: 'HSCP', frankUrl: 'https://www.talktofrank.com/get-help' },
  WLS: { name: 'your local NHS Local Health Board (LHB)', type: 'LHB', frankUrl: 'https://www.talktofrank.com/get-help' },
  NIR: { name: 'your local Health and Social Care Trust', type: 'Trust', frankUrl: 'https://www.talktofrank.com/get-help' },
}

/**
 * Get the NHS authority for a location.
 * Tries slug match, then admin2 match, then country fallback.
 */
export function getNHSAuthority(
  locationSlug: string,
  admin2: string,
  admin1: string,
): NHSAuthority {
  // Direct slug match (e.g. "glasgow")
  if (NHS_AUTHORITY_MAP[locationSlug]) return NHS_AUTHORITY_MAP[locationSlug]

  // admin2 normalised match
  const admin2Key = admin2.toLowerCase().replace(/\s+/g, '-')
  if (NHS_AUTHORITY_MAP[admin2Key]) return NHS_AUTHORITY_MAP[admin2Key]

  // Country fallback
  return COUNTRY_FALLBACK[admin1] ?? COUNTRY_FALLBACK['ENG']
}

/**
 * Returns a formatted string for use in page content, e.g.:
 * "NHS North East and North Cumbria ICB"
 */
export function getNHSAuthorityName(
  locationSlug: string,
  admin2: string,
  admin1: string,
): string {
  return getNHSAuthority(locationSlug, admin2, admin1).name
}
