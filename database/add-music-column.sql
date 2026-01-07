-- Tambahkan kolom music_url ke tabel concerts
USE info_konser_db;

ALTER TABLE concerts ADD COLUMN music_url VARCHAR(255) AFTER image_url;

-- Update untuk menambahkan index jika diperlukan
ALTER TABLE concerts MODIFY COLUMN music_url VARCHAR(255) NULL;
