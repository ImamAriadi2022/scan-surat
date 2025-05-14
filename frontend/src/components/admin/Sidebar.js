import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaCheckCircle, FaUniversity, FaClipboardCheck } from 'react-icons/fa';
import './sidebar.css'; // Tambahkan file CSS untuk styling sidebar

function Sidebar() {
  return (
    <div className="sidebar bg-dark text-light vh-100">
      <div className="sidebar-header text-center py-4">
        <FaUniversity size={40} className="mb-2" />
        <h4>Sistem Admin</h4>
      </div>
      <div className="sidebar-menu">
        <ul className="list-unstyled">
          <li className="py-2 px-3">
            <Link to="/admin/mahasiswa" className="text-light text-decoration-none d-flex align-items-center">
              <FaUserGraduate className="me-2" />
              Daftar Mahasiswa
            </Link>
          </li>
          <li className="py-2 px-3">
            <Link to="/admin/validasi" className="text-light text-decoration-none d-flex align-items-center">
              <FaClipboardCheck className="me-2" />
              Validasi
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;