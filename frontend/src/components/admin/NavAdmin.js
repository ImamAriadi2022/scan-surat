import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavAdmin() {
  const handleLogout = () => {
    // Tambahkan logika logout di sini, misalnya menghapus token dari localStorage
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect ke halaman login
  };

  return (
    <Navbar style={{ backgroundColor: '#f8f9fa' }} variant="light" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand style={{ color: '#007bff', fontWeight: 'bold' }}>Administration</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-primary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavAdmin;