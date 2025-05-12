<?php
class Surat {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getSuratWithQR($qr_token) {
        $stmt = $this->conn->prepare("SELECT * FROM berkas WHERE qr_token = ?");
        $stmt->bind_param("s", $qr_token);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
