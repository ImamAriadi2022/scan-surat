import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaFileUpload, FaClipboardList } from 'react-icons/fa';


function Sidebar() {
  return (
    <div className="sidebar bg-light text-dark vh-100 shadow-sm">
      <div className="sidebar-header text-center py-4">
        <FaHome size={40} className="mb-2 text-primary" />
        <h4>Mahasiswa</h4>
      </div>
      <div className="sidebar-menu">
        <ul className="list-unstyled">
          <li className="py-2 px-3">
            <Link to="/mahasiswa/wellcome" className="text-dark text-decoration-none d-flex align-items-center">
              <FaHome className="me-2" />
              Halaman Utama
            </Link>
          </li>
          <li className="py-2 px-3">
            <Link to="/mahasiswa/profil" className="text-dark text-decoration-none d-flex align-items-center">
              <FaUser className="me-2" />
              Profil
            </Link>
          </li>
          <li className="py-2 px-3">
            <Link to="/mahasiswa/input" className="text-dark text-decoration-none d-flex align-items-center">
              <FaFileUpload className="me-2" />
              Unggah Berkas
            </Link>
          </li>
          <li className="py-2 px-3">
            <Link to="/mahasiswa/status" className="text-dark text-decoration-none d-flex align-items-center">
              <FaClipboardList className="me-2" />
              Status Verifikasi
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;