$request = $_SERVER['REQUEST_URI'];
switch ($request) {
    case '/api/login':
        require __DIR__ . '/api/login.php';
        break;
    case '/api/upload':
        require __DIR__ . '/api/upload_berkas.php';
        break;
    case '/api/verifikasi':
        require __DIR__ . '/api/verifikasi.php';
        break;
    case '/api/scan_qr':
        require __DIR__ . '/api/scan_qr.php';
        break;
    case '/api/status':
        require __DIR__ . '/api/get_status.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['message' => 'Endpoint not found']);
        break;
}
// config/db.php