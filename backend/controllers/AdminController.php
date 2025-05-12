<?php
require_once __DIR__ . '/../models/Admin.php';

class AdminController {
    private $admin;

    public function __construct($db) {
        $this->admin = new Admin($db);
    }

    public function getAllBerkas() {
        return $this->admin->getAllBerkas();
    }

    public function assignNomor($id, $nomor) {
        return $this->admin->assignNomorSurat($id, $nomor);
    }
}
