import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi halaman

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/scan-surat/backend/api/auth.php?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log('Backend Response:', result); // Debugging respons backend

      if (response.ok) {
        setSuccess('Login berhasil!');
        // Simpan informasi login ke localStorage
        localStorage.setItem('user_id', result.user_id); // Simpan user_id
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        localStorage.setItem('username', result.username);

        // Redirect berdasarkan role
        if (result.role === 'admin') {
          navigate('/admin'); // Arahkan ke halaman admin
        } else if (result.role === 'mahasiswa') {
          navigate('/mahasiswa'); // Arahkan ke halaman mahasiswa
        } else {
          setError('Role tidak dikenali.');
        }
      } else {
        setError(result.error || 'Terjadi kesalahan saat login.');
      }
    } catch (err) {
      console.error('Fetch Error:', err); // Debugging error fetch
      setError('Gagal terhubung ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputGroup>
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
        {isLoading ? 'Memproses...' : 'Login'}
      </Button>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mt-3">
          {success}
        </Alert>
      )}
    </Form>
  );
}

export default LoginForm;