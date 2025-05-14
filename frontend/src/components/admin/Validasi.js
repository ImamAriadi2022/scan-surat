import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

function Validasi() {
  const [mahasiswaList, setMahasiswaList] = useState([]); // Daftar berkas mahasiswa
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // Mahasiswa yang dipilih
  const [showModal, setShowModal] = useState(false); // Kontrol modal
  const [catatan, setCatatan] = useState(''); // Catatan validasi
  const [error, setError] = useState(null); // Pesan error
  const [success, setSuccess] = useState(null); // Pesan sukses

  // Ambil data berkas dari backend
  useEffect(() => {
    const fetchBerkas = async () => {
      try {
        const response = await fetch('http://localhost/scan-surat/backend/api/validasi.php');
        const result = await response.json();

        if (response.ok) {
          setMahasiswaList(result);
        } else {
          setError(result.error || 'Gagal mengambil data berkas.');
        }
      } catch (err) {
        setError('Gagal terhubung ke server.');
      }
    };

    fetchBerkas();
  }, []);

  // Fungsi untuk membuka modal detail
  const handleShowDetail = (mahasiswa) => {
    setSelectedMahasiswa(mahasiswa);
    setShowModal(true);
    setCatatan('');
    setError(null);
    setSuccess(null);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setSelectedMahasiswa(null);
    setShowModal(false);
    setCatatan('');
  };

  // Fungsi untuk memverifikasi berkas
  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/validasi.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          berkas_id: selectedMahasiswa.id,
          status: 'Terverifikasi',
          catatan,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(`Berkas mahasiswa ${selectedMahasiswa.nama} telah diverifikasi.`);
        setMahasiswaList((prevList) =>
          prevList.map((item) =>
            item.id === selectedMahasiswa.id ? { ...item, status: 'Terverifikasi' } : item
          )
        );
        setTimeout(handleCloseModal, 2000); // Tutup modal setelah 2 detik
      } else {
        setError(result.error || 'Gagal memverifikasi berkas.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    }
  };

  // Fungsi untuk menolak verifikasi
  const handleReject = async () => {
    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/validasi.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          berkas_id: selectedMahasiswa.id,
          status: 'Ditolak',
          catatan,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(`Berkas mahasiswa ${selectedMahasiswa.nama} telah ditolak.`);
        setMahasiswaList((prevList) =>
          prevList.map((item) =>
            item.id === selectedMahasiswa.id ? { ...item, status: 'Ditolak' } : item
          )
        );
        setTimeout(handleCloseModal, 2000); // Tutup modal setelah 2 detik
      } else {
        setError(result.error || 'Gagal menolak berkas.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Halaman Validasi Berkas</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Tabel Daftar Mahasiswa */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswaList.map((mahasiswa, index) => (
            <tr key={mahasiswa.id}>
              <td>{index + 1}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.username}</td>
              <td>{mahasiswa.status}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetail(mahasiswa)}
                >
                  Review Berkas
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Detail Mahasiswa */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Berkas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMahasiswa && (
            <>
              <h5>Nama: {selectedMahasiswa.nama}</h5>
              <h6>Username: {selectedMahasiswa.username}</h6>
              <p>Status: <strong>{selectedMahasiswa.status}</strong></p>

               {/* Review PDF */}
              {/* Review PDF */}
                <div className="mb-3">
                <h6>Preview Berkas:</h6>
                <iframe
                    src={`http://localhost/scan-surat/backend/uploads/${selectedMahasiswa.nama_berkas}`}
                    title="Preview Berkas"
                    width="100%"
                    height="500px"
                    style={{ border: '1px solid #ccc' }}
                ></iframe>
                </div>

              {/* Aksi Verifikasi */}
              <Form.Group className="mb-3">
                <Form.Label>Catatan (Opsional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tambahkan catatan jika diperlukan..."
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="danger" onClick={handleReject}>
                  Tolak Verifikasi
                </Button>
                <Button variant="success" onClick={handleVerify}>
                  Verifikasi Berkas
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Validasi;