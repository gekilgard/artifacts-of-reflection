-- Supabase schema for Artifacts of Reflection

-- Enable UUID generation
create extension if not exists pgcrypto;

-- Submissions table
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  question_id text,
  question_text text not null,
  story_text text not null check (char_length(story_text) between 50 and 500),
  image_url text,
  location_text text,
  lat double precision,
  lng double precision,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create index if not exists submissions_status_created_idx
on public.submissions (status, created_at desc);

-- RLS
alter table public.submissions enable row level security;

-- Anyone can insert
drop policy if exists "public_can_insert_submissions" on public.submissions;
create policy "public_can_insert_submissions"
on public.submissions
for insert
to public
with check (true);

-- Public can only read approved
drop policy if exists "public_read_approved_submissions" on public.submissions;
create policy "public_read_approved_submissions"
on public.submissions
for select
to public
using (status = 'approved');

-- Admins table
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

-- Admins can read everything
drop policy if exists "admin_read_all_submissions" on public.submissions;
create policy "admin_read_all_submissions"
on public.submissions
for select
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- Admins can update rows (approve/reject)
drop policy if exists "admin_update_submissions" on public.submissions;
create policy "admin_update_submissions"
on public.submissions
for update
to authenticated
using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- Storage: create a public bucket for images (optional)
select storage.create_bucket('stories', public => true)
where not exists (
  select 1 from storage.buckets where id = 'stories'
);

-- Allow public upload & read in 'stories' bucket (no delete)
drop policy if exists "public can upload to stories" on storage.objects;
create policy "public can upload to stories"
on storage.objects
for insert
to public
with check (bucket_id = 'stories');

drop policy if exists "public can read stories" on storage.objects;
create policy "public can read stories"
on storage.objects
for select
to public
using (bucket_id = 'stories');

