import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function Input() {
  const [files, setFiles] = useState({
    berkas1: null,
    berkas2: null,
    berkas3: null,
    suratKeterangan: null,
  });

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: uploadedFiles[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi pengiriman data
    console.log('Files uploaded:', files);
    alert('File berhasil diunggah!');
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Unggah Berkas</h2>
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