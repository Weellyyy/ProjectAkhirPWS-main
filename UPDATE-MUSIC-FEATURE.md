# Petunjuk Update Database untuk Fitur Musik

## Cara Menjalankan Update Database:

### Opsi 1: Via MySQL Command Line
```bash
mysql -u root -p < database/add-music-column.sql
```

### Opsi 2: Via phpMyAdmin / MySQL Workbench
1. Buka phpMyAdmin atau MySQL Workbench
2. Pilih database `info_konser_db`
3. Jalankan SQL berikut:

```sql
ALTER TABLE concerts ADD COLUMN music_url VARCHAR(255) AFTER image_url;
```

## Fitur yang Sudah Ditambahkan:

✅ **Upload Musik MP3** di form Add Concert dan Edit Concert  
✅ **Audio Player** di halaman Daftar Konser User  
✅ **Penyimpanan file** di folder `uploads/music/`  
✅ **Multi-file upload** (gambar + musik sekaligus)  

## Cara Menggunakan:

1. **Jalankan update database** terlebih dahulu
2. **Restart server** Node.js Anda
3. **Login sebagai admin** 
4. **Tambah/Edit konser** dengan upload gambar dan file MP3
5. **Login sebagai user** untuk melihat konser dengan audio player

## Catatan:
- Maksimal ukuran file MP3: **20MB**
- Format yang didukung: **MP3**
- Gambar dan musik bersifat opsional
- Jika tidak upload musik, audio player tidak akan muncul
