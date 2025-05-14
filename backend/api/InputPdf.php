<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/db.php';

$uploadDir = '../uploads/'; // Direktori untuk menyimpan file

// Pastikan direktori upload ada
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['user_id']) || empty($_FILES)) {
        http_response_code(400);
        echo json_encode(["error" => "Incomplete upload data."]);
        exit();
    }

    $user_id = $conn->real_escape_string($_POST['user_id']);
    $uploadedFiles = [];

    foreach ($_FILES as $key => $file) {
        $fileName = basename($file['name']);
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

        // Validasi tipe file
        if (strtolower($fileType) !== 'pdf') {
            http_response_code(400);
            echo json_encode(["error" => "Only PDF files are allowed."]);
            exit();
        }

        $uniqueFileName = uniqid() . '_' . $fileName; // Buat nama file unik
        $targetFilePath = $uploadDir . $uniqueFileName;

        // Pindahkan file ke direktori tujuan
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            $uploadedFiles[] = [
                'nama_berkas' => $uniqueFileName, // Simpan nama file unik
                'file_path' => $targetFilePath,
            ];
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to upload file: $fileName"]);
            exit();
        }
    }

    // Simpan informasi file ke database
    foreach ($uploadedFiles as $file) {
        $nama_berkas = $conn->real_escape_string($file['nama_berkas']);
        $file_path = $conn->real_escape_string($file['file_path']);

        $sql = "INSERT INTO berkas (user_id, nama_berkas, file_path) VALUES ('$user_id', '$nama_berkas', '$file_path')";

        if (!$conn->query($sql)) {
            error_log("SQL Error: " . $conn->error); // Logging error SQL
            http_response_code(500);
            echo json_encode(["error" => "Failed to save file info: " . $conn->error]);
            exit();
        }
    }

    http_response_code(201);
    echo json_encode(["message" => "Files uploaded successfully."]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}
?>