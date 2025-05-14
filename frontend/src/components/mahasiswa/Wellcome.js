import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUserGraduate, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

function Wellcome() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="mb-4">Selamat Datang, Mahasiswa!</h1>
          <p className="lead">
            Selamat datang di Sistem Manajemen Surat. Di sini, Anda dapat mengelola berkas, memantau status verifikasi, dan memastikan semua dokumen Anda terorganisir dengan baik.
          </p>
          <Button variant="primary" className="mt-3" href="/mahasiswa/profil">
            Lihat Profil Anda
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaUserGraduate size={50} className="text-primary mb-3" />
              <Card.Title>Profil Mahasiswa</Card.Title>
              <Card.Text>
                Perbarui informasi pribadi Anda dan unggah foto profil untuk identitas yang lebih baik.
              </Card.Text>
              <Button variant="outline-primary" href="/mahasiswa/profil">
                Kelola Profil
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaFileAlt size={50} className="text-success mb-3" />
              <Card.Title>Unggah Berkas</Card.Title>
              <Card.Text>
                Unggah dokumen penting Anda untuk diverifikasi oleh admin.
              </Card.Text>
              <Button variant="outline-success" href="/mahasiswa/input">
                Unggah Berkas
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaCheckCircle size={50} className="text-warning mb-3" />
              <Card.Title>Status Verifikasi</Card.Title>
              <Card.Text>
                Pantau status verifikasi dokumen Anda dan lihat respon dari admin.
              </Card.Text>
              <Button variant="outline-warning" href="/mahasiswa/status">
                Lihat Status
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Wellcome;