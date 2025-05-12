require '../config/db.php';
session_start();

$username = sanitize($_POST['username']);
$password = sanitize($_POST['password']);

$query = $conn->prepare("SELECT * FROM users WHERE username = ?");
$query->bind_param("s", $username);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

if ($user && hash('sha256', $password) === $user['password']) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    echo json_encode(['status' => 'success', 'role' => $user['role']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Login gagal']);
}