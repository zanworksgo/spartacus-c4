-- SPARTACUS Chapter 4 — Supabase setup
-- Run this once in the Supabase SQL Editor (Dashboard → SQL → New query).

-- 1) Content table: one row per managed slot (file upload or link).
create table if not exists public.site_content (
  key text primary key,
  type text not null check (type in ('file', 'link')),
  url text,
  filename text,
  updated_at timestamptz default now()
);

alter table public.site_content enable row level security;

-- Public can read; only logged-in admin can write.
drop policy if exists "site_content read" on public.site_content;
create policy "site_content read" on public.site_content
  for select using (true);

drop policy if exists "site_content insert" on public.site_content;
create policy "site_content insert" on public.site_content
  for insert to authenticated with check (true);

drop policy if exists "site_content update" on public.site_content;
create policy "site_content update" on public.site_content
  for update to authenticated using (true) with check (true);

drop policy if exists "site_content delete" on public.site_content;
create policy "site_content delete" on public.site_content
  for delete to authenticated using (true);

-- 2) Public storage bucket for uploaded documents.
insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

-- Public can read files; only logged-in admin can upload/replace/delete.
drop policy if exists "documents public read" on storage.objects;
create policy "documents public read" on storage.objects
  for select using (bucket_id = 'documents');

drop policy if exists "documents auth insert" on storage.objects;
create policy "documents auth insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'documents');

drop policy if exists "documents auth update" on storage.objects;
create policy "documents auth update" on storage.objects
  for update to authenticated using (bucket_id = 'documents');

drop policy if exists "documents auth delete" on storage.objects;
create policy "documents auth delete" on storage.objects
  for delete to authenticated using (bucket_id = 'documents');

-- 3) Create the admin account:
--    Dashboard → Authentication → Users → "Add user" →
--    email = the value you set for VITE_ADMIN_EMAIL, set a password,
--    and enable "Auto Confirm User".
