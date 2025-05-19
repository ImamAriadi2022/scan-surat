<?php
require_once __DIR__ . '../libs/tcpdf/tcpdf.php';
require_once __DIR__ . '../libs/phpqrcode/qrlib.php';

// Ambil user_id dari GET/POST
$user_id = $_GET['user_id'] ?? 0;

// Data surat bisa diambil dari database sesuai user_id
// Contoh statis:
$nama = "Nama Mahasiswa";
$nim = "12345678";
$jenisSurat = "Surat Keterangan Masih Kuliah";

// Generate QR code ke file sementara
$qrTemp = tempnam(sys_get_temp_dir(), 'qr_') . '.png';
$qrValue = "http://localhost/scan-surat/backend/api/getBerkasByUser.php?user_id=" . $user_id;
QRcode::png($qrValue, $qrTemp, QR_ECLEVEL_L, 4);

// Buat PDF
$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('dejavusans', '', 12);

// Isi surat
$html = "
<h2 style='text-align:center;'>$jenisSurat</h2>
<p>Yang bertanda tangan di bawah ini menyatakan bahwa:</p>
<table>
<tr><td>Nama</td><td>:</td><td>$nama</td></tr>
<tr><td>NIM</td><td>:</td><td>$nim</td></tr>
</table>
<p>Adalah benar mahasiswa aktif pada semester ini.</p>
<br><br>
";
$pdf->writeHTML($html, true, false, true, false, '');

// Tempel QR code di pojok kanan bawah
$pdf->Image($qrTemp, 160, 230, 30, 30, 'PNG');

// Output PDF ke browser
$pdf->Output('surat_mahasiswa.pdf', 'I');

// Hapus file QR code sementara
unlink($qrTemp);
?>