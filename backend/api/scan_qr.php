require '../config/db.php';
$token = sanitize($_GET['token']);

$result = $conn->query("SELECT * FROM berkas WHERE qr_token = '$token'");
if ($result->num_rows > 0) {
    $data = $result->fetch_assoc();
    echo json_encode(['status' => 'valid', 'data' => $data]);
} else {
    echo json_encode(['status' => 'invalid']);
}