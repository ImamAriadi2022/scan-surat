import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Image, Alert, Form, Row, Col } from 'react-bootstrap';

function DaftarMhs() {
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        const response = await fetch('http://localhost/scan-surat/backend/api/getAllMahasiswa.php');
        const result = await response.json();
        if (response.ok) {
          setMahasiswaList(result);
        } else {
          setError(result.error || 'Gagal mengambil data mahasiswa.');
        }
      } catch (err) {
        setError('Gagal terhubung ke server.');
      }
    };
    fetchMahasiswa();
  }, []);

  const handleShowDetail = (mhs) => {
    setSelectedMahasiswa(mhs);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMahasiswa(null);
  };

  // Filter mahasiswa berdasarkan nama atau username
  const filteredMahasiswa = mahasiswaList.filter(
    (mhs) =>
      mhs.nama.toLowerCase().includes(search.toLowerCase()) ||
      mhs.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Daftar Mahasiswa</h2>
      <Row className="mb-3">
        <Col md={6} className="mx-auto">
          <Form.Control
            type="text"
            placeholder="Cari berdasarkan nama atau username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      {filteredMahasiswa.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>NIM</th>
              <th>Fakultas</th>
              <th>Jurusan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMahasiswa.map((mhs, idx) => (
              <tr key={mhs.id}>
                <td>{idx + 1}</td>
                <td>{mhs.nama}</td>
                <td>{mhs.nim}</td>
                <td>{mhs.fakultas}</td>
                <td>{mhs.jurusan}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowDetail(mhs)}>
                    Lihat Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">Tidak ada data mahasiswa.</p>
      )}

      {/* Modal untuk detail mahasiswa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Mahasiswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMahasiswa && (
            <div>
              {selectedMahasiswa.foto && (
                <div className="text-center mb-3">
                  <Image
                    src={selectedMahasiswa.foto}
                    roundedCircle
                    width={100}
                    height={100}
                    alt="Foto Mahasiswa"
                  />
                </div>
              )}
              <p><strong>Nama:</strong> {selectedMahasiswa.nama}</p>
              <p><strong>NIM:</strong> {selectedMahasiswa.nim}</p>
              <p><strong>Fakultas:</strong> {selectedMahasiswa.fakultas}</p>
              <p><strong>Jurusan:</strong> {selectedMahasiswa.jurusan}</p>
              <p><strong>Email:</strong> {selectedMahasiswa.email}</p>
              <p><strong>Username:</strong> {selectedMahasiswa.username}</p>
            </div>
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

export default DaftarMhs;