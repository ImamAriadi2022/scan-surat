class Berkas {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function upload($user_id, $judul, $filename) {
        $stmt = $this->conn->prepare("INSERT INTO berkas (user_id, judul_surat, file_path) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $user_id, $judul, $filename);
        return $stmt->execute();
    }

    public function verify($id, $token, $qr_file) {
        $stmt = $this->conn->prepare("UPDATE berkas SET status = 'terverifikasi', qr_token = ?, qr_path = ? WHERE id = ?");
        $stmt->bind_param("ssi", $token, $qr_file, $id);
        return $stmt->execute();
    }

    public function getByUser($user_id) {
        $stmt = $this->conn->prepare("SELECT * FROM berkas WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        return $stmt->get_result();
    }
}
