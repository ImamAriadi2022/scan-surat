<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Izinkan origin frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Izinkan metode GET, POST, dan OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Izinkan header tertentu

// Tangani preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php'; // Mengimpor konfigurasi database

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($method === "POST") {
    if (isset($_GET['action']) && $_GET['action'] === "register") {
        handleRegister($conn, $input);
    } elseif (isset($_GET['action']) && $_GET['action'] === "login") {
        handleLogin($conn, $input);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid action."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}


function handleRegister($conn, $input) {
    if (!isset($input['nama'], $input['nim'], $input['email'], $input['fakultas'], $input['jurusan'], $input['username'], $input['password'])) {
        http_response_code(400);
        echo json_encode(["error" => "Incomplete registration data."]);
        return;
    }

    $nama = $conn->real_escape_string($input['nama']);
    $nim = $conn->real_escape_string($input['nim']);
    $email = $conn->real_escape_string($input['email']);
    $fakultas = $conn->real_escape_string($input['fakultas']);
    $jurusan = $conn->real_escape_string($input['jurusan']);
    $username = $conn->real_escape_string($input['username']);
    $password = password_hash($input['password'], PASSWORD_BCRYPT);
    $role = 'mahasiswa'; // Default role untuk pendaftaran

    $sql = "INSERT INTO users (nama, nim, email, fakultas, jurusan, username, password, role) VALUES ('$nama', '$nim', '$email', '$fakultas', '$jurusan', '$username', '$password', '$role')";

    if ($conn->query($sql) === TRUE) {
        http_response_code(201);
        echo json_encode(["message" => "Registration successful."]);
    } else {
        error_log("SQL Error: " . $conn->error); // Tambahkan logging untuk error SQL
        if ($conn->errno === 1062) { // Duplicate entry
            http_response_code(409);
            echo json_encode(["error" => "Username, NIM, or email already exists."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Registration failed: " . $conn->error]);
        }
    }
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
                "user_id" => $user['id'], // Tambahkan user_id
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