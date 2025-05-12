<?php
require_once __DIR__ . '/../models/Surat.php';

class QRController {
    private $surat;

    public function __construct($db) {
        $this->surat = new Surat($db);
    }

    public function getDataByQR($token) {
        return $this->surat->getSuratWithQR($token);
    }
}
