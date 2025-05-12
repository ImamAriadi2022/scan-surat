import React from 'react';
import QRScanner from '../components/QRScanner';
import UploadFrom from '../components/UploadFrom';

function MahasiswaPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Halaman Mahasiswa</h1>
      <div className="mt-4">
        <h2>Scan QR Code</h2>
        <QRScanner />
      </div>
      <div className="mt-5">
        <h2>Unggah File</h2>
        <UploadFrom />
      </div>
    </div>
  );
}

export default MahasiswaPage;