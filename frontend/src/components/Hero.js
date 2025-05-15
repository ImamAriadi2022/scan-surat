import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-section bg-light py-5" style={{ height: '90vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="align-items-center">
          {/* Teks Hero */}
          <Col md={6} className="text-center text-md-start">
            <h1 className="display-4 fw-bold">Sistem Manajemen Surat</h1>
            <p className="text-muted">
              Kelola surat masuk dan keluar dengan mudah dan efisien. Sistem ini dirancang untuk membantu organisasi Anda 
              dalam mengelola dokumen secara digital dan terorganisir.
            </p>
            <Button as={Link} to="/login" variant="primary" className="me-2">
              Mulai Sekarang
            </Button>
          </Col>

          {/* Gambar atau Animasi */}
          <Col md={6} className="text-center">
            <img
              src="/img/hero.png" // Ganti dengan path gambar atau animasi Anda
              alt="Hero Illustration"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;