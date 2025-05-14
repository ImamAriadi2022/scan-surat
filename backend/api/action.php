<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($method === "POST") {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case "login":
                handleLogin($conn, $input);
                break;
            case "upload":
                handleUpload($conn, $input);
                break;
            case "validate":
                handleValidate($conn, $input);
                break;
            default:
                http_response_code(400);
                echo json_encode(["error" => "Invalid action."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Action not specified."]);
    }
} elseif ($method === "GET") {
    switch ($_GET['action']) {
        case "getBerkas":
            handleGetBerkas($conn);
            break;
        case "getStatus":
            handleGetStatus($conn);
            break;
        default:
            http_response_code(400);
            echo json_encode(["error" => "Invalid action."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}

function handleLogin($conn, $input) {
    if (!isset($input['username'], $input['password'])) {
        http_response_code(400);
        echo json_encode(["error" => "Incomplete login data."]);
        return;
    }

    $username = $conn->real_escape_string($input['username']);
    $password = $input['password'];

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $token = base64_encode(random_bytes(32)); // Simulasi token
            http_response_code(200);
            echo json_encode([
                "message" => "Login successful.",
                "token" => $token,
                "role" => $user['role'],
                "username" => $user['username']
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Invalid username or password."]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid username or password."]);
    }
}

function handleUpload($conn) {
    if (!isset($_POST['user_id']) || empty($_FILES)) {
        http_response_code(400);
        echo json_encode(["error" => "Incomplete upload data."]);
        return;
    }

    $user_id = $conn->real_escape_string($_POST['user_id']);
    $uploadDir = '../uploads/'; // Direktori untuk menyimpan file
    $uploadedFiles = [];

    // Pastikan direktori upload ada
    if (!is_dir($uploadDir)) {
        http_response_code(500);
        echo json_encode(["error" => "Upload directory does not exist."]);
        return;
    }

    foreach ($_FILES as $key => $file) {
        $fileName = basename($file['name']);
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

        // Validasi tipe file
        if (strtolower($fileType) !== 'pdf') {
            http_response_code(400);
            echo json_encode(["error" => "Only PDF files are allowed."]);
            return;
        }

        $targetFilePath = $uploadDir . $fileName;

        // Pindahkan file ke direktori tujuan
        if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
            $uploadedFiles[] = [
                'nama_berkas' => $key,
                'file_path' => $targetFilePath,
            ];
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to upload file: $fileName"]);
            return;
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
            return;
        }
    }

    http_response_code(201);
    echo json_encode(["message" => "Files uploaded successfully."]);
}

function handleValidate($conn, $input) {
    if (!isset($input['berkas_id'], $input['status'])) {
        http_response_code(400);
        echo json_encode(["error" => "Incomplete validation data."]);
        return;
    }

    $berkas_id = $conn->real_escape_string($input['berkas_id']);
    $status = $conn->real_escape_string($input['status']);
    $catatan = isset($input['catatan']) ? $conn->real_escape_string($input['catatan']) : null;

    $sql = "UPDATE berkas SET status = '$status', catatan = '$catatan' WHERE id = '$berkas_id'";

    if ($conn->query($sql) === TRUE) {
        http_response_code(200);
        echo json_encode(["message" => "File status updated successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update file status: " . $conn->error]);
    }
}

function handleGetBerkas($conn) {
    $sql = "SELECT b.id, b.nama_berkas, b.file_path, b.status, b.catatan, u.username 
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
        echo json_encode(["error" => "No files found."]);
    }
}



function handleGetStatus($conn) {
    if (!isset($_GET['user_id'])) {
        http_response_code(400);
        echo json_encode(["error" => "User ID is required."]);
        return;
    }

    $user_id = $conn->real_escape_string($_GET['user_id']);

    $sql = "SELECT id, nama_berkas, status, catatan FROM berkas WHERE user_id = '$user_id'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $status = [];
        while ($row = $result->fetch_assoc()) {
            $status[] = $row;
        }
        http_response_code(200);
        echo json_encode($status);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "No files found for this user."]);
    }
}

?>