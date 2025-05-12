import { getToken } from '../utils/auth';

const BASE_URL = 'https://api.example.com'; // Ganti dengan URL API Anda

// Fungsi untuk membuat header dengan token autentikasi
function getHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Fungsi untuk melakukan GET request
export async function get(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

// Fungsi untuk melakukan POST request
export async function post(endpoint, data) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// Fungsi untuk melakukan PUT request
export async function put(endpoint, data) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

// Fungsi untuk melakukan DELETE request
export async function del(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
}

// Fungsi untuk menangani respons dari server
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Terjadi kesalahan pada server');
  }
  return response.json();
}