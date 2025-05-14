<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Tangani preflight request (OPTIONS)
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method === 'GET') {
    // Validasi input user_id
    if (!isset($_GET['user_id'])) {
        http_response_code(400);
        echo "<h1>Parameter user_id tidak ditemukan.</h1>";
        exit();
    }

    $user_id = $conn->real_escape_string($_GET['user_id']);

    // Ambil data pengguna berdasarkan user_id
    $userSql = "SELECT username, email FROM users WHERE id = '$user_id'";
    $userResult = $conn->query($userSql);

    if ($userResult->num_rows === 0) {
        http_response_code(404);
        echo "<h1>Data pengguna tidak ditemukan.</h1>";
        exit();
    }

    $user = $userResult->fetch_assoc();
    $username = htmlspecialchars($user['username']);
    $email = htmlspecialchars($user['email']);

    // Ambil data berkas berdasarkan user_id
    $sql = "SELECT nama_berkas, status, catatan 
            FROM berkas 
            WHERE user_id = '$user_id'";
    $result = $conn->query($sql);

    // Mulai output HTML
    echo "<!DOCTYPE html>";
    echo "<html lang='en'>";
    echo "<head>";
    echo "<meta charset='UTF-8'>";
    echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    echo "<title>Daftar Berkas</title>";
    echo "<style>";
    echo "body { font-family: Arial, sans-serif; margin: 20px; }";
    echo "h1, h2 { text-align: center; }";
    echo ".user-info { margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9; }";
    echo ".berkas-container { margin-bottom: 20px; border: 1px solid #ccc; padding: 15px; border-radius: 5px; }";
    echo ".berkas-container h3 { margin: 0 0 10px; }";
    echo ".berkas-container iframe { width: 100%; height: 500px; border: 1px solid #ccc; }";
    echo ".status { font-weight: bold; margin-top: 10px; }";
    echo ".catatan { margin-top: 5px; color: #555; }";
    echo "</style>";
    echo "</head>";
    echo "<body>";
    echo "<h1>Daftar Berkas</h1>";

    // Tampilkan informasi pengguna
    echo "<div class='user-info'>";
    echo "<h2>Informasi Pengguna</h2>";
    echo "<p><strong>Username:</strong> $username</p>";
    echo "<p><strong>Email:</strong> $email</p>";
    echo "</div>";

    if ($result->num_rows > 0) {
        // Loop melalui hasil dan tampilkan setiap berkas
        while ($row = $result->fetch_assoc()) {
            $nama_berkas = htmlspecialchars($row['nama_berkas']);
            $status = htmlspecialchars($row['status']);
            $catatan = htmlspecialchars($row['catatan'] ?? '-');

            echo "<div class='berkas-container'>";
            echo "<h3>Berkas: $nama_berkas</h3>";
            echo "<iframe src='../uploads/$nama_berkas' title='Preview Berkas'></iframe>";
            echo "<p class='status'>Status: <span style='color: " . ($status === 'Terverifikasi' ? 'green' : ($status === 'Ditolak' ? 'red' : 'orange')) . ";'>$status</span></p>";
            echo "<p class='catatan'>Catatan: $catatan</p>";
            echo "</div>";
        }
    } else {
        // Jika tidak ada data berkas ditemukan
        echo "<h2>Tidak ada data berkas ditemukan untuk user_id ini.</h2>";
    }

    echo "</body>";
    echo "</html>";
} else {
    http_response_code(405);
    echo "<h1>Metode tidak diizinkan.</h1>";
}
?>