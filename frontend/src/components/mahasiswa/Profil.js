import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

function Profil() {
  const [profil, setProfil] = useState({
    nama: 'John Doe',
    nim: '12345678',
    email: 'johndoe@example.com',
    fakultas: 'Teknik',
    jurusan: 'Informatika',
    foto: null,
  });

  const [isEditing, setIsEditing] = useState(false); // Kontrol mode edit

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfil((prevProfil) => ({
      ...prevProfil,
      [name]: value,
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setProfil((prevProfil) => ({
      ...prevProfil,
      foto: URL.createObjectURL(file),
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Profil Mahasiswa</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src={profil.foto || 'https://via.placeholder.com/150'}
                  alt="Foto Profil"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <Form.Group controlId="fotoProfil" className="mt-3">
                  <Form.Label>Unggah Foto Profil</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                  />
                </Form.Group>
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