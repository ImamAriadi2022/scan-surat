<?php
class Admin {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllBerkas() {
        return $this->conn->query("SELECT * FROM berkas");
    }

    public function assignNomorSurat($id, $nomor_surat) {
        $stmt = $this->conn->prepare("UPDATE berkas SET nomor_surat = ? WHERE id = ?");
        $stmt->bind_param("si", $nomor_surat, $id);
        return $stmt->execute();
    }
}
