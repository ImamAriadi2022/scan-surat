import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMhs from '../components/mahasiswa/NavMhs';
import Sidebar from '../components/mahasiswa/Sidebar';
import Footer from '../components/mahasiswa/Footer';
import Wellcome from '../components/mahasiswa/Wellcome';
import Profil from '../components/mahasiswa/Profil';
import Input from '../components/mahasiswa/Input';
import Status from '../components/mahasiswa/Status';
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

function MahasiswaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Kontrol visibilitas sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <NavMhs />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          className={`sidebar-container bg-light text-dark ${
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
          {/* Tombol Hamburger */}
          <Button
            variant="light"
            className="border-0 shadow-sm m-2"
            onClick={toggleSidebar}
          >
            <FaBars />
          </Button>

          {/* Rute Halaman */}
          <div className="p-3">
            <Routes>
              <Route path="/" element={<Wellcome />} />
              <Route path="wellcome" element={<Wellcome />} />
              <Route path="profil" element={<Profil />} />
              <Route path="input" element={<Input />} />
              <Route path="status" element={<Status />} />
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

export default MahasiswaPage;