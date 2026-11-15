-- Contact page submissions (written by app/api/contact/route.ts with the service role key)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  source_page text,
  handled boolean not null default false
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- Only the service role (server) may read or write; no public access.
alter table public.contact_messages enable row level security;
