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
                <br><br>
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
                <br><br>
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
                <br><br>
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
                <br><br>
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
                <br><br>
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
                <br><br>
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
                <br><br>
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
                <br><br>
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
                <br><br>
            ";
    }
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
    $pdf->Image($qrTemp, 160, 230, 30, 30, 'PNG');
    unlink($qrTemp);
}

$pdf->Output('surat_mahasiswa.pdf', 'I');
$conn->close();