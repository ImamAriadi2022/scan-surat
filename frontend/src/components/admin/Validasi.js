import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Card, Form } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';

function Validasi() {
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // Mahasiswa yang dipilih
  const [showModal, setShowModal] = useState(false); // Kontrol modal
  const [actionStatus, setActionStatus] = useState(''); // Status aksi (verifikasi/penolakan)

  // Simulasi data mahasiswa
  const mahasiswaList = [
    { id: 1, nama: 'John Doe', nim: '12345678', status: 'Belum Diverifikasi' },
    { id: 2, nama: 'Jane Smith', nim: '87654321', status: 'Belum Diverifikasi' },
  ];

  // Fungsi untuk membuka modal detail
  const handleShowDetail = (mahasiswa) => {
    setSelectedMahasiswa(mahasiswa);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setSelectedMahasiswa(null);
    setShowModal(false);
    setActionStatus('');
  };

  // Fungsi untuk memverifikasi berkas
  const handleVerify = () => {
    setActionStatus('Terverifikasi');
    setTimeout(() => {
      alert(`Berkas mahasiswa ${selectedMahasiswa.nama} telah diverifikasi.`);
      handleCloseModal();
    }, 500);
  };

  // Fungsi untuk menolak verifikasi
  const handleReject = () => {
    setActionStatus('Ditolak');
    setTimeout(() => {
      alert(`Berkas mahasiswa ${selectedMahasiswa.nama} telah ditolak.`);
      handleCloseModal();
    }, 500);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Halaman Validasi Berkas</h2>

      {/* Tabel Daftar Mahasiswa */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>NIM</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswaList.map((mahasiswa, index) => (
            <tr key={mahasiswa.id}>
              <td>{index + 1}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.nim}</td>
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
              <h6>NIM: {selectedMahasiswa.nim}</h6>
              <p>Status: <strong>{selectedMahasiswa.status}</strong></p>

              {/* Daftar Berkas */}
              <Row className="g-4">
                {/* Berkas 1 */}
                <Col md={6}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center">
                        <FaFilePdf className="me-2 text-danger" />
                        Berkas 1
                      </Card.Title>
                      <Card.Text>
                        Deskripsi berkas 1: Contoh file PDF yang diunggah oleh pengguna.
                      </Card.Text>
                      <Button variant="primary" className="w-100">
                        Lihat Berkas
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Berkas 2 */}
                <Col md={6}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center">
                        <FaFilePdf className="me-2 text-danger" />
                        Berkas 2
                      </Card.Title>
                      <Card.Text>
                        Deskripsi berkas 2: Contoh file PDF yang diunggah oleh pengguna.
                      </Card.Text>
                      <Button variant="primary" className="w-100">
                        Lihat Berkas
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Berkas 3 */}
                <Col md={6}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center">
                        <FaFilePdf className="me-2 text-danger" />
                        Berkas 3
                      </Card.Title>
                      <Card.Text>
                        Deskripsi berkas 3: Contoh file PDF yang diunggah oleh pengguna.
                      </Card.Text>
                      <Button variant="primary" className="w-100">
                        Lihat Berkas
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Surat Keterangan Masih Kuliah */}
                <Col md={6}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center">
                        <FaFilePdf className="me-2 text-danger" />
                        Surat Keterangan Masih Kuliah
                      </Card.Title>
                      <Card.Text>
                        Surat keterangan ini akan diverifikasi setelah semua berkas sebelumnya direview.
                      </Card.Text>
                      <Button variant="primary" className="w-100">
                        Lihat Surat
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Aksi Verifikasi */}
              <div className="mt-4">
                <Form.Group className="mb-3">
                  <Form.Label>Catatan (Opsional)</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Tambahkan catatan jika diperlukan..." />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" onClick={handleReject}>
                    Tolak Verifikasi
                  </Button>
                  <Button variant="success" onClick={handleVerify}>
                    Verifikasi Berkas
                  </Button>
                </div>
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