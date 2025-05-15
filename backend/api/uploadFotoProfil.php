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
    if (!isset($_POST['user_id']) || !isset($_FILES['foto'])) {
        http_response_code(400);
        echo json_encode(["error" => "Data tidak lengkap."]);
        exit();
    }

    $user_id = $conn->real_escape_string($_POST['user_id']);
    $foto = $_FILES['foto'];

    // Validasi tipe file
    $allowed = ['jpg', 'jpeg', 'png'];
    $ext = strtolower(pathinfo($foto['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed)) {
        http_response_code(400);
        echo json_encode(["error" => "Format foto harus JPG, JPEG, atau PNG."]);
        exit();
    }

    // Simpan file
    $uploadDir = '../uploads/foto/';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
    $fileName = uniqid('foto_') . '.' . $ext;
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($foto['tmp_name'], $targetPath)) {
        // Simpan path ke database (relatif dari frontend)
        $fotoUrl = "http://localhost/scan-surat/backend/uploads/foto/$fileName";
        $sql = "UPDATE users SET foto='$fotoUrl' WHERE id='$user_id'";
        if ($conn->query($sql) === TRUE) {
            http_response_code(200);
            echo json_encode(["foto" => $fotoUrl, "message" => "Foto profil berhasil diunggah."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Gagal menyimpan foto ke database."]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Gagal mengunggah file."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Metode tidak diizinkan."]);
}
?>