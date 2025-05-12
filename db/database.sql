CREATE DATABASE IF NOT EXISTS db_suratdigital;
USE db_suratdigital;

-- =============================
-- 1. TABEL USERS (admin & mahasiswa)
-- =============================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'mahasiswa') NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    nim VARCHAR(20),  -- hanya untuk mahasiswa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- 2. TABEL SURAT / BERKAS
-- =============================
CREATE TABLE berkas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    judul_surat VARCHAR(150) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    status ENUM('belum diverifikasi', 'terverifikasi') DEFAULT 'belum diverifikasi',
    qr_token VARCHAR(255) DEFAULT NULL,
    qr_path VARCHAR(255) DEFAULT NULL,
    nomor_surat VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================
-- 3. TABEL LOG AKTIVITAS
-- =============================
CREATE TABLE log_activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    aktivitas TEXT NOT NULL,
    waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================
-- 4. TABEL VERIFIKASI
-- =============================
CREATE TABLE verifikasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    berkas_id INT NOT NULL,
    waktu_verifikasi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    catatan TEXT,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (berkas_id) REFERENCES berkas(id) ON DELETE CASCADE
);
