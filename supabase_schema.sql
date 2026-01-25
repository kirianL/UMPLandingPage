

-- Create PUBLIC tables
create table artists (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline_es text,
  tagline_en text,
  role text,
  role_en text,
  bio_es text,
  bio_en text,
  photo_url text, -- Storage path
  spotify_url text,
  apple_music_url text,
  youtube_url text,
  instagram_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table releases (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references artists(id) on delete cascade not null,
  title text not null,
  release_date date,
  cover_url text,
  link text, -- Smart Link
  spotify_url text,
  apple_music_url text,
  youtube_url text,
  type text check (type in ('single', 'album', 'ep', 'mixtape')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table news (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_es text not null,
  title_en text not null,
  excerpt_es text,
  excerpt_en text,
  content_es text, -- Markdown or HTML
  content_en text,
  cover_image text,
  is_published boolean default false,
  published_at timestamp with time zone default timezone('utc'::text, now()),
  author_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on new tables
alter table artists enable row level security;
alter table releases enable row level security;
alter table news enable row level security;

-- Policies (Public Read, Admin Write)
-- Asumiendo que los admins son usuarios autenticados con rol específico o simplemente autenticados por ahora para simplificar Plan Free sin Custom Claims complex.
-- Para mayor seguridad, idealmente usar una tabla 'profiles' con roles, pero por ahora 'authenticated' = admin.

create policy "Enable read access for all users" on artists for select using (true);
create policy "Enable insert for authenticated users only" on artists for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on artists for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on artists for delete using (auth.role() = 'authenticated');

create policy "Enable read access for all users" on releases for select using (true);
create policy "Enable insert for authenticated users only" on releases for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on releases for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on releases for delete using (auth.role() = 'authenticated');

create policy "Enable read access for all users" on news for select using (true); -- Podríamos filtrar por is_published = true
create policy "Enable insert for authenticated users only" on news for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on news for update using (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on news for delete using (auth.role() = 'authenticated');

-- Storage Bucket Setup (Virtual)
-- create bucket 'images' public;
-- policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );
-- policy "Auth Upload" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- Insert Sample Data
insert into artists (slug, name, tagline_es, bio_es, is_active)
values 
('xeuz', 'Xeuz', 'El sonido del futuro', 'Artista emergente con estilo único mezclando Trap y Dancehall.', true),
('banton', 'Banton', 'King of Dancehall', 'Leyenda viviente del reggae en Costa Rica.', true);
