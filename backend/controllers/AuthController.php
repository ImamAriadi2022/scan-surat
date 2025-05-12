<?php
require_once __DIR__ . '/../models/User.php';

class AuthController {
    private $user;

    public function __construct($db) {
        $this->user = new User($db);
    }

    public function login($username, $password) {
        $data = $this->user->login($username, $password);

        if ($data && hash('sha256', $password) === $data['password']) {
            session_start();
            $_SESSION['user_id'] = $data['id'];
            $_SESSION['role'] = $data['role'];
            return [
                'status' => 'success',
                'message' => 'Login berhasil',
                'role' => $data['role'],
                'user_id' => $data['id']
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Username atau password salah'
        ];
    }

    public function logout() {
        session_start();
        session_destroy();
        return ['status' => 'success', 'message' => 'Logout berhasil'];
    }
}
