import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';

function Validasi() {
  const [berkasList, setBerkasList] = useState([]);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [catatan, setCatatan] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBerkas = async () => {
      try {
        const response = await fetch('http://localhost/scan-surat/backend/api/validasi.php');
        const result = await response.json();

        if (response.ok) {
          setBerkasList(result);

          // Buat list mahasiswa unik berdasarkan username
          const mhsMap = {};
          result.forEach((b) => {
            if (!mhsMap[b.username]) {
              mhsMap[b.username] = {
                username: b.username,
                nama: b.nama,
                status: b.status,
              };
            }
          });
          setMahasiswaList(Object.values(mhsMap));
        } else {
          setError(result.error || 'Gagal mengambil data berkas.');
        }
      } catch (err) {
        setError('Gagal terhubung ke server.');
      }
    };

    fetchBerkas();
  }, []);

  const handleShowDetail = (username) => {
    setSelectedMahasiswa(username);
    setCatatan({});
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const handleCloseModal = () => {
    setSelectedMahasiswa(null);
    setShowModal(false);
    setCatatan({});
  };

  const handleCatatanChange = (berkasId, value) => {
    setCatatan((prev) => ({ ...prev, [berkasId]: value }));
  };

  const handleVerify = async (berkas) => {
    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/validasi.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          berkas_id: berkas.id,
          status: 'Terverifikasi',
          catatan: catatan[berkas.id] || '',
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(`Berkas ${berkas.nama_berkas} telah diverifikasi.`);
        setBerkasList((prev) =>
          prev.map((item) =>
            item.id === berkas.id ? { ...item, status: 'Terverifikasi' } : item
          )
        );
      } else {
        setError(result.error || 'Gagal memverifikasi berkas.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    }
  };

  const handleReject = async (berkas) => {
    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/validasi.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          berkas_id: berkas.id,
          status: 'Ditolak',
          catatan: catatan[berkas.id] || '',
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(`Berkas ${berkas.nama_berkas} telah ditolak.`);
        setBerkasList((prev) =>
          prev.map((item) =>
            item.id === berkas.id ? { ...item, status: 'Ditolak' } : item
          )
        );
      } else {
        setError(result.error || 'Gagal menolak berkas.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    }
  };

  // Filter mahasiswa berdasarkan nama atau username
  const filteredMahasiswa = mahasiswaList.filter(
    (mhs) =>
      mhs.nama.toLowerCase().includes(search.toLowerCase()) ||
      mhs.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Halaman Validasi Berkas</h2>
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
      {success && <Alert variant="success">{success}</Alert>}

      {/* Tabel Daftar Mahasiswa */}
      {filteredMahasiswa.length > 0 ? (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredMahasiswa.map((mhs, idx) => (
            <tr key={mhs.username}>
              <td>{idx + 1}</td>
              <td>{mhs.nama}</td>
              <td>{mhs.username}</td>
              <td>{mhs.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowDetail(mhs.username)}>
                  Review Berkas
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> ) : (
        <p className="text-center">Tidak ada data mahasiswa.</p>
      )}


      {/* Modal Detail Mahasiswa */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Review Berkas Mahasiswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMahasiswa && (
            <>
              <h5>Username: {selectedMahasiswa}</h5>
              {berkasList
                .filter((b) => b.username === selectedMahasiswa)
                .map((berkas) => (
                  <div key={berkas.id} className="mb-4 border-bottom pb-3">
                    <h6>Nama Berkas: {berkas.nama_berkas}</h6>
                    <p>Status: <strong>{berkas.status}</strong></p>
                    <p>Catatan: {berkas.catatan || '-'}</p>
                    <div className="mb-2">
                      <iframe
                        src={`http://localhost/scan-surat/backend/uploads/${berkas.nama_berkas}`}
                        title={`Preview ${berkas.nama_berkas}`}
                        width="100%"
                        height="350px"
                        style={{ border: '1px solid #ccc' }}
                      ></iframe>
                    </div>
                    <Form.Group className="mb-2">
                      <Form.Label>Catatan (Opsional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Tambahkan catatan jika diperlukan..."
                        value={catatan[berkas.id] || ''}
                        onChange={(e) => handleCatatanChange(berkas.id, e.target.value)}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                      <Button variant="danger" onClick={() => handleReject(berkas)}>
                        Tolak Verifikasi
                      </Button>
                      <Button variant="success" onClick={() => handleVerify(berkas)}>
                        Verifikasi Berkas
                      </Button>
                    </div>
                  </div>
                ))}
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