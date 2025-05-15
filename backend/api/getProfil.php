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
    if (!isset($_GET['user_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Parameter user_id tidak ditemukan."]);
        exit();
    }

    $user_id = $conn->real_escape_string($_GET['user_id']);
    $sql = "SELECT id, nama, nim, email, fakultas, jurusan, username, foto FROM users WHERE id = '$user_id' LIMIT 1";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $profil = $result->fetch_assoc();
        http_response_code(200);
        echo json_encode($profil);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Data profil tidak ditemukan."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Metode tidak diizinkan."]);
}
?>