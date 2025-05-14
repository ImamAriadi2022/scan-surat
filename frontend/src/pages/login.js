import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

function LoginPage() {
  const [activeTab, setActiveTab] = useState('login'); // Tab aktif (login/daftar)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async ({ username, password }) => {
    try {
      setError(null);
      setIsLoading(true);

      // Simulasi permintaan login ke server
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login gagal. Periksa kembali kredensial Anda.');
      }

      const { token } = await response.json();

      if (!token) {
        throw new Error('Token tidak ditemukan. Login gagal.');
      }

      // Simpan token ke localStorage
      localStorage.setItem('token', token);

      // Redirect ke halaman admin
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async ({ username, password }) => {
    try {
      setError(null);
      setIsLoading(true);

      // Simulasi permintaan register ke server
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Pendaftaran gagal. Periksa kembali data Anda.');
      }

      alert('Pendaftaran berhasil. Silakan login.');
      setActiveTab('login');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat pendaftaran.');
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
              <Nav variant="tabs" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="register">Daftar</Nav.Link>
                </Nav.Item>
              </Nav>
              <div className="mt-4">
                {error && <Alert variant="danger">{error}</Alert>}
                {activeTab === 'login' ? (
                  <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                ) : (
                  <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
                )}
              </div>
              <div className="text-center mt-4">
                <Link to="/">
                  <Button variant="link">Kembali ke Halaman Utama</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;