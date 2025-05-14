import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import NavAdmin from '../components/admin/NavAdmin';
import Footer from '../components/admin/Footer';
import DaftarMhs from '../components/admin/DaftarMhs';
import Verifikasi from '../components/admin/Verifikasi';
import Validasi from '../components/admin/Validasi';
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default sidebar terbuka

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar Admin */}
      <div className="position-relative">
        <Button
          variant="dark"
          className="border-0"
          style={{
            position: 'absolute',
            left: '10px',
            top: '10px',
            zIndex: 1050,
          }}
          onClick={toggleSidebar}
        >
          <FaBars />
        </Button>
        <NavAdmin />
      </div>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`sidebar-container bg-dark text-light ${
            isSidebarOpen ? 'd-block' : 'd-none'
          }`}
          style={{
            width: isSidebarOpen ? '250px' : '0',
            transition: 'width 0.3s',
          }}
        >
          <Sidebar />
        </div>

        {/* Konten Utama */}
        <div className="flex-grow-1">
          <div className="p-3">
            <Routes>
              <Route path="mahasiswa" element={<DaftarMhs />} />
              <Route path="verifikasi" element={<Verifikasi />} />
              <Route path="validasi" element={<Validasi />} />
              <Route
                path="*"
                element={<h4 className="text-center">Pilih menu di sidebar</h4>}
              />
            </Routes>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AdminPage;