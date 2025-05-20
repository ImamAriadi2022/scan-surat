import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';

const suratOptions = [
  {
    value: 'masihKuliah',
    label: 'Surat Keterangan Masih Kuliah',
    syarat: [
      'Fotokopi KP4 Orang Tua, Taspen, dan BPJS Kesehatan Mahasiswa (Pensiun PNS) atau Fotokopi Surat Keterangan Kerja Orang Tua (bagi swasta) tahun terbaru (1 lembar)',
    ],
    fields: [
      { name: 'berkas1', label: 'Fotokopi Syarat', required: true },
    ],
  },
  {
    value: 'tidakBeasiswa',
    label: 'Surat Keterangan Tidak Sedang Menerima Beasiswa',
    syarat: [
      'Fotokopi pemberitahuan tentang beasiswa yang ingin diajukan (1 lembar)',
      'Surat pengantar dari jurusan (1 lembar)',
      'Fotokopi Slip UKT Terakhir (1 lembar)',
    ],
    fields: [
      { name: 'berkas1', label: 'Fotokopi Pemberitahuan Beasiswa', required: true },
      { name: 'berkas2', label: 'Surat Pengantar Jurusan', required: true },
      { name: 'berkas3', label: 'Fotokopi Slip UKT Terakhir', required: true },
    ],
  },
  {
    value: 'aktifKuliah',
    label: 'Surat Keterangan Aktif Kuliah',
    syarat: [
      'Fotokopi pemberitahuan tentang beasiswa yang ingin diajukan (khusus keperluan beasiswa, 1 lembar)',
      'Surat pengantar dari jurusan (1 lembar)',
      'Fotokopi Slip UKT terakhir (1 lembar)',
    ],
    fields: [
      { name: 'berkas1', label: 'Fotokopi Pemberitahuan Beasiswa', required: false },
      { name: 'berkas2', label: 'Surat Pengantar Jurusan', required: true },
      { name: 'berkas3', label: 'Fotokopi Slip UKT Terakhir', required: true },
    ],
  },
  {
    value: 'rekomBeasiswa',
    label: 'Surat Rekomendasi Beasiswa',
    syarat: [
      'Fotokopi pemberitahuan tentang beasiswa yang ingin diajukan (1 lembar)',
      'Surat pengantar dari jurusan (1 lembar)',
      'Fotokopi Slip UKT terakhir (1 lembar)',
    ],
    fields: [
      { name: 'berkas1', label: 'Fotokopi Pemberitahuan Beasiswa', required: true },
      { name: 'berkas2', label: 'Surat Pengantar Jurusan', required: true },
      { name: 'berkas3', label: 'Fotokopi Slip UKT Terakhir', required: true },
    ],
  },
  {
    value: 'rekomKompetisi',
    label: 'Surat Rekomendasi Mengikuti Kompetisi',
    syarat: [
      'Surat pengantar dari jurusan (1 lembar)',
      'Fotokopi Slip UKT Terakhir (1 lembar)',
    ],
    fields: [
      { name: 'berkas1', label: 'Surat Pengantar Jurusan', required: true },
      { name: 'berkas2', label: 'Fotokopi Slip UKT Terakhir', required: true },
    ],
  },
  {
    value: 'proposalKegiatan',
    label: 'Proposal Kegiatan',
    syarat: [
      'Proposal kegiatan yang sudah dicetak dan dijilid (1 rangkap untuk arsip di Subbag, KA)',
    ],
    fields: [
      { name: 'berkas1', label: 'Proposal Kegiatan (PDF)', required: true },
    ],
  },
  {
    value: 'legalisirKTM',
    label: 'Legalisir KTM',
    syarat: [
      'Fotokopi KTM dalam kertas HVS satu lembar utuh, jangan dipotong-potong (1 rangkap untuk arsip di Subbag, KA)',
    ],
    fields: [
      { name: 'berkas1', label: 'Fotokopi KTM (PDF)', required: true },
    ],
  },
  {
    value: 'skpi',
    label: 'SKPI (Surat Keterangan Pendamping Ijazah)',
    syarat: [
      'Form SKPI yang sudah ditandatangani oleh mahasiswa ybs (2 rangkap)',
    ],
    fields: [
      { name: 'berkas1', label: 'Form SKPI (PDF)', required: true },
    ],
  },
];

function Input() {
  const [selectedSurat, setSelectedSurat] = useState('');
  const [files, setFiles] = useState({});
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [hasOldBerkas, setHasOldBerkas] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah pernah upload berkas sebelumnya
    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    fetch(`http://localhost/scan-surat/backend/api/action.php?action=getStatus&user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setHasOldBerkas(true);
        } else {
          setHasOldBerkas(false);
        }
      })
      .catch(() => setHasOldBerkas(false));
  }, []);

  const handleSuratChange = (e) => {
    setSelectedSurat(e.target.value);
    setFiles({});
    setSuccess(null);
    setError(null);
  };

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

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User ID tidak ditemukan. Silakan login ulang.');
      return;
    }

    if (!selectedSurat) {
      setError('Silakan pilih jenis surat terlebih dahulu.');
      return;
    }

    const surat = suratOptions.find((s) => s.value === selectedSurat);
    // Validasi file wajib
    for (const field of surat.fields) {
      if (field.required && !files[field.name]) {
        setError(`Berkas "${field.label}" wajib diunggah.`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('jenis_surat', selectedSurat);
    surat.fields.forEach((field) => {
      if (files[field.name]) {
        formData.append(field.name, files[field.name]);
      }
    });

    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/InputPdf.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('File berhasil diunggah!');
        setFiles({});
        setSelectedSurat('');
        setHasOldBerkas(true);
      } else {
        setError(result.error || 'Gagal mengunggah file.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    }
  };

  const surat = suratOptions.find((s) => s.value === selectedSurat);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">Unggah Berkas Layanan</h2>
      {hasOldBerkas && (
        <Alert variant="warning" className="text-center">
          <strong>Catatan:</strong> Jika Anda menginputkan berkas baru, maka <u>seluruh berkas lama</u> (baik yang sudah di-ACC maupun yang ditolak) akan <b>dihapus dari database</b>.
        </Alert>
      )}
      <p className="text-center text-muted mb-4" style={{ maxWidth: 700, margin: "0 auto" }}>
        Pilih jenis layanan surat yang Anda butuhkan, kemudian lengkapi dan unggah seluruh persyaratan sesuai petunjuk. Pastikan seluruh dokumen dalam format PDF dan sesuai ketentuan agar proses administrasi berjalan lancar.
      </p>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Form.Group controlId="jenisSurat" className="mb-3">
              <Form.Label className="fw-semibold">Pilih Jenis Surat</Form.Label>
              <Form.Select value={selectedSurat} onChange={handleSuratChange} required>
                <option value="">-- Pilih Surat --</option>
                {suratOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Form.Select>
            </Form.Group>
            {surat && (
              <>
                <div className="mb-3">
                  <strong>Persyaratan:</strong>
                  <ul className="mb-2 text-start" style={{ textAlign: "left" }}>
                    {surat.syarat.map((syarat, idx) => (
                      <li key={idx}>{syarat}</li>
                    ))}
                  </ul>
                </div>
                <Row>
                  {surat.fields.map((field) => (
                    <Col md={6} key={field.name} className="mb-3">
                      <Form.Group controlId={field.name}selur>
                        <Form.Label>{field.label} {field.required && <span className="text-danger">*</span>}</Form.Label>
                        <Form.Control
                          type="file"
                          name={field.name}
                          accept="application/pdf"
                          onChange={handleFileChange}
                          required={field.required}
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Card.Body>
        </Card>
        <div className="text-center">
          <Button variant="primary" type="submit" disabled={!selectedSurat}>
            Unggah Berkas
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Input;