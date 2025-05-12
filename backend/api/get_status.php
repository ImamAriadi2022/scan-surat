require '../config/db.php';
session_start();

if ($_SESSION['role'] !== 'mahasiswa') die("Unauthorized");

$uid = $_SESSION['user_id'];
$res = $conn->query("SELECT * FROM berkas WHERE user_id = $uid ORDER BY created_at DESC");
$data = [];
while ($row = $res->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);