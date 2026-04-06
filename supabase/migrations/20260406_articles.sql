/**
 * SQL migration — run this in Supabase SQL Editor:
 * https://supabase.com/dashboard/project/clvhzvuhwjtyvrddoorm/sql/new
 */

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT,
  content         TEXT NOT NULL DEFAULT '',
  author_name     TEXT NOT NULL,
  author_slug     TEXT,
  topic           TEXT,
  tags            TEXT[] DEFAULT '{}',
  location_slugs  TEXT[] DEFAULT '{}',
  hero_image_url  TEXT,
  hero_image_alt  TEXT,
  published_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  read_time_mins  INT DEFAULT 5,
  status          TEXT DEFAULT 'published'
);

CREATE INDEX IF NOT EXISTS articles_location_slugs ON articles USING GIN(location_slugs);
CREATE INDEX IF NOT EXISTS articles_tags           ON articles USING GIN(tags);
CREATE INDEX IF NOT EXISTS articles_published_at   ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS articles_slug           ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_status         ON articles(status);

-- Article queue table
CREATE TABLE IF NOT EXISTS article_queue (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  topic         TEXT NOT NULL DEFAULT 'guide',
  location_slug TEXT,
  keywords      TEXT[] DEFAULT '{}',
  priority      INT DEFAULT 5,
  status        TEXT DEFAULT 'pending',
  article_id    UUID REFERENCES articles(id),
  processed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS article_queue_status   ON article_queue(status);
CREATE INDEX IF NOT EXISTS article_queue_priority ON article_queue(priority DESC, created_at ASC);
