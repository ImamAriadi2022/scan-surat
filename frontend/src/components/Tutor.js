import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Tutor() {
  return (
    <div className="tutor-section bg-white py-5">
      <Container>
        <h2 className="text-center mb-4">Cara Kerja Aplikasi</h2>
        <Row className="g-4">
          {/* Poin 1 */}
          <Col md={3} sm={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                <Card.Text>
                  Pengguna login ke sistem menggunakan akun yang telah terdaftar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Poin 2 */}
          <Col md={3} sm={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Surat Masuk</Card.Title>
                <Card.Text>
                  Surat masuk diunggah dan disimpan dalam sistem untuk didistribusikan ke pihak terkait.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Poin 3 */}
          <Col md={3} sm={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Surat Keluar</Card.Title>
                <Card.Text>
                  Surat keluar dibuat, disetujui, dan dikirim melalui sistem.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Poin 4 */}
          <Col md={3} sm={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Penyimpanan Data</Card.Title>
                <Card.Text>
                  Semua data surat tersimpan dengan aman dan dapat diakses kapan saja.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Tutor;