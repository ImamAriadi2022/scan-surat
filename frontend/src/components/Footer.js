import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          {/* Informasi Hak Cipta */}
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Sistem Manajemen Surat. Semua Hak Dilindungi.
            </p>
          </Col>

          {/* Navigasi Footer */}
          <Col md={6} className="text-center text-md-end">
            <Link to="/about" className="text-light me-3">
              Tentang
            </Link>
            <Link to="/contact" className="text-light me-3">
              Kontak
            </Link>
            <Link to="/privacy" className="text-light">
              Kebijakan Privasi
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;