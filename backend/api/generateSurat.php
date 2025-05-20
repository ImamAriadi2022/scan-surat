<?php

error_reporting(E_ERROR | E_PARSE);
require_once '../libs/TCPDF/tcpdf.php';
require_once '../libs/phpqrcode/qrlib.php';
require_once '../config/db.php';

$user_id = $_GET['user_id'] ?? 0;

// Ambil data user
$userSql = "SELECT nama, nim FROM users WHERE id = '$user_id'";
$userResult = $conn->query($userSql);
if (!$userResult || $userResult->num_rows == 0) {
    die('User tidak ditemukan.');
}
$user = $userResult->fetch_assoc();
$nama = $user['nama'] ?? '-';
$username = $user['nim'] ?? '-';

// Ambil semua jenis surat yang sudah diverifikasi
$sql = "SELECT jenis_surat FROM berkas WHERE user_id = '$user_id' AND status = 'Terverifikasi' GROUP BY jenis_surat";
$result = $conn->query($sql);

if (!$result || $result->num_rows == 0) {
    die('Tidak ada surat yang diverifikasi.');
}

$pdf = new TCPDF();
$pdf->SetFont('dejavusans', '', 12);

function getSuratTemplate($jenisSurat, $nama, $username) {
    switch ($jenisSurat) {
        case 'Surat Keterangan Masih Kuliah':
            return "
                <h2 style='text-align:center;'>Surat Keterangan Masih Kuliah</h2>
                <p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Adalah benar mahasiswa aktif di universitas ini.</p>
            ";
        case 'Surat Keterangan Tidak Sedang Menerima Beasiswa':
            return "
                <h2 style='text-align:center;'>Surat Keterangan Tidak Sedang Menerima Beasiswa</h2>
                <p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Saat ini tidak sedang menerima beasiswa apapun.</p>
            ";
        case 'Surat Keterangan Aktif Kuliah':
            return "
                <h2 style='text-align:center;'>Surat Keterangan Aktif Kuliah</h2>
                <p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Adalah benar mahasiswa aktif pada semester berjalan.</p>
            ";
        case 'Surat Rekomendasi Beasiswa':
            return "
                <h2 style='text-align:center;'>Surat Rekomendasi Beasiswa</h2>
                <p>Yang bertanda tangan di bawah ini merekomendasikan:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Untuk mendapatkan beasiswa sesuai ketentuan yang berlaku.</p>
            ";
        case 'Surat Rekomendasi Mengikuti Kompetisi':
            return "
                <h2 style='text-align:center;'>Surat Rekomendasi Mengikuti Kompetisi</h2>
                <p>Yang bertanda tangan di bawah ini merekomendasikan:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Untuk mengikuti kompetisi sesuai permohonan.</p>
            ";
        case 'Proposal Kegiatan':
            return "
                <h2 style='text-align:center;'>Proposal Kegiatan</h2>
                <p>Proposal kegiatan atas nama:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Telah diterima untuk proses lebih lanjut.</p>
            ";
        case 'Legalisir KTM':
            return "
                <h2 style='text-align:center;'>Legalisir KTM</h2>
                <p>Kartu Tanda Mahasiswa atas nama:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Telah dilegalisir oleh pihak universitas.</p>  
            ";
        case 'SKPI (Surat Keterangan Pendamping Ijazah)':
            return "
                <h2 style='text-align:center;'>SKPI (Surat Keterangan Pendamping Ijazah)</h2>
                <p>Dokumen ini menerangkan bahwa:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Telah memenuhi syarat SKPI.</p>
            ";
        default:
            return "
                <h2 style='text-align:center;'>$jenisSurat</h2>
                <p>Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                <table>
                <tr><td>Nama</td><td>:</td><td>$nama</td></tr>
                <tr><td>NIM</td><td>:</td><td>$username</td></tr>
                </table>
                <p>Adalah benar mahasiswa aktif/berhak sesuai permohonan surat di atas.</p>
            ";
    }
}

// Fungsi untuk hari dan tanggal Indonesia
function hariTanggalIndonesia() {
    $hari = [
        'Sunday' => 'Minggu',
        'Monday' => 'Senin',
        'Tuesday' => 'Selasa',
        'Wednesday' => 'Rabu',
        'Thursday' => 'Kamis',
        'Friday' => 'Jumat',
        'Saturday' => 'Sabtu'
    ];
    $bulan = [
        1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
        5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
        9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
    ];
    $now = new DateTime();
    $hariIni = $hari[$now->format('l')];
    $tgl = $now->format('j');
    $bln = $bulan[(int)$now->format('n')];
    $thn = $now->format('Y');
    return "$hariIni, $tgl $bln $thn";
}

while ($row = $result->fetch_assoc()) {
    $jenisSurat = $row['jenis_surat'];

    $pdf->AddPage();
    $html = getSuratTemplate($jenisSurat, $nama, $username);
    $pdf->writeHTML($html, true, false, true, false, '');

    // QR code untuk validasi online
    $qrTemp = tempnam(sys_get_temp_dir(), 'qr_') . '.png';
    $qrValue = "http://localhost/scan-surat/backend/api/getBerkasByUser.php?user_id=" . $user_id;
    QRcode::png($qrValue, $qrTemp, QR_ECLEVEL_L, 4);

    // Atur posisi barcode dan teks agar lebih dekat ke isi surat
    $currentY = $pdf->GetY() + 140; // sedikit di bawah isi surat
    if ($currentY > ($pdf->getPageHeight() - 60)) {
        $currentY = $pdf->getPageHeight() - 60;
    }
    $pdf->SetY($currentY);

    // Teks di atas barcode
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->Cell(0, 5, 'Bandar Lampung', 0, 12, 'C');
    $pdf->Cell(0, 5, hariTanggalIndonesia(), 0, 12, 'C');

    // Barcode di tengah
    $barcodeY = $pdf->GetY();
    $pdf->Image($qrTemp, ($pdf->GetPageWidth() - 40) / 2, $barcodeY, 40, 40, 'PNG');

    // Teks di bawah barcode
    $pdf->SetY($barcodeY + 35);
    $pdf->SetFont('dejavusans', '', 10);
    $pdf->Cell(0, 8, 'Dr. Eng. Ageng Sadnowo Repelianto, S.T., M.T.,', 0, 1, 'C');

    unlink($qrTemp);
}

$pdf->Output('surat_mahasiswa.pdf', 'I');
$conn->close();