<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/db.php';

$uploadDir = '../uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['user_id'], $_POST['jenis_surat']) || empty($_FILES)) {
        http_response_code(400);
        echo json_encode(["error" => "Incomplete upload data."]);
        exit();
    }

    $user_id = $conn->real_escape_string($_POST['user_id']);
    $jenis_surat = $conn->real_escape_string($_POST['jenis_surat']);
    $uploadedFiles = [];

    // --- LOGIKA HAPUS BERKAS LAMA ---
    // Ambil semua file lama milik user
    $oldFilesQuery = "SELECT file_path FROM berkas WHERE user_id = '$user_id'";
    $oldFilesResult = $conn->query($oldFilesQuery);
    if ($oldFilesResult && $oldFilesResult->num_rows > 0) {
        while ($row = $oldFilesResult->fetch_assoc()) {
            $oldFile = $uploadDir . $row['file_path'];
            if (file_exists($oldFile)) {
                @unlink($oldFile);
            }
        }
        // Hapus data berkas lama dari database
        $conn->query("DELETE FROM berkas WHERE user_id = '$user_id'");
    }
    // --- END LOGIKA HAPUS BERKAS LAMA ---

    foreach ($_FILES as $key => $file) {
        $fileName = basename($file['name']);
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

        if (strtolower($fileType) !== 'pdf') {
            http_response_code(400);
            echo json_encode(["error" => "Only PDF files are allowed."]);
            exit();
        }

        $uniqueFileName = uniqid() . '_' . $fileName;
        $targetFilePath = $uploadDir . $uniqueFileName;

        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            $uploadedFiles[] = [
                'nama_berkas' => $fileName,
                'file_path' => $uniqueFileName,
                'jenis_surat' => $jenis_surat
            ];
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to upload file: $fileName"]);
            exit();
        }
    }

    foreach ($uploadedFiles as $file) {
        $nama_berkas = $conn->real_escape_string($file['nama_berkas']);
        $file_path = $conn->real_escape_string($file['file_path']);
        $jenis_surat = $conn->real_escape_string($file['jenis_surat']);

        $sql = "INSERT INTO berkas (user_id, nama_berkas, file_path, jenis_surat) VALUES ('$user_id', '$nama_berkas', '$file_path', '$jenis_surat')";

        if (!$conn->query($sql)) {
            error_log("SQL Error: " . $conn->error);
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