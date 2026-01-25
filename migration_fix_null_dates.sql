-- Fix invalid dates (1969/1970) caused by NULL published_at
-- Set published_at to created_at for any published news that lacks a date
UPDATE news 
SET published_at = created_at 
WHERE is_published = true AND published_at IS NULL;
