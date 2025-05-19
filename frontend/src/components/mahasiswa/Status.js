import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Badge, Button, Alert } from 'react-bootstrap';
import { FaBarcode } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';

function Status() {
  const [berkasStatus, setBerkasStatus] = useState([]);
  const [error, setError] = useState(null);
  const qrCodeRef = useRef();

  const userId = localStorage.getItem('user_id');

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

  const allVerified = berkasStatus.length > 0 && berkasStatus.every((berkas) => berkas.status === 'Terverifikasi');

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