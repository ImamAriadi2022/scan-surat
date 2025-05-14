import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }} className="py-3 mt-auto shadow-sm">
      <div className="text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Sistem Manajemen Surat. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}

export default Footer;