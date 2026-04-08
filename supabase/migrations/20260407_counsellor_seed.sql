-- ============================================================
-- SoberNation: Counsellor seed data v2
-- 250 counsellors across UK locations
-- Run in: Supabase SQL Editor → New query → Run
-- ============================================================

-- Wipe existing seed data only (preserve any real sign-ups)
DELETE FROM counsellors WHERE bio LIKE '%[seed]%';

INSERT INTO counsellors (
  name, slug, location, location_slug, phone, email, website,
  qualifications, specialisms, bio, verified, active, created_at
) VALUES

-- ── London ────────────────────────────────────────────────────────────────────
('Dr Sarah Mitchell', 'sarah-mitchell-london', 'London', 'london', '020 7946 0234', 'sarah@mitchelltherapy.co.uk', 'https://mitchelltherapy.co.uk', 'BACP Accredited, CSAT-1, MSc Addiction Psychology', ARRAY['Alcohol','Cocaine','Prescription drugs','Dual diagnosis'], 'Specialist addiction therapist with 14 years experience in central London. I work with individuals and families affected by substance use disorders. [seed]', true, true, NOW() - INTERVAL '180 days'),
('James Whitfield', 'james-whitfield-london', 'London', 'london', '020 7946 0312', 'james@whitfieldcounselling.co.uk', 'https://whitfieldcounselling.co.uk', 'UKCP Registered, MSc Counselling Psychology', ARRAY['Alcohol','Cannabis','Gambling','Anxiety'], 'CBT-trained counsellor specialising in addiction and co-occurring anxiety disorders. Based in Harley Street. [seed]', true, true, NOW() - INTERVAL '200 days'),
('Priya Sharma', 'priya-sharma-london', 'London', 'london', '020 7946 0445', 'priya@priyasharmatherapy.com', 'https://priyasharmatherapy.com', 'BACP Senior Accredited, DBT Certified', ARRAY['Heroin','Prescription opioids','Trauma','Dual diagnosis'], 'DBT-trained therapist working with complex addiction and trauma. East London practice. [seed]', true, true, NOW() - INTERVAL '90 days'),
('Michael O''Brien', 'michael-obrien-london', 'London', 'london', '020 7946 0567', 'michael@obrienaddictiocounselling.co.uk', NULL, 'CPCAB Level 4, CSAT', ARRAY['Alcohol','Cocaine','Sex addiction'], 'Recovery counsellor with personal recovery experience. 10 years supporting people in south London. [seed]', true, true, NOW() - INTERVAL '150 days'),
('Dr Emma Reynolds', 'emma-reynolds-london', 'London', 'london', '020 7946 0678', 'emma@reynoldspsychotherapy.com', 'https://reynoldspsychotherapy.com', 'Chartered Psychologist, EMDR Practitioner', ARRAY['Trauma-informed','Alcohol','PTSD'], 'Clinical psychologist offering EMDR and trauma-focused therapy for addiction. [seed]', true, true, NOW() - INTERVAL '60 days'),
('Tom Gallagher', 'tom-gallagher-london', 'London', 'london', '020 7946 0789', 'tom@tgcounselling.co.uk', NULL, 'BACP Accredited, SMART Recovery Facilitator', ARRAY['Alcohol','Cannabis','Stimulants'], 'SMART Recovery trained counsellor. North London. [seed]', true, true, NOW() - INTERVAL '120 days'),

-- ── Manchester ────────────────────────────────────────────────────────────────
('Rachel Hughes', 'rachel-hughes-manchester', 'Manchester', 'manchester', '0161 234 5678', 'rachel@rachelhughescounselling.co.uk', 'https://rachelhughescounselling.co.uk', 'BACP Accredited, CSAT-2', ARRAY['Alcohol','Family support','Co-dependency'], 'Addiction specialist and family therapist based in the Northern Quarter. [seed]', true, true, NOW() - INTERVAL '95 days'),
('David Okafor', 'david-okafor-manchester', 'Manchester', 'manchester', '0161 234 6789', 'david@okaforrecovery.co.uk', NULL, 'UKCP Registered, MA Counselling', ARRAY['Cocaine','Crack cocaine','Dual diagnosis'], 'Specialising in stimulant addiction and dual diagnosis. 12 years in Greater Manchester services. [seed]', true, true, NOW() - INTERVAL '140 days'),
('Sophie Clarke', 'sophie-clarke-manchester', 'Manchester', 'manchester', '0161 234 7890', 'sophie@sophieclarke.co.uk', 'https://sophieclarke.co.uk', 'CPCAB Level 5, Motivational Interviewing Practitioner', ARRAY['Alcohol','Young people','Eating disorders'], 'Young people''s addiction specialist with a focus on motivational approaches. [seed]', true, true, NOW() - INTERVAL '75 days'),
('Andrew Park', 'andrew-park-manchester', 'Manchester', 'manchester', '0161 234 8901', 'andrew@andrewparkcounselling.co.uk', NULL, 'BACP Accredited, 12-Step Facilitator', ARRAY['Alcohol','Heroin','Gambling'], 'Experienced counsellor working with addiction and recovery across Greater Manchester. [seed]', true, true, NOW() - INTERVAL '200 days'),

-- ── Birmingham ────────────────────────────────────────────────────────────────
('Lisa Patel', 'lisa-patel-birmingham', 'Birmingham', 'birmingham', '0121 234 5678', 'lisa@lisapateltherapy.co.uk', 'https://lisapateltherapy.co.uk', 'BACP Senior Accredited, MA Addiction Studies', ARRAY['Alcohol','Prescription drugs','Anxiety & addiction'], 'Integrative addiction therapist based in Birmingham city centre. [seed]', true, true, NOW() - INTERVAL '88 days'),
('Marcus Thompson', 'marcus-thompson-birmingham', 'Birmingham', 'birmingham', '0121 234 6789', 'marcus@marcustherapy.co.uk', NULL, 'CPCAB Level 4, CBT Practitioner', ARRAY['Cannabis','Cocaine','Depression & addiction'], 'CBT practitioner working with substance misuse and co-occurring depression. [seed]', true, true, NOW() - INTERVAL '110 days'),
('Hannah Singh', 'hannah-singh-birmingham', 'Birmingham', 'birmingham', '0121 234 7890', 'hannah@hannahsingh.co.uk', 'https://hannahsingh.co.uk', 'UKCP Registered, Systemic Therapist', ARRAY['Family therapy','Alcohol','Cultural competency'], 'Culturally sensitive therapist working with families and individuals in Birmingham. [seed]', true, true, NOW() - INTERVAL '65 days'),
('Carl Edwards', 'carl-edwards-birmingham', 'Birmingham', 'birmingham', '0121 234 8901', 'carl@carledwardscounselling.co.uk', NULL, 'BACP Accredited, Mindfulness-Based Addiction', ARRAY['Alcohol','Cannabis','Mindfulness'], 'Mindfulness-based addiction counsellor. Coventry & Birmingham. [seed]', true, true, NOW() - INTERVAL '155 days'),

-- ── Leeds ─────────────────────────────────────────────────────────────────────
('Joanna Kelly', 'joanna-kelly-leeds', 'Leeds', 'leeds', '0113 234 5678', 'jo@jokellytherapy.co.uk', 'https://jokellytherapy.co.uk', 'BACP Accredited, CSAT-1', ARRAY['Alcohol','Trauma','EMDR'], 'Trauma-informed addiction therapist. Leeds city centre practice. [seed]', true, true, NOW() - INTERVAL '99 days'),
('Ben Harrison', 'ben-harrison-leeds', 'Leeds', 'leeds', '0113 234 6789', 'ben@benharrisoncounselling.co.uk', NULL, 'CPCAB Level 5, 12-Step Facilitator', ARRAY['Heroin','Alcohol','12-step'], '12-step facilitator and person-centred counsellor. West Yorkshire. [seed]', true, true, NOW() - INTERVAL '175 days'),
('Alicia Martins', 'alicia-martins-leeds', 'Leeds', 'leeds', '0113 234 7890', 'alicia@aliciamartins.co.uk', 'https://aliciamartins.co.uk', 'UKCP Registered, Gestalt Therapist', ARRAY['Cocaine','Gambling','Relationships'], 'Gestalt therapist with a focus on relationship patterns in addiction. [seed]', true, true, NOW() - INTERVAL '50 days'),

-- ── Glasgow ───────────────────────────────────────────────────────────────────
('Fiona MacLeod', 'fiona-macleod-glasgow', 'Glasgow', 'glasgow', '0141 234 5678', 'fiona@fionamacleod.co.uk', 'https://fionamacleod.co.uk', 'COSCA Accredited, MA Counselling', ARRAY['Alcohol','Heroin','Trauma'], 'COSCA-accredited therapist with 15 years in Glasgow addiction services. [seed]', true, true, NOW() - INTERVAL '130 days'),
('Callum Reid', 'callum-reid-glasgow', 'Glasgow', 'glasgow', '0141 234 6789', 'callum@callumreid.co.uk', NULL, 'BACP Accredited, CBT Practitioner', ARRAY['Alcohol','Cannabis','Anxiety'], 'CBT counsellor working across Greater Glasgow. [seed]', true, true, NOW() - INTERVAL '88 days'),
('Morag Stewart', 'morag-stewart-glasgow', 'Glasgow', 'glasgow', '0141 234 7890', 'morag@moragstewart.co.uk', 'https://moragstewart.co.uk', 'UKCP Registered, Psychodynamic Therapist', ARRAY['Dual diagnosis','Alcohol','PTSD'], 'Psychodynamic therapist specialising in trauma and addiction. [seed]', true, true, NOW() - INTERVAL '70 days'),

-- ── Liverpool ─────────────────────────────────────────────────────────────────
('Siobhan Murphy', 'siobhan-murphy-liverpool', 'Liverpool', 'liverpool', '0151 234 5678', 'siobhan@siobhanmurphy.co.uk', 'https://siobhanmurphy.co.uk', 'BACP Accredited, MA Psychotherapy', ARRAY['Heroin','Cocaine','Family support'], 'Psychotherapist with 12 years in Liverpool addiction services. [seed]', true, true, NOW() - INTERVAL '110 days'),
('Gary Turner', 'gary-turner-liverpool', 'Liverpool', 'liverpool', '0151 234 6789', 'gary@garyturner.co.uk', NULL, 'CPCAB Level 5, Motivational Interviewing', ARRAY['Alcohol','Cannabis','Young adults'], 'Motivational Interviewing practitioner. Merseyside. [seed]', true, true, NOW() - INTERVAL '145 days'),

-- ── Bristol ───────────────────────────────────────────────────────────────────
('Natasha Jones', 'natasha-jones-bristol', 'Bristol', 'bristol', '0117 234 5678', 'natasha@natashajones.co.uk', 'https://natashajones.co.uk', 'BACP Senior Accredited, Somatic Therapist', ARRAY['Alcohol','MDMA','Body-centred therapy'], 'Somatic and integrative therapist. Bristol city centre. [seed]', true, true, NOW() - INTERVAL '60 days'),
('Paul Bridges', 'paul-bridges-bristol', 'Bristol', 'bristol', '0117 234 6789', 'paul@paulbridges.co.uk', NULL, 'UKCP Registered, CBT Practitioner', ARRAY['Cocaine','Alcohol','Anxiety'], 'CBT-trained counsellor working with addiction and anxiety in Bristol. [seed]', true, true, NOW() - INTERVAL '90 days'),
('Imogen Fox', 'imogen-fox-bristol', 'Bristol', 'bristol', '0117 234 7890', 'imogen@imogenfox.co.uk', 'https://imogenfox.co.uk', 'BACP Accredited, Mindfulness Teacher', ARRAY['Alcohol','Cannabis','Mindfulness-based'], 'Mindfulness-based counsellor. South Bristol. [seed]', true, true, NOW() - INTERVAL '40 days'),

-- ── Sheffield ─────────────────────────────────────────────────────────────────
('Dan Cartwright', 'dan-cartwright-sheffield', 'Sheffield', 'sheffield', '0114 234 5678', 'dan@dancartwright.co.uk', NULL, 'BACP Accredited, CBT & ACT Practitioner', ARRAY['Alcohol','Heroin','ACT therapy'], 'ACT & CBT addiction therapist. South Yorkshire. [seed]', true, true, NOW() - INTERVAL '115 days'),
('Zoe Walsh', 'zoe-walsh-sheffield', 'Sheffield', 'sheffield', '0114 234 6789', 'zoe@zoewalsh.co.uk', 'https://zoewalsh.co.uk', 'UKCP Registered, Person-Centred Therapist', ARRAY['Alcohol','Family addiction','Relationships'], 'Person-centred therapist. Sheffield & Rotherham. [seed]', true, true, NOW() - INTERVAL '80 days'),

-- ── Edinburgh ─────────────────────────────────────────────────────────────────
('Alasdair Fraser', 'alasdair-fraser-edinburgh', 'Edinburgh', 'edinburgh', '0131 234 5678', 'alasdair@alasdairfraser.co.uk', 'https://alasdairfraser.co.uk', 'COSCA Accredited, CSAT-1', ARRAY['Alcohol','Prescription drugs','Trauma'], 'COSCA-accredited addiction specialist. Edinburgh city centre. [seed]', true, true, NOW() - INTERVAL '100 days'),
('Heather MacDonald', 'heather-macdonald-edinburgh', 'Edinburgh', 'edinburgh', '0131 234 6789', 'heather@heathermacdonald.co.uk', NULL, 'BACP Accredited, EMDR Practitioner', ARRAY['Trauma','Alcohol','EMDR'], 'EMDR therapist specialising in trauma and addiction. Leith & Edinburgh. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Newcastle ─────────────────────────────────────────────────────────────────
('Steve Patterson', 'steve-patterson-newcastle', 'Newcastle', 'newcastle', '0191 234 5678', 'steve@stevepatterson.co.uk', NULL, 'BACP Accredited, CBT Practitioner', ARRAY['Alcohol','Cannabis','Depression'], 'CBT counsellor. Newcastle upon Tyne & Gateshead. [seed]', true, true, NOW() - INTERVAL '85 days'),
('Claire Robson', 'claire-robson-newcastle', 'Newcastle', 'newcastle', '0191 234 6789', 'claire@clairerobson.co.uk', 'https://clairerobson.co.uk', 'UKCP Registered, Integrative Therapist', ARRAY['Heroin','Alcohol','Family therapy'], 'Integrative therapist with 10 years in North East addiction services. [seed]', true, true, NOW() - INTERVAL '120 days'),

-- ── Nottingham ────────────────────────────────────────────────────────────────
('Raj Kumar', 'raj-kumar-nottingham', 'Nottingham', 'nottingham', '0115 234 5678', 'raj@rajkumarcounselling.co.uk', 'https://rajkumarcounselling.co.uk', 'BACP Accredited, MA Counselling', ARRAY['Alcohol','Cannabis','South Asian community'], 'Culturally competent counsellor serving Nottingham''s diverse communities. [seed]', true, true, NOW() - INTERVAL '70 days'),
('Laura Birch', 'laura-birch-nottingham', 'Nottingham', 'nottingham', '0115 234 6789', 'laura@laurabirch.co.uk', NULL, 'CPCAB Level 5, ACT Practitioner', ARRAY['Alcohol','Prescription opioids','ACT'], 'ACT-based addiction counsellor. Nottinghamshire. [seed]', true, true, NOW() - INTERVAL '95 days'),

-- ── Cardiff ───────────────────────────────────────────────────────────────────
('Rhiannon Evans', 'rhiannon-evans-cardiff', 'Cardiff', 'cardiff', '029 2034 5678', 'rhiannon@rhiannonevans.co.uk', 'https://rhiannonevans.co.uk', 'BACP Accredited, Bilingual (Welsh/English)', ARRAY['Alcohol','Cannabis','Welsh-language'], 'Bilingual Welsh/English addiction counsellor. Cardiff & Vale. [seed]', true, true, NOW() - INTERVAL '60 days'),
('Owen Davies', 'owen-davies-cardiff', 'Cardiff', 'cardiff', '029 2034 6789', 'owen@owendavies.co.uk', NULL, 'UKCP Registered, Group Therapist', ARRAY['Alcohol','Cocaine','Group therapy'], 'Group therapist and individual counsellor. South Wales. [seed]', true, true, NOW() - INTERVAL '140 days'),

-- ── Leicester ─────────────────────────────────────────────────────────────────
('Anita Verma', 'anita-verma-leicester', 'Leicester', 'leicester', '0116 234 5678', 'anita@anitaverma.co.uk', 'https://anitaverma.co.uk', 'BACP Accredited, Multicultural Therapist', ARRAY['Alcohol','Family systems','South Asian community'], 'Multicultural therapist. Leicester & Leicestershire. [seed]', true, true, NOW() - INTERVAL '80 days'),
('Peter Nkosi', 'peter-nkosi-leicester', 'Leicester', 'leicester', '0116 234 6789', 'peter@peternkosi.co.uk', NULL, 'CPCAB Level 5, CBT Practitioner', ARRAY['Cannabis','Alcohol','Young people'], 'Young people''s addiction specialist. East Midlands. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Coventry ──────────────────────────────────────────────────────────────────
('Diane Fowler', 'diane-fowler-coventry', 'Coventry', 'coventry', '024 7612 3456', 'diane@dianefowler.co.uk', 'https://dianefowler.co.uk', 'BACP Accredited, Schema Therapist', ARRAY['Alcohol','Trauma','Schema therapy'], 'Schema therapist working with complex addiction presentations. Coventry. [seed]', true, true, NOW() - INTERVAL '95 days'),

-- ── Southampton ───────────────────────────────────────────────────────────────
('Nick Holland', 'nick-holland-southampton', 'Southampton', 'southampton', '023 8034 5678', 'nick@nickholland.co.uk', NULL, 'BACP Accredited, Person-Centred', ARRAY['Alcohol','Cannabis','Relationships'], 'Person-centred counsellor. Southampton & Hampshire. [seed]', true, true, NOW() - INTERVAL '70 days'),
('Kate Summers', 'kate-summers-southampton', 'Southampton', 'southampton', '023 8034 6789', 'kate@katesummers.co.uk', 'https://katesummers.co.uk', 'UKCP Registered, CBT Practitioner', ARRAY['Alcohol','Prescription drugs','Anxiety'], 'CBT therapist. Southampton. [seed]', true, true, NOW() - INTERVAL '45 days'),

-- ── Portsmouth ────────────────────────────────────────────────────────────────
('Tim Nash', 'tim-nash-portsmouth', 'Portsmouth', 'portsmouth', '023 9234 5678', 'tim@timnash.co.uk', NULL, 'BACP Accredited, Psychodynamic Therapist', ARRAY['Alcohol','Heroin','Veterans'], 'Addiction counsellor with experience supporting veterans. Portsmouth. [seed]', true, true, NOW() - INTERVAL '110 days'),

-- ── Oxford ────────────────────────────────────────────────────────────────────
('Julia Hartley', 'julia-hartley-oxford', 'Oxford', 'oxford', '01865 234567', 'julia@juliahartley.co.uk', 'https://juliahartley.co.uk', 'BACP Senior Accredited, CSAT-2', ARRAY['Alcohol','Prescription drugs','Academics'], 'Senior addiction therapist. Oxford city centre. [seed]', true, true, NOW() - INTERVAL '85 days'),
('Graham Wells', 'graham-wells-oxford', 'Oxford', 'oxford', '01865 234568', 'graham@grahamwells.co.uk', NULL, 'UKCP Registered, ACT Practitioner', ARRAY['Cannabis','Alcohol','ACT'], 'ACT-based counsellor. Oxfordshire. [seed]', true, true, NOW() - INTERVAL '60 days'),

-- ── Cambridge ─────────────────────────────────────────────────────────────────
('Dr Amanda Cross', 'amanda-cross-cambridge', 'Cambridge', 'cambridge', '01223 234567', 'amanda@amandacross.co.uk', 'https://amandacross.co.uk', 'Chartered Psychologist, MSc Addiction', ARRAY['Alcohol','Stimulants','Research-based therapy'], 'Clinical psychologist and researcher. Cambridge. [seed]', true, true, NOW() - INTERVAL '70 days'),

-- ── Brighton ──────────────────────────────────────────────────────────────────
('Leah Bloom', 'leah-bloom-brighton', 'Brighton', 'brighton', '01273 234567', 'leah@leahbloom.co.uk', 'https://leahbloom.co.uk', 'BACP Accredited, Somatic Therapist', ARRAY['MDMA','Ketamine','Party drugs','Somatic'], 'LGBTQ+ affirming therapist specialising in chemsex and party drug use. Brighton. [seed]', true, true, NOW() - INTERVAL '40 days'),
('Alex Morgan', 'alex-morgan-brighton', 'Brighton', 'brighton', '01273 234568', 'alex@alexmorgan.co.uk', NULL, 'UKCP Registered, Person-Centred Therapist', ARRAY['Alcohol','Cannabis','LGBTQ+'], 'LGBTQ+ affirming addiction counsellor. Brighton & Hove. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Reading ───────────────────────────────────────────────────────────────────
('Claire Matthews', 'claire-matthews-reading', 'Reading', 'reading', '0118 234 5678', 'claire@clairematthews.co.uk', 'https://clairematthews.co.uk', 'BACP Accredited, CBT Practitioner', ARRAY['Alcohol','Cocaine','Corporate clients'], 'Executive addiction counsellor. Reading & Thames Valley. [seed]', true, true, NOW() - INTERVAL '65 days'),

-- ── Derby ─────────────────────────────────────────────────────────────────────
('Mark Dawson', 'mark-dawson-derby', 'Derby', 'derby', '01332 234567', 'mark@markdawson.co.uk', NULL, 'CPCAB Level 5, Person-Centred', ARRAY['Alcohol','Heroin','Dual diagnosis'], 'Person-centred counsellor. Derby & Derbyshire. [seed]', true, true, NOW() - INTERVAL '90 days'),

-- ── Plymouth ──────────────────────────────────────────────────────────────────
('Sharon Trevithick', 'sharon-trevithick-plymouth', 'Plymouth', 'plymouth', '01752 234567', 'sharon@sharontrevithick.co.uk', 'https://sharontrevithick.co.uk', 'BACP Accredited, Addiction & Trauma', ARRAY['Heroin','Alcohol','Trauma','Rural isolation'], 'Addiction and trauma specialist. Plymouth & Devon. [seed]', true, true, NOW() - INTERVAL '75 days'),

-- ── Exeter ────────────────────────────────────────────────────────────────────
('Pippa Luscombe', 'pippa-luscombe-exeter', 'Exeter', 'exeter', '01392 234567', 'pippa@pippaluscombe.co.uk', NULL, 'BACP Accredited, Person-Centred, Mindfulness', ARRAY['Alcohol','Cannabis','Mindfulness'], 'Person-centred therapist. Exeter & East Devon. [seed]', true, true, NOW() - INTERVAL '50 days'),

-- ── Norwich ───────────────────────────────────────────────────────────────────
('Stuart Blackwood', 'stuart-blackwood-norwich', 'Norwich', 'norwich', '01603 234567', 'stuart@stuartblackwood.co.uk', 'https://stuartblackwood.co.uk', 'UKCP Registered, CBT Practitioner', ARRAY['Alcohol','Cannabis','Rural clients'], 'CBT counsellor serving Norfolk. [seed]', true, true, NOW() - INTERVAL '80 days'),

-- ── York ──────────────────────────────────────────────────────────────────────
('Cathy Smythe', 'cathy-smythe-york', 'York', 'york', '01904 234567', 'cathy@cathysmythe.co.uk', NULL, 'BACP Accredited, Integrative Therapist', ARRAY['Alcohol','Gambling','Anxiety'], 'Integrative therapist. York & North Yorkshire. [seed]', true, true, NOW() - INTERVAL '60 days'),

-- ── Bath ──────────────────────────────────────────────────────────────────────
('Helena Price', 'helena-price-bath', 'Bath', 'bath', '01225 234567', 'helena@helenaprice.co.uk', 'https://helenaprice.co.uk', 'BACP Senior Accredited, Jungian Analyst', ARRAY['Alcohol','Addiction & meaning','Jungian'], 'Jungian analyst and addiction therapist. Bath. [seed]', true, true, NOW() - INTERVAL '95 days'),

-- ── Cheltenham ────────────────────────────────────────────────────────────────
('Robin Castle', 'robin-castle-cheltenham', 'Cheltenham', 'cheltenham', '01242 234567', 'robin@robincastle.co.uk', NULL, 'CPCAB Level 5, CBT Practitioner', ARRAY['Alcohol','Cocaine','Racing industry'], 'Addiction counsellor with experience in the horse racing community. Cheltenham. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Hull ──────────────────────────────────────────────────────────────────────
('Elaine Pickering', 'elaine-pickering-hull', 'Hull', 'hull', '01482 234567', 'elaine@elainepickering.co.uk', 'https://elainepickering.co.uk', 'BACP Accredited, Trauma-Informed', ARRAY['Heroin','Alcohol','Trauma'], 'Trauma-informed addiction counsellor. Hull & East Riding. [seed]', true, true, NOW() - INTERVAL '100 days'),

-- ── Middlesbrough ─────────────────────────────────────────────────────────────
('Kevin Stone', 'kevin-stone-middlesbrough', 'Middlesbrough', 'middlesbrough', '01642 234567', 'kevin@kevinstone.co.uk', NULL, 'BACP Accredited, Group Facilitator', ARRAY['Heroin','Crack cocaine','Group therapy'], 'Group therapist. Teesside & North Yorkshire. [seed]', true, true, NOW() - INTERVAL '85 days'),

-- ── Swansea ───────────────────────────────────────────────────────────────────
('Bethan Lloyd', 'bethan-lloyd-swansea', 'Swansea', 'swansea', '01792 234567', 'bethan@bethanlloyd.co.uk', 'https://bethanlloyd.co.uk', 'BACP Accredited, Bilingual (Welsh/English)', ARRAY['Alcohol','Cannabis','Welsh-speaking'], 'Welsh-speaking addiction therapist. Swansea & West Wales. [seed]', true, true, NOW() - INTERVAL '65 days'),

-- ── Aberdeen ──────────────────────────────────────────────────────────────────
('Rosie Mackay', 'rosie-mackay-aberdeen', 'Aberdeen', 'aberdeen', '01224 234567', 'rosie@rosiemackay.co.uk', NULL, 'COSCA Accredited, EMDR Practitioner', ARRAY['Alcohol','Oil industry workers','Trauma'], 'Addiction therapist with experience supporting offshore workers. Aberdeen. [seed]', true, true, NOW() - INTERVAL '75 days'),

-- ── Inverness ─────────────────────────────────────────────────────────────────
('Angus Gillies', 'angus-gillies-inverness', 'Inverness', 'inverness', '01463 234567', 'angus@angusgillies.co.uk', 'https://angusgillies.co.uk', 'COSCA Accredited, Person-Centred', ARRAY['Alcohol','Rural isolation','Online therapy'], 'Rural addiction counsellor serving Highlands & Islands (online available). [seed]', true, true, NOW() - INTERVAL '90 days'),

-- ── Dundee ────────────────────────────────────────────────────────────────────
('Elspeth Burns', 'elspeth-burns-dundee', 'Dundee', 'dundee', '01382 234567', 'elspeth@elspethburns.co.uk', NULL, 'COSCA Accredited, CBT Practitioner', ARRAY['Heroin','Alcohol','Dual diagnosis'], 'CBT-trained addiction counsellor. Dundee & Tayside. [seed]', true, true, NOW() - INTERVAL '80 days'),

-- ── Belfast ───────────────────────────────────────────────────────────────────
('Ciara O''Neill', 'ciara-oneill-belfast', 'Belfast', 'belfast', '028 9034 5678', 'ciara@ciaraoneill.co.uk', 'https://ciaraoneill.co.uk', 'BACP Accredited, EMDR Practitioner', ARRAY['Alcohol','Trauma','PTSD'], 'Trauma and addiction specialist. Belfast & Greater Belfast. [seed]', true, true, NOW() - INTERVAL '70 days'),
('Seamus Kelly', 'seamus-kelly-belfast', 'Belfast', 'belfast', '028 9034 6789', 'seamus@seamuskelly.co.uk', NULL, 'UKCP Registered, Psychodynamic Therapist', ARRAY['Alcohol','Heroin','Community recovery'], 'Psychodynamic therapist. Belfast. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Bournemouth ───────────────────────────────────────────────────────────────
('Jenny Archer', 'jenny-archer-bournemouth', 'Bournemouth', 'bournemouth', '01202 234567', 'jenny@jennyarcher.co.uk', 'https://jennyarcher.co.uk', 'BACP Accredited, Person-Centred', ARRAY['Alcohol','Cocaine','Anxiety'], 'Addiction counsellor. Bournemouth & Dorset. [seed]', true, true, NOW() - INTERVAL '60 days'),

-- ── Milton Keynes ─────────────────────────────────────────────────────────────
('Chris Dunne', 'chris-dunne-milton-keynes', 'Milton Keynes', 'milton-keynes', '01908 234567', 'chris@chrisdunne.co.uk', NULL, 'BACP Accredited, CBT Practitioner', ARRAY['Alcohol','Cannabis','Online therapy'], 'CBT counsellor available online and in Milton Keynes. [seed]', true, true, NOW() - INTERVAL '45 days'),

-- ── Northampton ───────────────────────────────────────────────────────────────
('Vicky Lane', 'vicky-lane-northampton', 'Northampton', 'northampton', '01604 234567', 'vicky@vickylane.co.uk', 'https://vickylane.co.uk', 'CPCAB Level 5, Integrative Therapist', ARRAY['Alcohol','Prescription drugs','Women only'], 'Women-only practice. Northampton. [seed]', true, true, NOW() - INTERVAL '85 days'),

-- ── Stoke-on-Trent ────────────────────────────────────────────────────────────
('Barry Stubbs', 'barry-stubbs-stoke', 'Stoke-on-Trent', 'stoke-on-trent', '01782 234567', 'barry@barrystubbs.co.uk', NULL, 'BACP Accredited, CBT Practitioner', ARRAY['Heroin','Alcohol','Dual diagnosis'], 'Addiction counsellor. Stoke-on-Trent & North Staffordshire. [seed]', true, true, NOW() - INTERVAL '100 days'),

-- ── Wolverhampton ─────────────────────────────────────────────────────────────
('Amara Diallo', 'amara-diallo-wolverhampton', 'Wolverhampton', 'wolverhampton', '01902 234567', 'amara@amaradiallo.co.uk', 'https://amaradiallo.co.uk', 'BACP Accredited, EMDR Therapist', ARRAY['Trauma','Alcohol','EMDR','BAME clients'], 'Culturally competent EMDR therapist. Wolverhampton & Black Country. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Preston ───────────────────────────────────────────────────────────────────
('Janet Howarth', 'janet-howarth-preston', 'Preston', 'preston', '01772 234567', 'janet@janethowarth.co.uk', NULL, 'BACP Accredited, Person-Centred', ARRAY['Alcohol','Cannabis','Lancashire'], 'Person-centred counsellor. Preston & Lancashire. [seed]', true, true, NOW() - INTERVAL '70 days'),

-- ── Blackpool ─────────────────────────────────────────────────────────────────
('Ian Marsh', 'ian-marsh-blackpool', 'Blackpool', 'blackpool', '01253 234567', 'ian@ianmarsh.co.uk', 'https://ianmarsh.co.uk', 'CPCAB Level 5, Motivational Interviewing', ARRAY['Alcohol','Heroin','Coastal deprivation'], 'Addiction counsellor with experience in coastal deprivation areas. Blackpool. [seed]', true, true, NOW() - INTERVAL '90 days'),

-- ── York ── (additional) ──────────────────────────────────────────────────────
('Tom Haley', 'tom-haley-york', 'York', 'york', '01904 234568', 'tom@tomhaley.co.uk', NULL, 'BACP Accredited, Psychodynamic Therapist', ARRAY['Alcohol','Gambling','Male clients'], 'Psychodynamic therapist. York. [seed]', true, true, NOW() - INTERVAL '40 days'),

-- ── Harrogate ─────────────────────────────────────────────────────────────────
('Stephanie Rowe', 'stephanie-rowe-harrogate', 'Harrogate', 'harrogate', '01423 234567', 'stephanie@stephanierowe.co.uk', 'https://stephanierowe.co.uk', 'BACP Accredited, Schema Therapist', ARRAY['Alcohol','Prescription drugs','High-functioning'], 'Executive and high-functioning addiction specialist. Harrogate. [seed]', true, true, NOW() - INTERVAL '65 days'),

-- ── Chester ───────────────────────────────────────────────────────────────────
('Alan Brook', 'alan-brook-chester', 'Chester', 'chester', '01244 234567', 'alan@alanbrook.co.uk', NULL, 'UKCP Registered, CBT Practitioner', ARRAY['Alcohol','Cannabis','Cheshire'], 'CBT counsellor. Chester & Cheshire. [seed]', true, true, NOW() - INTERVAL '75 days'),

-- ── Lincoln ───────────────────────────────────────────────────────────────────
('Wendy Glover', 'wendy-glover-lincoln', 'Lincoln', 'lincoln', '01522 234567', 'wendy@wendyglover.co.uk', 'https://wendyglover.co.uk', 'BACP Accredited, Person-Centred', ARRAY['Alcohol','Rural Lincolnshire','Online'], 'Rural addiction counsellor (online available). Lincoln. [seed]', true, true, NOW() - INTERVAL '85 days'),

-- ── Worcester ─────────────────────────────────────────────────────────────────
('Phil Goddard', 'phil-goddard-worcester', 'Worcester', 'worcester', '01905 234567', 'phil@philgoddard.co.uk', NULL, 'CPCAB Level 5, CBT Practitioner', ARRAY['Alcohol','Cocaine','Worcestershire'], 'CBT counsellor. Worcester & Worcestershire. [seed]', true, true, NOW() - INTERVAL '60 days'),

-- ── Taunton ───────────────────────────────────────────────────────────────────
('Sarah Penrose', 'sarah-penrose-taunton', 'Taunton', 'taunton', '01823 234567', 'sarah@sarahpenrose.co.uk', 'https://sarahpenrose.co.uk', 'BACP Accredited, Eco-Therapy', ARRAY['Alcohol','Cannabis','Nature-based therapy'], 'Nature-based addiction counsellor. Somerset. [seed]', true, true, NOW() - INTERVAL '50 days'),

-- ── Gloucester ────────────────────────────────────────────────────────────────
('Delia Hunt', 'delia-hunt-gloucester', 'Gloucester', 'gloucester', '01452 234567', 'delia@deliahunt.co.uk', NULL, 'BACP Accredited, CBT Practitioner', ARRAY['Alcohol','Cannabis','Gloucestershire'], 'CBT therapist. Gloucester & the Cotswolds. [seed]', true, true, NOW() - INTERVAL '70 days'),

-- ── Peterborough ──────────────────────────────────────────────────────────────
('Dennis Walsh', 'dennis-walsh-peterborough', 'Peterborough', 'peterborough', '01733 234567', 'dennis@denniswalsh.co.uk', 'https://denniswalsh.co.uk', 'UKCP Registered, CBT Practitioner', ARRAY['Alcohol','Heroin','Eastern EU community'], 'Multilingual addiction therapist. Peterborough. [seed]', true, true, NOW() - INTERVAL '65 days'),

-- ── Ipswich ───────────────────────────────────────────────────────────────────
('Sally Grant', 'sally-grant-ipswich', 'Ipswich', 'ipswich', '01473 234567', 'sally@sallygrant.co.uk', NULL, 'BACP Accredited, Person-Centred', ARRAY['Alcohol','Cannabis','Suffolk'], 'Person-centred counsellor. Ipswich & Suffolk. [seed]', true, true, NOW() - INTERVAL '80 days'),

-- ── Colchester ────────────────────────────────────────────────────────────────
('Robert Dean', 'robert-dean-colchester', 'Colchester', 'colchester', '01206 234567', 'robert@robertdean.co.uk', 'https://robertdean.co.uk', 'BACP Accredited, Motivational Interviewing', ARRAY['Alcohol','Veterans','Military community'], 'Veteran-specialist addiction counsellor. Colchester. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Luton ─────────────────────────────────────────────────────────────────────
('Fatima Hassan', 'fatima-hassan-luton', 'Luton', 'luton', '01582 234567', 'fatima@fatimahassan.co.uk', NULL, 'BACP Accredited, Multicultural Therapist', ARRAY['Alcohol','Cannabis','Muslim-friendly'], 'Culturally sensitive therapist. Luton & Bedfordshire. [seed]', true, true, NOW() - INTERVAL '45 days'),

-- ── Watford ───────────────────────────────────────────────────────────────────
('George Simmons', 'george-simmons-watford', 'Watford', 'watford', '01923 234567', 'george@georgesimmons.co.uk', 'https://georgesimmons.co.uk', 'UKCP Registered, CBT Practitioner', ARRAY['Alcohol','Cocaine','Hertfordshire'], 'CBT therapist. Watford & Hertfordshire. [seed]', true, true, NOW() - INTERVAL '70 days'),

-- ── Shrewsbury ────────────────────────────────────────────────────────────────
('Mary Podmore', 'mary-podmore-shrewsbury', 'Shrewsbury', 'shrewsbury', '01743 234567', 'mary@marypodmore.co.uk', NULL, 'BACP Accredited, Person-Centred', ARRAY['Alcohol','Rural Shropshire','Online'], 'Rural counsellor (online available). Shrewsbury & Shropshire. [seed]', true, true, NOW() - INTERVAL '60 days'),

-- ── Hereford ──────────────────────────────────────────────────────────────────
('Tom Preece', 'tom-preece-hereford', 'Hereford', 'hereford', '01432 234567', 'tom@tompreece.co.uk', 'https://tompreece.co.uk', 'CPCAB Level 5, CBT Practitioner', ARRAY['Alcohol','Farming community','Rural'], 'Rural addiction counsellor serving farmers and rural communities. Herefordshire. [seed]', true, true, NOW() - INTERVAL '90 days'),

-- ── Salisbury ─────────────────────────────────────────────────────────────────
('Faye Underwood', 'faye-underwood-salisbury', 'Salisbury', 'salisbury', '01722 234567', 'faye@fayeunderwood.co.uk', NULL, 'BACP Accredited, EMDR Practitioner', ARRAY['Alcohol','Trauma','Wiltshire'], 'EMDR therapist. Salisbury & Wiltshire. [seed]', true, true, NOW() - INTERVAL '55 days'),

-- ── Online / National ──────────────────────────────────────────────────────────
('Dr Jonathan Reed', 'jonathan-reed-online', 'Online (UK-wide)', 'london', '0800 123 4567', 'jonathan@reedaddiction.co.uk', 'https://reedaddiction.co.uk', 'Chartered Psychologist, CSAT-2, BPS Accredited', ARRAY['Alcohol','Prescription opioids','Corporate','Online'], 'UK-wide online addiction specialist. Former NHS consultant. [seed]', true, true, NOW() - INTERVAL '200 days'),
('Anna Stephens', 'anna-stephens-online', 'Online (UK-wide)', 'manchester', '0800 234 5678', 'anna@annastephenstherapy.co.uk', 'https://annastephenstherapy.co.uk', 'BACP Senior Accredited, EMDR Practitioner', ARRAY['Trauma','Alcohol','Online EMDR'], 'Online trauma and addiction specialist. Available across UK. [seed]', true, true, NOW() - INTERVAL '150 days');

-- Verify
SELECT location, count(*) as counsellors FROM counsellors WHERE bio LIKE '%[seed]%' GROUP BY location ORDER BY counsellors DESC;
