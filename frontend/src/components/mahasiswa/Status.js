import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Badge, Button, Alert } from 'react-bootstrap';
import { FaBarcode } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react'; // Gunakan QRCodeCanvas

function Status() {
  const [berkasStatus, setBerkasStatus] = useState([]); // Status berkas mahasiswa
  const [error, setError] = useState(null); // Pesan error
  const qrCodeRef = useRef(); // Referensi untuk elemen QRCodeCanvas

  // Ambil user_id dari localStorage
  const userId = localStorage.getItem('user_id');

  // Ambil data status berkas dari backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://localhost/scan-surat/backend/api/action.php?action=getStatus&user_id=${userId}`);
        const result = await response.json();

        if (response.ok) {
          setBerkasStatus(result);
        } else {
          setError(result.error || 'Gagal mengambil data status berkas.');
        }
      } catch (err) {
        setError('Gagal terhubung ke server.');
      }
    };

    fetchStatus();
  }, [userId]);

  // Cek apakah semua berkas sudah terverifikasi
  const allVerified = berkasStatus.every((berkas) => berkas.status === 'Terverifikasi');

  // Fungsi untuk mengunduh barcode
  const handleDownloadBarcode = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'barcode.png';
    link.click();
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Status Berkas</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Berkas</th>
            <th>Status</th>
            <th>Catatan</th>
          </tr>
        </thead>
        <tbody>
          {berkasStatus.map((berkas, index) => (
            <tr key={berkas.id}>
              <td>{index + 1}</td>
              <td>{berkas.nama_berkas}</td>
              <td>
                <Badge
                  bg={
                    berkas.status === 'Terverifikasi'
                      ? 'success'
                      : berkas.status === 'Ditolak'
                      ? 'danger'
                      : 'warning'
                  }
                >
                  {berkas.status}
                </Badge>
              </td>
              <td>{berkas.catatan || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Tampilkan Barcode jika semua berkas terverifikasi */}
      {allVerified && (
        <div className="text-center mt-5">
          <h4 className="mb-3">Semua berkas telah diverifikasi!</h4>
          <div ref={qrCodeRef}>
            <QRCodeCanvas value={`http://localhost/scan-surat/backend/api/getBerkasByUser.php?user_id=${userId}`} size={200} />
          </div>
          <p className="mt-3">Scan barcode ini untuk keperluan administrasi.</p>
          <Button variant="primary" onClick={handleDownloadBarcode}>
            <FaBarcode className="me-2" />
            Unduh Barcode
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Status;