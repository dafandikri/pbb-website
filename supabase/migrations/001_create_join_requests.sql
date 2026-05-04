create table if not exists join_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  city text not null,
  interest text not null,
  whatsapp text not null,
  created_at timestamptz not null default now()
);
