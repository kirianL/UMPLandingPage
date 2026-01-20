-- Migration: Fix News Table Schema
-- Purpose: Aligns the database columns with the Next.js application code which expects 'title', 'content', 'image_url', and 'excerpt'.

-- 1. Rename 'title_es' to 'title' (if it exists)
DO $$
BEGIN
  IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='news' AND column_name='title_es') THEN
    ALTER TABLE news RENAME COLUMN title_es TO title;
  END IF;
END $$;

-- 2. Rename 'content_es' to 'content' (if it exists)
DO $$
BEGIN
  IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='news' AND column_name='content_es') THEN
    ALTER TABLE news RENAME COLUMN content_es TO content;
  END IF;
END $$;

-- 3. Rename 'cover_image' to 'image_url' (if it exists)
DO $$
BEGIN
  IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='news' AND column_name='cover_image') THEN
    ALTER TABLE news RENAME COLUMN cover_image TO image_url;
  END IF;
END $$;

-- 4. Add 'excerpt' column if it doesn't exist
ALTER TABLE news ADD COLUMN IF NOT EXISTS excerpt text;

-- 5. Ensure 'slug' exists (should already be there)
ALTER TABLE news ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- 6. Add 'is_published' if missing (default false)
ALTER TABLE news ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;

-- 7. Add 'published_at' if missing
ALTER TABLE news ADD COLUMN IF NOT EXISTS published_at timestamp with time zone;

-- Optional: You may want to check if title_en / content_en exist and maybe incorporate them or drop them, 
-- but for now we leave them to avoid data loss.
