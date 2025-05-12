require '../config/db.php';
require '../helpers/security.php';
session_start();

if ($_SESSION['role'] !== 'admin') die("Unauthorized");

$berkas_id = intval($_POST['berkas_id']);
$catatan = sanitize($_POST['catatan']);

// Generate QR
$token = generateToken($berkas_id);
$qrFile = $berkas_id . '_' . time() . '.png';
$qrPath = '../public/qrcodes/' . $qrFile;
require '../vendor/phpqrcode/qrlib.php';
QRcode::png("https://yourdomain.com/api/scan_qr.php?token=$token", $qrPath);

// Simpan ke DB
$conn->query("UPDATE berkas SET status = 'terverifikasi', qr_token = '$token', qr_path = '$qrFile' WHERE id = $berkas_id");
$conn->query("INSERT INTO verifikasi (admin_id, berkas_id, catatan) VALUES ({$_SESSION['user_id']}, $berkas_id, '$catatan')");

echo json_encode(['status' => 'success', 'qr' => $qrFile]);