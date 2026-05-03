
-- Profiles
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Forum threads
create table public.forum_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  title text not null check (char_length(title) between 3 and 200),
  body text not null check (char_length(body) between 1 and 8000),
  category text not null default 'general',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.forum_threads enable row level security;

create policy "Threads viewable by everyone"
  on public.forum_threads for select using (true);
create policy "Authenticated users can create threads"
  on public.forum_threads for insert with check (auth.uid() = user_id);
create policy "Authors can update threads"
  on public.forum_threads for update using (auth.uid() = user_id);
create policy "Authors can delete threads"
  on public.forum_threads for delete using (auth.uid() = user_id);

-- Forum replies
create table public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.forum_threads on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);
alter table public.forum_replies enable row level security;

create policy "Replies viewable by everyone"
  on public.forum_replies for select using (true);
create policy "Authenticated users can create replies"
  on public.forum_replies for insert with check (auth.uid() = user_id);
create policy "Authors can update replies"
  on public.forum_replies for update using (auth.uid() = user_id);
create policy "Authors can delete replies"
  on public.forum_replies for delete using (auth.uid() = user_id);

create index forum_replies_thread_idx on public.forum_replies(thread_id);
create index forum_threads_created_idx on public.forum_threads(created_at desc);
