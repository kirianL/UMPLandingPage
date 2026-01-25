ALTER TABLE news ADD COLUMN author_id uuid references auth.users(id);
