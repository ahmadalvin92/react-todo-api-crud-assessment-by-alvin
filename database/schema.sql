CREATE DATABASE IF NOT EXISTS todo_harian
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE todo_harian;

CREATE TABLE IF NOT EXISTS daftar_todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(150) NOT NULL,
  catatan TEXT NOT NULL,
  status ENUM('belum_selesai', 'selesai') NOT NULL DEFAULT 'belum_selesai',
  tanggal_dibuat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tanggal_diubah DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO daftar_todo (judul, catatan, status)
SELECT 'Belajar React', 'Selesaikan halaman todo dan rapikan komponen.', 'belum_selesai'
WHERE NOT EXISTS (SELECT 1 FROM daftar_todo);
