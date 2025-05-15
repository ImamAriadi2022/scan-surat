import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Tentang() {
  return (
    <div className="tentang-section bg-light py-5">
      <Container>
        <h2 className="text-center mb-4">Tentang Kami</h2>
        <Row className="align-items-center">
          {/* Deskripsi Tentang Kami */}
          <Col md={6} className="text-center text-md-start">
            <p className="text-muted">
              <strong>Sistem Manajemen Surat</strong> adalah platform digital yang dirancang untuk membantu organisasi 
              dalam mengelola surat masuk dan keluar secara efisien. Dengan sistem ini, Anda dapat menyimpan, melacak, 
              dan mendistribusikan dokumen dengan mudah, sehingga meningkatkan produktivitas dan mengurangi risiko kehilangan data.
            </p>
            <p className="text-muted">
              Kami berkomitmen untuk menyediakan solusi yang aman, cepat, dan mudah digunakan untuk memenuhi kebutuhan 
              pengelolaan dokumen Anda.
            </p>
          </Col>

          {/* Gambar atau Ilustrasi */}
          <Col md={6} className="text-center">
            <img
              src="/img/about.png" // Ganti dengan path gambar atau ilustrasi Anda
              alt="Tentang Kami Illustration"
              className="img-fluid"
            />
          </Col>
        </Row>

        {/* Nilai atau Keunggulan */}
        <Row className="mt-5 g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Efisiensi</Card.Title>
                <Card.Text>
                  Mengelola dokumen dengan cepat dan mudah, menghemat waktu dan tenaga.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Keamanan</Card.Title>
                <Card.Text>
                  Data Anda disimpan dengan aman menggunakan teknologi terkini.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Kemudahan</Card.Title>
                <Card.Text>
                  Antarmuka yang sederhana dan mudah digunakan oleh semua pengguna.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Tentang;