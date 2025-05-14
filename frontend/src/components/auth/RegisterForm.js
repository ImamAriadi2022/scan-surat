import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function RegisterForm() {
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
    fakultas: '',
    jurusan: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false); // State lokal untuk isLoading
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  if (formData.password !== formData.confirmPassword) {
    setError('Password dan konfirmasi password tidak cocok.');
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch('http://localhost/scan-surat/backend/api/auth.php?action=register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama: formData.nama,
        nim: formData.nim,
        email: formData.email,
        fakultas: formData.fakultas,
        jurusan: formData.jurusan,
        username: formData.username,
        password: formData.password,
      }),
    });

    const result = await response.json();
    console.log('Backend Response:', result); // Tambahkan logging untuk respons backend

    if (response.ok) {
      setSuccess('Pendaftaran berhasil. Silakan login.');
      setFormData({
        nama: '',
        nim: '',
        email: '',
        fakultas: '',
        jurusan: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setError(result.error || 'Terjadi kesalahan saat mendaftar.');
    }
  } catch (err) {
    console.error('Fetch Error:', err); // Tambahkan logging untuk error fetch
    setError('Gagal terhubung ke server.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Formulir Pendaftaran</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            placeholder="Masukkan nama lengkap"
            value={formData.nama}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>NIM</Form.Label>
          <Form.Control
            type="text"
            name="nim"
            placeholder="Masukkan NIM"
            value={formData.nim}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fakultas</Form.Label>
          <Form.Control
            type="text"
            name="fakultas"
            placeholder="Masukkan fakultas"
            value={formData.fakultas}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Jurusan</Form.Label>
          <Form.Control
            type="text"
            name="jurusan"
            placeholder="Masukkan jurusan"
            value={formData.jurusan}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Masukkan username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Konfirmasi Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Masukkan ulang password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Daftar'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default RegisterForm;