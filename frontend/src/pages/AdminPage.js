import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import UploadFrom from '../components/UploadFrom';

function AdminPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Halaman Admin</h1>
      <div className="mt-4">
        <h2>Dashboard</h2>
        <AdminDashboard />
      </div>
      <div className="mt-5">
        <h2>Unggah File</h2>
        <UploadFrom />
      </div>
    </div>
  );
}

export default AdminPage;