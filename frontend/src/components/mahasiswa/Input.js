import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

function Input() {
  const [files, setFiles] = useState({
    berkas1: null,
    berkas2: null,
    berkas3: null,
    suratKeterangan: null,
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: uploadedFiles[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    // Ambil user_id dari localStorage
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User ID tidak ditemukan. Silakan login ulang.');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userId); // Tambahkan user_id ke formData
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/InputPdf.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Backend Response:', result); // Debugging respons backend

      if (response.ok) {
        setSuccess('File berhasil diunggah!');
        setFiles({
          berkas1: null,
          berkas2: null,
          berkas3: null,
          suratKeterangan: null,
        });
      } else {
        setError(result.error || 'Gagal mengunggah file.');
      }
    } catch (err) {
      console.error('Fetch Error:', err); // Debugging error fetch
      setError('Gagal terhubung ke server.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Unggah Berkas</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="berkas1">
              <Form.Label>Berkas 1</Form.Label>
              <Form.Control
                type="file"
                name="berkas1"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="berkas2">
              <Form.Label>Berkas 2</Form.Label>
              <Form.Control
                type="file"
                name="berkas2"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="berkas3">
              <Form.Label>Berkas 3</Form.Label>
              <Form.Control
                type="file"
                name="berkas3"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="suratKeterangan">
              <Form.Label>Surat Keterangan Masih Kuliah</Form.Label>
              <Form.Control
                type="file"
                name="suratKeterangan"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Unggah Berkas
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Input;