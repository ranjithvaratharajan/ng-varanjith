<?php
require_once 'database.php';
require_once 'lib/php-jwt/src/JWT.php';
use Firebase\JWT\JWT;

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required']);
    exit;
}

$stmt = $conn->prepare("SELECT id, username, password FROM admins WHERE username = ?");
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
    exit;
}
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if ($user && password_verify($password, $user['password'])) {
    $payload = [
        'iat' => time(),
        'exp' => time() + (60 * 60), // 1 hour expiration
        'sub' => $user['id'],
        'username' => $user['username']
    ];
    $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');
    echo json_encode(['token' => $jwt, 'message' => 'Login successful']);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
?>
