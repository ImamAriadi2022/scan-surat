<?php
require __DIR__ . '/../vendor/autoload.php'; // menggunakan library endroid/qr-code

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;

function generateQRCode($text, $filename) {
    $qr = QrCode::create($text)
        ->setSize(300)
        ->setMargin(10);

    $writer = new PngWriter();
    $result = $writer->write($qr);

    $path = __DIR__ . '/../public/qr/' . $filename;
    $result->saveToFile($path);

    return 'public/qr/' . $filename;
}
