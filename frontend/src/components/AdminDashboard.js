import React, { useEffect, useState } from 'react';
import { get, del } from '../services/api';

function AdminDashboard() {
  const [surat, setSurat] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data surat
  useEffect(() => {
    async function fetchSurat() {
      try {
        const data = await get('/surat'); // Ganti '/surat' dengan endpoint API Anda
        setSurat(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSurat();
  }, []);

  // Fungsi untuk menghapus surat
  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus surat ini?')) {
      try {
        await del(`/surat/${id}`); // Ganti '/surat/:id' dengan endpoint API Anda
        setSurat(surat.filter((item) => item.id !== id));
        alert('Surat berhasil dihapus!');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Memuat data...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Surat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {surat.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;