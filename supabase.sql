-- PPA ANAC 95+ V7 — encrypted offline-first cloud backup
-- The application encrypts each user's progress in the browser before upload.
-- The table does not contain passwords. cloud_id is a random per-account secret identifier.
create table if not exists public.ppa_user_sync (
  cloud_id text primary key,
  payload text not null,
  updated_at timestamptz not null default now()
);

alter table public.ppa_user_sync enable row level security;

-- The PWA uses an unpredictable cloud_id and client-side AES-GCM encryption.
-- This policy is intentionally minimal for the anonymous PWA endpoint.
-- For a production deployment with stronger account security, replace this layer
-- with Supabase Auth + server-side username mapping / Edge Functions.
create policy "ppa anon insert" on public.ppa_user_sync
  for insert to anon with check (length(cloud_id) >= 32 and length(payload) > 20);

create policy "ppa anon select" on public.ppa_user_sync
  for select to anon using (length(cloud_id) >= 32);

create policy "ppa anon update" on public.ppa_user_sync
  for update to anon using (length(cloud_id) >= 32)
  with check (length(cloud_id) >= 32 and length(payload) > 20);
