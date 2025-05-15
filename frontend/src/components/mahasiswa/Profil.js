import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

function Profil() {
  const [profil, setProfil] = useState({
    nama: '',
    nim: '',
    email: '',
    fakultas: '',
    jurusan: '',
    username: '',
    foto: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const response = await fetch(`http://localhost/scan-surat/backend/api/getProfil.php?user_id=${userId}`);
        const result = await response.json();
        if (response.ok) {
          setProfil(result);
        } else {
          setError(result.error || 'Gagal mengambil data profil.');
        }
      } catch (err) {
        setError('Gagal terhubung ke server.');
      }
    };
    if (userId) fetchProfil();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfil((prevProfil) => ({
      ...prevProfil,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
    setSuccess(null);
  };

  // ini buat upload foto

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
      if(e.target.files && e.target.files.length > 0) {
        setFotoFile(e.target.files[0]);
      }
    };
  
   // ...existing code...
    const handleUploadFoto = async (e) => {
      e.preventDefault();
      if (!fotoFile) {
        setError('Silakan pilih foto terlebih dahulu.');
        return;
      }
      const formData = new FormData();
      formData.append('foto', fotoFile);
      formData.append('user_id', userId);
  
      try {
        const response = await fetch('http://localhost/scan-surat/backend/api/uploadFotoProfil.php', { // <-- Ganti di sini
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          setProfil((prev) => ({ ...prev, foto: result.foto }));
          setSuccess('Foto berhasil diunggah!');
          setError(null);
          setFotoFile(null);
        } else {
          setError(result.error || 'Gagal mengunggah foto.');
        }
      } catch (err) {
        setError('Gagal terhubung ke server.');
      }
    };
  // ...existing code...

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/updateProfil.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          nama: profil.nama,
          nim: profil.nim,
          email: profil.email,
          fakultas: profil.fakultas,
          jurusan: profil.jurusan,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess('Profil berhasil diperbarui!');
        setIsEditing(false);
      } else {
        setError(result.error || 'Gagal memperbarui profil.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Profil Mahasiswa</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <div className="text-center mb-4">
                <img
                  src={profil.foto || 'https://via.placeholder.com/150'}
                  alt="Foto Profil"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                {/* Untuk upload foto, perlu endpoint khusus */}
                {/* <Form.Group controlId="fotoProfil" className="mt-3">
                  <Form.Label>Unggah Foto Profil</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    disabled={!isEditing}
                  />
                </Form.Group> */}
                 <Form onSubmit={handleUploadFoto} className="mt-3">
                  <Form.Group controlId="fotoProfil">
                    <Form.Label>Unggah Foto Profil</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                  <Button
                    variant="secondary"
                    type="submit"
                    className="mt-2"
                    disabled={!isEditing}
                  >
                    Upload Foto
                  </Button>
                </Form>

                {/* ini buat foto */}
              </div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    name="nama"
                    value={profil.nama}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>NIM</Form.Label>
                  <Form.Control
                    type="text"
                    name="nim"
                    value={profil.nim}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profil.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fakultas</Form.Label>
                  <Form.Control
                    type="text"
                    name="fakultas"
                    value={profil.fakultas}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Jurusan</Form.Label>
                  <Form.Control
                    type="text"
                    name="jurusan"
                    value={profil.jurusan}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={profil.username}
                    disabled
                  />
                </Form.Group>
                <div className="text-center">
                  {isEditing ? (
                    <Button variant="success" onClick={handleSave}>
                      Simpan Perubahan
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleEditToggle}>
                      Edit Profil
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profil;