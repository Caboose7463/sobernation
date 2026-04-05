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

// ── City → borough aggregation (same as in rehabs.ts) ────────────────────────
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

// ── Determine which CQC slugs have usable data ────────────────────────────────
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

// ── Build a coordinate lookup for CQC towns ───────────────────────────────────
// For CQC slugs that ARE in locations.json, use their coords.
// For borough aggregates (e.g. 'london' via boroughs), use the main city coords.
const locBySlug = Object.fromEntries(allLocations.map(l => [l.slug, l]));
const cqcCoords = {};

for (const slug of cqcSlugs) {
  if (locBySlug[slug]) {
    cqcCoords[slug] = { lat: locBySlug[slug].lat, lng: locBySlug[slug].lng, name: locBySlug[slug].name };
  }
}

// For CQC slugs that match local authority names (not in locations.json),
// use manually-specified representative coordinates (approx centre of the county
// or the location of a flagship treatment centre in that county).
const COUNTY_COORDS = {
  'wiltshire':               { lat: 51.06, lng: -2.14, name: 'Wiltshire' },   // near Clouds House
  'north-yorkshire':         { lat: 54.00, lng: -1.54, name: 'North Yorkshire' },
  'county-durham':           { lat: 54.78, lng: -1.57, name: 'County Durham' },
  'east-riding-of-yorkshire':{ lat: 53.84, lng: -0.43, name: 'East Riding of Yorkshire' },
  'herefordshire':           { lat: 52.06, lng: -2.72, name: 'Herefordshire' },
  'rutland':                 { lat: 52.66, lng: -0.64, name: 'Rutland' },
  'shropshire':              { lat: 52.61, lng: -2.74, name: 'Shropshire' },
  'cornwall':                { lat: 50.40, lng: -5.00, name: 'Cornwall' },
  'devon':                   { lat: 50.72, lng: -3.53, name: 'Devon' },
  'dorset':                  { lat: 50.75, lng: -2.35, name: 'Dorset' },
  'somerset':                { lat: 51.10, lng: -2.79, name: 'Somerset' },
  'gloucestershire':         { lat: 51.87, lng: -2.24, name: 'Gloucestershire' },
  'worcestershire':          { lat: 52.19, lng: -2.22, name: 'Worcestershire' },
  'warwickshire':            { lat: 52.35, lng: -1.59, name: 'Warwickshire' },
  'northamptonshire':        { lat: 52.28, lng: -0.88, name: 'Northamptonshire' },
  'lincolnshire':            { lat: 53.23, lng: -0.53, name: 'Lincolnshire' },
  'norfolk':                 { lat: 52.63, lng: 1.29,  name: 'Norfolk' },
  'suffolk':                 { lat: 52.20, lng: 1.00,  name: 'Suffolk' },
  'kent':                    { lat: 51.28, lng: 0.53,  name: 'Kent' },
  'hampshire':               { lat: 51.06, lng: -1.31, name: 'Hampshire' },
  'oxfordshire':             { lat: 51.76, lng: -1.26, name: 'Oxfordshire' },
  'buckinghamshire':         { lat: 51.81, lng: -0.81, name: 'Buckinghamshire' },
  'hertfordshire':           { lat: 51.81, lng: -0.24, name: 'Hertfordshire' },
  'essex':                   { lat: 51.74, lng: 0.47,  name: 'Essex' },
  'cambridgeshire':          { lat: 52.23, lng: 0.14,  name: 'Cambridgeshire' },
};

for (const [slug, coord] of Object.entries(COUNTY_COORDS)) {
  if (cqcSlugs.has(slug) && !cqcCoords[slug]) {
    cqcCoords[slug] = coord;
  }
}

console.log('CQC slugs with known coords:', Object.keys(cqcCoords).length);

// ── Haversine distance ────────────────────────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ── Build proximity map ───────────────────────────────────────────────────────
const proximity = {};
let direct = 0;
let fallback = 0;

const cqcCoordsEntries = Object.entries(cqcCoords);

for (const loc of allLocations) {
  // Already has direct data — no entry needed
  if (hasCQCData(loc.slug)) {
    direct++;
    continue;
  }

  if (!loc.lat || !loc.lng) continue; // no coords — skip

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
  console.log(`  ${slug} → ${data.nearestSlug} (${data.distanceKm}km)`);
});

fs.writeFileSync(outPath, JSON.stringify(proximity, null, 0));
const kb = Math.round(fs.statSync(outPath).size / 1024);
console.log(`\nSaved: ${outPath} (${kb}KB)`);
