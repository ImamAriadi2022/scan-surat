import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavMhs() {
  const handleLogout = () => {
    // Tambahkan logika logout di sini, misalnya menghapus token dari localStorage
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect ke halaman login
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/mahasiswa/wellcome" style={{ fontWeight: 'bold', color: '#007bff' }}>
          Sistem Mahasiswa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="outline-primary" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMhs;