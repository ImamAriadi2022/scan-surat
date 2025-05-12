import React, { useState } from 'react';
import { login } from '../utils/auth';
import { post } from '../services/api';
import { Container, Row, Col, Form, Button, Alert, Card, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!username || !password) {
      setError('Username dan password tidak boleh kosong.');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      // Kirim kredensial ke server
      const response = await post('/login', { username, password }); // Ganti '/login' dengan endpoint API Anda
      const { token } = response;

      if (!token) {
        throw new Error('Token tidak ditemukan. Login gagal.');
      }

      // Simpan token ke localStorage
      login(token);

      // Redirect ke halaman admin
      window.location.href = '/admin';
    } catch (err) {
      setError(err?.response?.data?.message || 'Login gagal. Periksa kembali kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <p className="text-center text-muted">
                Selamat datang di sistem manajemen surat. Silakan login untuk melanjutkan.
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label  style={{ textAlign: 'left' }} className="text-start">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ textAlign: 'left' }} // Rata kiri
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ textAlign: 'left' }} // Rata kiri
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Login'}
                </Button>
              </Form>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;