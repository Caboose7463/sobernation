/**
 * generate-rehab-proximity.js
 *
 * Pre-computes, for every location in locations.json that has NO direct CQC data,
 * the nearest CQC-indexed town by haversine distance.
 *
 * Output: data/rehab-proximity.json
 *   { [locationSlug]: { nearestSlug: string, nearestName: string, distanceKm: number } }
 *
 * Only stores mappings for locations WITHOUT direct CQC data.
 * Locations WITH direct data are looked up from rehabs.json at runtime.
 *
 * Also includes London-borough, Manchester-borough etc. aggregation so city pages
 * always return aggregated results.
 */

const fs = require('fs');
const path = require('path');

const locsPath  = path.join(__dirname, '../data/locations.json');
const rehabsPath = path.join(__dirname, '../data/rehabs.json');
const outPath   = path.join(__dirname, '../data/rehab-proximity.json');

const locsRaw  = JSON.parse(fs.readFileSync(locsPath, 'utf8'));
const rehabsRaw = JSON.parse(fs.readFileSync(rehabsPath, 'utf8'));

const allLocations = locsRaw.locations || locsRaw;
const rehabByTown  = rehabsRaw.byTown;

// -- City -> borough aggregation (same as in rehabs.ts) --------------------
const CITY_TO_BOROUGHS = {
  london: ['barking-and-dagenham','barnet','camden','croydon','ealing','enfield','greenwich','hackney','hammersmith-and-fulham','haringey','harrow','havering','hillingdon','hounslow','islington','kensington-and-chelsea','kingston-upon-thames','lambeth','lambeth-city-of','lewisham','lewishameshire','merton','newham','newhamland','redbridge','richmond-upon-thames','southwark','sutton','tower-hamlets','waltham-forest','wandsworth','westminster'],
  manchester: ['salford','salfordg','stockport','tameside','trafford','oldham','oldhamd','rochdale','wigan','bolton'],
  bristol:    ['south-gloucestershire','north-somerset','bath-and-north-east-somerset','bath-and-north-east-somerse'],
  leeds:      ['bradford','calderdale','kirklees','kirkleesam','wakefield'],
  liverpool:  ['knowsley','knowsley-and-hoverwen','sefton','seftonrdshire','st-helens','wirral'],
  sheffield:  ['barnsley','doncaster','rotherham'],
  'newcastle-upon-tyne': ['gateshead','north-tyneside','south-tyneside','sunderland'],
  reading:    ['west-berkshire','wokingham','bracknell-forest','windsor-and-maidenhead','slough'],
  northampton: ['north-northamptonshire','west-northamptonshire'],
  middlesbrough: ['stocktonontees','redcar-and-cleveland'],
};

// -- Determine which CQC slugs have usable data -----------------------------
function hasCQCData(slug) {
  if (rehabByTown[slug]?.centres?.length > 0) return true;
  const boroughs = CITY_TO_BOROUGHS[slug] || [];
  return boroughs.some(bs => rehabByTown[bs]?.centres?.length > 0);
}

// Build set of known CQC slugs
const cqcSlugs = new Set([
  ...Object.keys(rehabByTown).filter(s => rehabByTown[s].centres.length > 0),
  ...Object.keys(CITY_TO_BOROUGHS).filter(hasCQCData),
]);
console.log('CQC-indexed slugs:', cqcSlugs.size);

// -- Build a coordinate lookup for CQC towns --------------------------------
// For CQC slugs that ARE in locations.json, use their coords.
const locBySlug = Object.fromEntries(allLocations.map(l => [l.slug, l]));
const cqcCoords = {};

for (const slug of cqcSlugs) {
  if (locBySlug[slug]) {
    cqcCoords[slug] = { lat: locBySlug[slug].lat, lng: locBySlug[slug].lng, name: locBySlug[slug].name };
  }
}

// -- County / local authority coords ----------------------------------------
// CQC data is organised by local authority, not city. These slugs are not in
// locations.json (city database) but DO have treatment centres. We manually
// supply representative coordinates so nearby towns get the correct fallback.
const COUNTY_COORDS = {
  // South West
  'wiltshire':                          { lat: 51.06, lng: -2.14, name: 'Wiltshire' },
  'cornwall':                           { lat: 50.40, lng: -5.00, name: 'Cornwall' },
  'devon':                              { lat: 50.72, lng: -3.53, name: 'Devon' },
  'torbay':                             { lat: 50.46, lng: -3.53, name: 'Torbay' },
  'dorset':                             { lat: 50.75, lng: -2.35, name: 'Dorset' },
  'bournemouth-christchurch-and-poole': { lat: 50.72, lng: -1.88, name: 'Bournemouth' },
  'somerset':                           { lat: 51.10, lng: -2.79, name: 'Somerset' },
  'gloucestershire':                    { lat: 51.87, lng: -2.24, name: 'Gloucestershire' },
  'bristol-city-of':                    { lat: 51.46, lng: -2.60, name: 'Bristol' },
  // South East
  'hampshire':                          { lat: 51.06, lng: -1.31, name: 'Hampshire' },
  'isle-of-wight':                      { lat: 50.69, lng: -1.30, name: 'Isle of Wight' },
  'west-sussex':                        { lat: 50.92, lng: -0.46, name: 'West Sussex' },
  'brighton-and-hove':                  { lat: 50.83, lng: -0.14, name: 'Brighton' },
  'east-sussex':                        { lat: 50.87, lng:  0.27, name: 'East Sussex' },
  'kent':                               { lat: 51.28, lng:  0.53, name: 'Kent' },
  'medway':                             { lat: 51.39, lng:  0.51, name: 'Medway' },
  'surrey':                             { lat: 51.31, lng: -0.31, name: 'Surrey' },
  'oxfordshire':                        { lat: 51.76, lng: -1.26, name: 'Oxfordshire' },
  'buckinghamshire':                    { lat: 51.81, lng: -0.81, name: 'Buckinghamshire' },
  'west-berkshire':                     { lat: 51.40, lng: -1.32, name: 'West Berkshire' },
  // East of England
  'hertfordshire':                      { lat: 51.81, lng: -0.24, name: 'Hertfordshire' },
  'essex':                              { lat: 51.74, lng:  0.47, name: 'Essex' },
  'thurrock':                           { lat: 51.49, lng:  0.35, name: 'Thurrock' },
  'cambridgeshire':                     { lat: 52.23, lng:  0.14, name: 'Cambridgeshire' },
  'norfolk':                            { lat: 52.63, lng:  1.29, name: 'Norfolk' },
  'suffolk':                            { lat: 52.20, lng:  1.00, name: 'Suffolk' },
  'central-bedfordshire':               { lat: 52.00, lng: -0.45, name: 'Central Bedfordshire' },
  // East Midlands
  'leicestershire':                     { lat: 52.63, lng: -1.13, name: 'Leicestershire' },
  'rutland':                            { lat: 52.66, lng: -0.64, name: 'Rutland' },
  'nottinghamshire':                    { lat: 52.97, lng: -1.17, name: 'Nottinghamshire' },
  'derbyshire':                         { lat: 53.10, lng: -1.50, name: 'Derbyshire' },
  'lincolnshire':                       { lat: 53.23, lng: -0.53, name: 'Lincolnshire' },
  'north-lincolnshire':                 { lat: 53.59, lng: -0.65, name: 'North Lincolnshire' },
  'north-east-lincolnshire':            { lat: 53.57, lng: -0.08, name: 'Grimsby' },
  // West Midlands
  'worcestershire':                     { lat: 52.19, lng: -2.22, name: 'Worcestershire' },
  'warwickshire':                       { lat: 52.35, lng: -1.59, name: 'Warwickshire' },
  'herefordshire':                      { lat: 52.06, lng: -2.72, name: 'Herefordshire' },
  'herefordshire-county-of':            { lat: 52.06, lng: -2.72, name: 'Herefordshire' },
  'shropshire':                         { lat: 52.61, lng: -2.74, name: 'Shropshire' },
  'staffordshire':                      { lat: 52.80, lng: -2.12, name: 'Staffordshire' },
  'sandwell':                           { lat: 52.54, lng: -2.01, name: 'Sandwell' },
  // Yorkshire & Humber
  'north-yorkshire':                    { lat: 54.00, lng: -1.54, name: 'North Yorkshire' },
  'east-riding-of-yorkshire':           { lat: 53.84, lng: -0.43, name: 'East Riding of Yorkshire' },
  'kingston-upon-hull-city-of':         { lat: 53.75, lng: -0.34, name: 'Hull' },
  // North West
  'lancashire':                         { lat: 53.77, lng: -2.71, name: 'Lancashire' },
  'blackburn-with-darwen':              { lat: 53.75, lng: -2.49, name: 'Blackburn' },
  'cheshire-east':                      { lat: 53.10, lng: -2.33, name: 'Cheshire East' },
  'cheshire-west-and-chester':          { lat: 53.19, lng: -2.89, name: 'Chester' },
  // North East
  'county-durham':                      { lat: 54.78, lng: -1.57, name: 'County Durham' },
  'redcar-and-cleveland':               { lat: 54.61, lng: -1.07, name: 'Redcar and Cleveland' },
  // Cumbria (new unitary authorities 2023)
  'cumberland':                         { lat: 54.89, lng: -2.93, name: 'Cumbria North' },
  'westmorland-and-furness':            { lat: 54.33, lng: -2.74, name: 'Westmorland' },
};

for (const [slug, coord] of Object.entries(COUNTY_COORDS)) {
  if (cqcSlugs.has(slug) && !cqcCoords[slug]) {
    cqcCoords[slug] = coord;
  }
}

console.log('CQC slugs with known coords:', Object.keys(cqcCoords).length);

// -- Haversine distance -----------------------------------------------------
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// -- Build proximity map ----------------------------------------------------
const proximity = {};
let direct = 0;
let fallback = 0;

const cqcCoordsEntries = Object.entries(cqcCoords);

for (const loc of allLocations) {
  // Already has direct data -- no entry needed
  if (hasCQCData(loc.slug)) {
    direct++;
    continue;
  }

  if (!loc.lat || !loc.lng) continue; // no coords -- skip

  // Find nearest CQC town by haversine
  let nearestSlug = null;
  let nearestName = null;
  let nearestDist = Infinity;

  for (const [slug, coord] of cqcCoordsEntries) {
    const d = haversineKm(loc.lat, loc.lng, coord.lat, coord.lng);
    if (d < nearestDist) {
      nearestDist = d;
      nearestSlug = slug;
      nearestName = coord.name;
    }
  }

  if (nearestSlug) {
    proximity[loc.slug] = {
      nearestSlug,
      nearestName,
      distanceKm: Math.round(nearestDist),
    };
    fallback++;
  }
}

console.log('Locations with direct data:', direct);
console.log('Locations with proximity fallback:', fallback);
console.log('Sample proximity entries:');
Object.entries(proximity).slice(0, 10).forEach(([slug, data]) => {
  console.log(`  ${slug} -> ${data.nearestSlug} (${data.distanceKm}km)`);
});

fs.writeFileSync(outPath, JSON.stringify(proximity, null, 0));
const kb = Math.round(fs.statSync(outPath).size / 1024);
console.log(`\nSaved: ${outPath} (${kb}KB)`);
