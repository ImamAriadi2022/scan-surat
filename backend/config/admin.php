<?php
// auth.php
// Header untuk mengatur konten dan CORS
header("Content-Type: text/html; charset=UTF-8");

require_once 'db.php'; // Mengimpor konfigurasi database

// Variabel untuk pesan sukses atau error
$success = null;
$error = null;

// Tangani form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = "Admin"; // Default nama untuk admin
    $nim = "00000000"; // Default NIM untuk admin
    $email = "admin@example.com"; // Default email untuk admin
    $fakultas = "Admin Fakultas"; // Default fakultas untuk admin
    $jurusan = "Admin Jurusan"; // Default jurusan untuk admin
    $username = $conn->real_escape_string($_POST['username']);
    $password = $conn->real_escape_string($_POST['password']);
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $role = 'admin'; // Default role untuk admin

    // Validasi input
    if (empty($username) || empty($password)) {
        $error = "Username dan password tidak boleh kosong.";
    } else {
        // Query untuk menyimpan admin baru
        $sql = "INSERT INTO users (nama, nim, email, fakultas, jurusan, username, password, role) 
                VALUES ('$nama', '$nim', '$email', '$fakultas', '$jurusan', '$username', '$hashedPassword', '$role')";

        if ($conn->query($sql) === TRUE) {
            $success = "Admin berhasil ditambahkan.";
        } else {
            if ($conn->errno === 1062) { // Duplicate entry
                $error = "Username sudah ada. Gunakan username lain.";
            } else {
                $error = "Terjadi kesalahan: " . $conn->error;
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Admin</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-header text-center">
                        <h4>Tambah Admin Baru</h4>
                    </div>
                    <div class="card-body">
                        <!-- Tampilkan pesan sukses atau error -->
                        <?php if ($success): ?>
                            <div class="alert alert-success"><?php echo $success; ?></div>
                        <?php endif; ?>
                        <?php if ($error): ?>
                            <div class="alert alert-danger"><?php echo $error; ?></div>
                        <?php endif; ?>

                        <!-- Form untuk input admin -->
                        <form method="POST" action="">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" name="username" placeholder="Masukkan username" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Masukkan password" required>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary w-100">Tambah Admin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>