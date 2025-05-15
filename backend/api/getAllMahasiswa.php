<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, nama, nim, fakultas, jurusan, email, username, foto FROM users WHERE role = 'mahasiswa' ORDER BY id ASC";
    $result = $conn->query($sql);

    $mahasiswa = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $mahasiswa[] = $row;
        }
    }
    http_response_code(200);
    echo json_encode($mahasiswa);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Metode tidak diizinkan."]);
}
?>