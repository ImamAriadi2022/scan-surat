import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

function Fitur() {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold" style={{ letterSpacing: 1 }}>Fitur Layanan Kemahasiswaan & Alumni</h2>
      <p className="text-center mb-5 text-muted" style={{ maxWidth: 700, margin: "0 auto" }}>
        Temukan kemudahan berbagai layanan administrasi kemahasiswaan dan alumni secara digital. Setiap fitur kami hadirkan untuk mendukung perjalanan akademik dan pengembangan diri Anda di lingkungan kampus. Berikut layanan yang tersedia di loket kemahasiswaan:
      </p>
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Surat Keterangan Masih Kuliah
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              Dapatkan surat resmi yang membuktikan status Anda sebagai mahasiswa aktif. Cocok untuk keperluan administrasi, beasiswa, atau kebutuhan lainnya.
            </div>
            <div className="mb-2">
              <strong>Prosedur:</strong> <br />
              Formulir dicetak sebanyak <b>2 lembar</b>.
            </div>
            <div>
              <strong>Syarat:</strong>
              <ul>
                <li>Fotokopi KP4 Orang Tua, Taspen, dan BPJS Kesehatan Mahasiswa (Pensiun PNS) <b>atau</b> Fotokopi Surat Keterangan Kerja Orang Tua (bagi swasta) tahun terbaru (1 lembar)</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Surat Keterangan Tidak Sedang Menerima Beasiswa
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              Surat ini membuktikan bahwa Anda tidak sedang menerima beasiswa lain, sebagai syarat pengajuan beasiswa baru atau kebutuhan administrasi lainnya.
            </div>
            <div className="mb-2">
              <strong>Prosedur:</strong> <br />
              Formulir dicetak sebanyak <b>2 lembar</b>.
            </div>
            <div>
              <strong>Syarat:</strong>
              <ul>
                <li>Fotokopi pemberitahuan tentang beasiswa yang ingin diajukan (1 lembar)</li>
                <li>Surat pengantar dari jurusan (1 lembar)</li>
                <li>Fotokopi Slip UKT Terakhir (1 lembar)</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Surat Keterangan Aktif Kuliah
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              Surat ini diperlukan untuk berbagai keperluan seperti beasiswa, pengurusan kehilangan KTM, Slip UKT, atau Sertifikat PKKMB.
            </div>
            <div className="mb-2">
              <strong>Prosedur:</strong> <br />
              Formulir dicetak sebanyak <b>2 lembar</b>.
            </div>
            <div>
              <strong>Syarat:</strong>
              <ul>
                <li>Fotokopi pemberitahuan tentang beasiswa yang ingin diajukan (khusus keperluan beasiswa, 1 lembar)</li>
                <li>Surat pengantar dari jurusan (1 lembar)</li>
                <li>Fotokopi Slip UKT terakhir (1 lembar)</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Surat Rekomendasi Beasiswa
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              Surat rekomendasi resmi dari kampus untuk mendukung pengajuan beasiswa Anda.
            </div>
            <div className="mb-2">
              <strong>Prosedur:</strong> <br />
              Formulir dicetak sebanyak <b>2 lembar</b>.
            </div>
            <div>
              <strong>Syarat:</strong>
              <ul>
                <li>Fotokopi pemberitahuan tentang beasiswa yang ingin diajukan (1 lembar)</li>
                <li>Surat pengantar dari jurusan (1 lembar)</li>
                <li>Fotokopi Slip UKT terakhir (1 lembar)</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Surat Rekomendasi Mengikuti Kompetisi
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              Surat dukungan resmi dari kampus untuk mahasiswa yang akan berpartisipasi dalam kompetisi tingkat nasional maupun internasional.
            </div>
            <div className="mb-2">
              <strong>Prosedur:</strong> <br />
              Formulir dicetak sebanyak <b>2 lembar</b>.
            </div>
            <div>
              <strong>Syarat:</strong>
              <ul>
                <li>Surat pengantar dari jurusan (1 lembar)</li>
                <li>Fotokopi Slip UKT Terakhir (1 lembar)</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            Proposal Kegiatan
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              Pengajuan proposal kegiatan mahasiswa yang sudah dicetak dan dijilid rapi, sebagai bentuk dokumentasi dan arsip di Subbagian Kemahasiswaan & Alumni.
            </div>
            <div>
              <strong>Syarat:</strong>
              <ul>
                <li>Proposal kegiatan yang sudah dicetak dan dijilid (1 rangkap untuk arsip di Subbag, KA)</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            Legalisir KTM
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              Layanan legalisir KTM untuk berbagai keperluan administrasi, pastikan fotokopi KTM Anda dalam kondisi utuh dan jelas.
            </div>
            <div>
              <strong>Syarat:</strong>
              <ul>
                <li>Fotokopi KTM dalam kertas HVS satu lembar utuh, jangan dipotong-potong (1 rangkap untuk arsip di Subbag, KA)</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            SKPI (Surat Keterangan Pendamping Ijazah)
          </Accordion.Header>
          <Accordion.Body className="text-start">
            <div className="mb-2">
              <strong>Deskripsi:</strong> <br />
              SKPI adalah dokumen pendamping ijazah yang menampilkan capaian pembelajaran dan aktivitas kemahasiswaan Anda selama studi.
            </div>
            <div className="mb-2">
              <strong>Prosedur:</strong> <br />
              Formulir dicetak <b>2 rangkap</b> dan wajib ditandatangani oleh mahasiswa yang bersangkutan.
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="text-center mt-5 text-muted" style={{ fontSize: 15 }}>
        <em>
          "Kami hadir untuk mendukung setiap langkah prestasi dan pengembangan diri Anda di dunia akademik. Manfaatkan layanan digital ini untuk proses yang lebih mudah, cepat, dan profesional."
        </em>
      </div>
    </Container>
  );
}

export default Fitur;