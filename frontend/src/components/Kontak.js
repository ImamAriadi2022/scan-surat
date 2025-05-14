import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Kontak() {
  return (
    <div className="kontak-section bg-light py-5">
      <Container>
        <h2 className="text-center mb-4">Hubungi Kami</h2>
        <Row className="align-items-center">
          {/* Informasi Kontak */}
          <Col md={6} className="text-center text-md-start">
            <p className="text-muted">
              Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi kami melalui informasi berikut:
            </p>
            <ul className="list-unstyled">
              <li><strong>Email:</strong> support@manajemensurat.com</li>
              <li><strong>Telepon:</strong> +62 812-3456-7890</li>
              <li><strong>Alamat:</strong> Jl. Contoh No. 123, Jakarta, Indonesia</li>
            </ul>
          </Col>

          {/* Formulir Kontak */}
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Masukkan nama Anda" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Masukkan email Anda" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Pesan</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Tulis pesan Anda di sini" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Kirim Pesan
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Kontak;