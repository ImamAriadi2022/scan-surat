import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Card } from 'react-bootstrap';
import { FaFilePdf, FaBarcode } from 'react-icons/fa';

function Verifikasi() {
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // Mahasiswa yang dipilih
  const [showModal, setShowModal] = useState(false); // Kontrol modal

  // Simulasi data mahasiswa
  const mahasiswaList = [
    { id: 1, nama: 'John Doe', nim: '12345678', status: 'Belum Diverifikasi' },
    { id: 2, nama: 'Jane Smith', nim: '87654321', status: 'Terverifikasi' },
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
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Halaman Verifikasi</h2>

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
                  Lihat Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Detail Mahasiswa */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Verifikasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMahasiswa && (
            <>
              <h5>Nama: {selectedMahasiswa.nama}</h5>
              <h6>NIM: {selectedMahasiswa.nim}</h6>
              <p>Status: <strong>{selectedMahasiswa.status}</strong></p>

              {/* Jika status belum diverifikasi, tampilkan berkas */}
              {selectedMahasiswa.status === 'Belum Diverifikasi' && (
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
              )}

              {/* Jika status terverifikasi, tampilkan barcode */}
              {selectedMahasiswa.status === 'Terverifikasi' && (
                <div className="text-center mt-4">
                  <h4>Status: <span className="text-success">Terverifikasi</span></h4>
                  <p>Setelah diverifikasi, barcode tersedia untuk di-scan.</p>
                  <Button variant="success" className="mt-3">
                    <FaBarcode className="me-2" />
                    Lihat Barcode
                  </Button>
                </div>
              )}
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

export default Verifikasi;