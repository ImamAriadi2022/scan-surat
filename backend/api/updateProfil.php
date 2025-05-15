<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($input['user_id'], $input['nama'], $input['nim'], $input['email'], $input['fakultas'], $input['jurusan'])
    ) {
        http_response_code(400);
        echo json_encode(["error" => "Data tidak lengkap."]);
        exit();
    }

    $user_id = $conn->real_escape_string($input['user_id']);
    $nama = $conn->real_escape_string($input['nama']);
    $nim = $conn->real_escape_string($input['nim']);
    $email = $conn->real_escape_string($input['email']);
    $fakultas = $conn->real_escape_string($input['fakultas']);
    $jurusan = $conn->real_escape_string($input['jurusan']);

    $sql = "UPDATE users SET nama='$nama', nim='$nim', email='$email', fakultas='$fakultas', jurusan='$jurusan' WHERE id='$user_id'";

    if ($conn->query($sql) === TRUE) {
        http_response_code(200);
        echo json_encode(["message" => "Profil berhasil diperbarui."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Gagal memperbarui profil: " . $conn->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Metode tidak diizinkan."]);
}
?>