<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Tangani preflight request (OPTIONS)
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ...existing code...
if ($method === 'GET') {
    // Ambil data berkas dari database
    $sql = "SELECT b.id, b.nama_berkas, u.username, u.nama, b.status, b.catatan 
            FROM berkas b 
            JOIN users u ON b.user_id = u.id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $berkas = [];
        while ($row = $result->fetch_assoc()) {
            $berkas[] = $row;
        }
        http_response_code(200);
        echo json_encode($berkas);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Tidak ada data berkas ditemukan."]);
    }
}
// ...existing code...

elseif ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    // Validasi input
    if (!isset($input['berkas_id'], $input['status'])) {
        http_response_code(400);
        echo json_encode(["error" => "Data validasi tidak lengkap."]);
        exit();
    }

    $berkas_id = $conn->real_escape_string($input['berkas_id']);
    $status = $conn->real_escape_string($input['status']);
    $catatan = isset($input['catatan']) ? $conn->real_escape_string($input['catatan']) : null;

    // Validasi status
    if (!in_array($status, ['Terverifikasi', 'Ditolak'])) {
        http_response_code(400);
        echo json_encode(["error" => "Status tidak valid."]);
        exit();
    }

    // Update status dan catatan di database
    $sql = "UPDATE berkas SET status = '$status', catatan = " . ($catatan ? "'$catatan'" : "NULL") . " WHERE id = '$berkas_id'";

    if ($conn->query($sql) === TRUE) {
        http_response_code(200);
        echo json_encode(["message" => "Berkas berhasil divalidasi."]);
    } else {
        error_log("SQL Error: " . $conn->error);
        http_response_code(500);
        echo json_encode(["error" => "Gagal memperbarui berkas: " . $conn->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Metode tidak diizinkan."]);
}
?>