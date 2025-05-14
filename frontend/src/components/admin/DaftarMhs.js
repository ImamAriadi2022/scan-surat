import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';

function DaftarMhs() {
  const [mahasiswa, setMahasiswa] = useState(null); // Data mahasiswa yang login
  const [showModal, setShowModal] = useState(false); // Kontrol modal
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // Data mahasiswa yang dipilih untuk detail

  // Simulasi data mahasiswa yang login
  useEffect(() => {
    // Ganti dengan API call untuk mendapatkan data mahasiswa yang login
    const loggedInMahasiswa = {
      id: 1,
      nama: 'John Doe',
      nim: '12345678',
      fakultas: 'Teknik',
      jurusan: 'Informatika',
      email: 'johndoe@example.com',
    };
    setMahasiswa(loggedInMahasiswa);
  }, []);

  // Fungsi untuk membuka modal detail
  const handleShowDetail = (mahasiswa) => {
    setSelectedMahasiswa(mahasiswa);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMahasiswa(null);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Daftar Mahasiswa</h2>
      {mahasiswa ? (
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
            <tr>
              <td>{mahasiswa.id}</td>
              <td>{mahasiswa.nama}</td>
              <td>{mahasiswa.nim}</td>
              <td>{mahasiswa.fakultas}</td>
              <td>{mahasiswa.jurusan}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetail(mahasiswa)}
                >
                  Lihat Detail
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <p className="text-center">Tidak ada data mahasiswa yang login.</p>
      )}

      {/* Modal untuk detail mahasiswa */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Mahasiswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMahasiswa && (
            <div>
              <p><strong>Nama:</strong> {selectedMahasiswa.nama}</p>
              <p><strong>NIM:</strong> {selectedMahasiswa.nim}</p>
              <p><strong>Fakultas:</strong> {selectedMahasiswa.fakultas}</p>
              <p><strong>Jurusan:</strong> {selectedMahasiswa.jurusan}</p>
              <p><strong>Email:</strong> {selectedMahasiswa.email}</p>
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