<?php
require_once __DIR__ . '/../models/Berkas.php';

class UploadController {
    private $berkas;

    public function __construct($db) {
        $this->berkas = new Berkas($db);
    }

    public function upload($user_id, $judul, $path) {
        return $this->berkas->upload($user_id, $judul, $path);
    }

    public function verifikasi($id, $token, $qr_path) {
        return $this->berkas->verify($id, $token, $qr_path);
    }
}
