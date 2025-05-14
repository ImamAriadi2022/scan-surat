<?php
$host = 'localhost';
$db = 'db_suratdigital';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    error_log("Database Connection Error: " . $conn->connect_error); // Tambahkan logging untuk koneksi database
    die("Connection failed: " . $conn->connect_error);
}