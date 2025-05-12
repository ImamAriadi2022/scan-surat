import React, { useState } from 'react';
import { post } from '../services/api';

function UploadFrom() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Silakan pilih file terlebih dahulu.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setError(null);
      setMessage('');
      const response = await post('/upload', formData); // Ganti '/upload' dengan endpoint API Anda
      setMessage('File berhasil diunggah!');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mengunggah file.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Unggah File</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Pilih File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Unggah</button>
      </form>
      {message && (
        <div className="alert alert-success mt-3">
          {message}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
    </div>
  );
}

export default UploadFrom;