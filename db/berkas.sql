CREATE TABLE berkas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nama_berkas VARCHAR(100) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    status ENUM('Belum Diverifikasi', 'Terverifikasi', 'Ditolak') DEFAULT 'Belum Diverifikasi',
    catatan TEXT DEFAULT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    jenis_surat VARCHAR(50) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);