create table if not exists users (
  id uuid primary key,
  email text unique not null,
  created_at timestamp with time zone default now()
);

create table if not exists apps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  status text not null default 'Live',
  last_scan timestamp with time zone,
  next_scan timestamp with time zone,
  whatsapp_notifications boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists fix_requests (
  id uuid primary key default gen_random_uuid(),
  app_id uuid references apps(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  issue text,
  severity text,
  requested_at timestamp with time zone default now(),
  status text default 'open'
);
