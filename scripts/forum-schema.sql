-- SoberNation Community Forum Schema
-- Run this in your Supabase SQL editor: https://supabase.com/dashboard/project/clvhzvuhwjtyvrddoorm/sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles ──────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  sobriety_start date,
  is_banned boolean default false,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Public profiles are viewable" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- ── Categories ────────────────────────────────────────────────────────────────
create table if not exists categories (
  id serial primary key,
  slug text unique not null,
  name text not null,
  icon text not null,
  description text not null,
  post_count integer default 0,
  sort_order integer default 0
);

alter table categories enable row level security;
create policy "Anyone can view categories" on categories for select using (true);

-- Seed categories
insert into categories (slug, name, icon, description, sort_order) values
  ('daily',      'Daily Check-in',       '☀️',  'How are you doing today? Share whatever is on your mind.',            1),
  ('milestones', 'Milestones and Wins',  '🏆',  'Hit a milestone? Share it here. Every day counts.',                  2),
  ('support',    'I Need Support',       '🆘',  'Struggling? Post here. You are not alone and we are listening.',      3),
  ('substances', 'Substances',           '💊',  'Alcohol, opioids, cannabis and more. Specific questions welcome.',    4),
  ('treatment',  'Treatment and Rehab',  '🏥',  'Questions about detox, rehab, and what to expect.',                  5),
  ('family',     'Family and Loved Ones','👨‍👩‍👧', 'Supporting someone with addiction. This space is for you too.',      6),
  ('general',    'General',              '💬',  'Anything and everything that does not fit elsewhere.',                7)
on conflict (slug) do nothing;

-- ── Posts ─────────────────────────────────────────────────────────────────────
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  category_id integer references categories(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  username text not null,
  title text not null,
  body text not null,
  slug text unique not null,
  upvotes integer default 0,
  comment_count integer default 0,
  flag_count integer default 0,
  is_pinned boolean default false,
  is_hidden boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table posts enable row level security;
create policy "Anyone can view non-hidden posts" on posts for select using (is_hidden = false or auth.uid() is not null);
create policy "Authenticated users can insert posts" on posts for insert with check (auth.uid() is not null);
create policy "Users can update own posts" on posts for update using (auth.uid() = user_id);

create index if not exists posts_category_id_idx on posts(category_id);
create index if not exists posts_created_at_idx on posts(created_at desc);

-- ── Comments ──────────────────────────────────────────────────────────────────
create table if not exists comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  parent_id uuid references comments(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  username text not null,
  body text not null,
  upvotes integer default 0,
  flag_count integer default 0,
  is_hidden boolean default false,
  created_at timestamptz default now()
);

alter table comments enable row level security;
create policy "Anyone can view non-hidden comments" on comments for select using (is_hidden = false or auth.uid() is not null);
create policy "Authenticated users can insert comments" on comments for insert with check (auth.uid() is not null);
create policy "Users can update own comments" on comments for update using (auth.uid() = user_id);

create index if not exists comments_post_id_idx on comments(post_id);
create index if not exists comments_created_at_idx on comments(created_at asc);

-- ── Votes ─────────────────────────────────────────────────────────────────────
create table if not exists votes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references posts(id) on delete cascade,
  comment_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now(),
  constraint vote_target check (
    (post_id is not null and comment_id is null) or
    (post_id is null and comment_id is not null)
  ),
  unique(user_id, post_id),
  unique(user_id, comment_id)
);

alter table votes enable row level security;
create policy "Users can manage own votes" on votes using (auth.uid() = user_id);
create policy "Users can insert votes" on votes for insert with check (auth.uid() = user_id);

-- ── Flags ─────────────────────────────────────────────────────────────────────
create table if not exists flags (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  post_id uuid references posts(id) on delete cascade,
  comment_id uuid references comments(id) on delete cascade,
  reason text not null,
  created_at timestamptz default now()
);

alter table flags enable row level security;
create policy "Users can insert flags" on flags for insert with check (auth.uid() is not null);
create policy "Users can view own flags" on flags for select using (auth.uid() = user_id);

-- ── Notifications ─────────────────────────────────────────────────────────────
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  type text not null,
  post_id uuid references posts(id) on delete cascade,
  comment_id uuid references comments(id) on delete cascade,
  actor_username text,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table notifications enable row level security;
create policy "Users can view own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on notifications for update using (auth.uid() = user_id);
create policy "Service role can insert notifications" on notifications for insert with check (true);

-- ── Realtime ─────────────────────────────────────────────────────────────────
-- Enable realtime for comments table so new comments appear live
alter publication supabase_realtime add table comments;
alter publication supabase_realtime add table notifications;
