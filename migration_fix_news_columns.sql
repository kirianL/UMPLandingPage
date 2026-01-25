-- Rename main columns to match code expectations
ALTER TABLE news RENAME COLUMN title TO title_es;
ALTER TABLE news RENAME COLUMN content TO content_es;

-- Merge legacy excerpt into the new excerpt_es column
UPDATE news SET excerpt_es = excerpt WHERE excerpt IS NOT NULL AND excerpt_es IS NULL;

-- Remove legacy excerpt column to avoid confusion
ALTER TABLE news DROP COLUMN excerpt;
