import React, { useState, useRef } from 'react';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import { FaBarcode } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react'; // Gunakan QRCodeCanvas

function Status() {
  // Simulasi data status berkas mahasiswa
  const berkasStatus = [
    {
      id: 1,
      namaBerkas: 'Berkas 1',
      status: 'Terverifikasi',
      catatan: 'Berkas sudah sesuai.',
    },
    {
      id: 2,
      namaBerkas: 'Berkas 2',
      status: 'Terverifikasi',
      catatan: 'Berkas sudah sesuai.',
    },
    {
      id: 3,
      namaBerkas: 'Berkas 3',
      status: 'Terverifikasi',
      catatan: 'Berkas sudah sesuai.',
    },
    {
      id: 4,
      namaBerkas: 'Surat Keterangan Masih Kuliah',
      status: 'Terverifikasi',
      catatan: 'Berkas sudah sesuai.',
    },
  ];

  // Cek apakah semua berkas sudah terverifikasi
  const allVerified = berkasStatus.every((berkas) => berkas.status === 'Terverifikasi');

  // Referensi untuk elemen QRCodeCanvas
  const qrCodeRef = useRef();

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
              <td>{berkas.namaBerkas}</td>
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
            <QRCodeCanvas value="https://example.com/mahasiswa/barcode" size={200} />
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