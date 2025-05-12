function generateToken($id) {
    $salt = "@secureSalt";
    return hash('sha256', $id . time() . $salt);
}

function sanitize($input) {
    return htmlspecialchars(trim($input));
}