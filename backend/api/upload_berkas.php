require '../config/db.php';
session_start();

if ($_SESSION['role'] !== 'mahasiswa') die("Unauthorized");

$judul = sanitize($_POST['judul']);
$file = $_FILES['file'];

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$newName = uniqid() . '.' . $ext;
$uploadDir = '../public/uploads/';
$uploadPath = $uploadDir . $newName;

if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
    $stmt = $conn->prepare("INSERT INTO berkas (user_id, judul_surat, file_path) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $_SESSION['user_id'], $judul, $newName);
    $stmt->execute();
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal upload']);
}