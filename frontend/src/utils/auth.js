// Simpan token ke localStorage
export function login(token) {
  localStorage.setItem('authToken', token);
}

// Hapus token dari localStorage
export function logout() {
  localStorage.removeItem('authToken');
}

// Periksa apakah pengguna sudah login
export function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

// Dapatkan token autentikasi
export function getToken() {
  return localStorage.getItem('authToken');
}