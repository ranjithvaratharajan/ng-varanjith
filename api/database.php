<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db_host = 'localhost';
$db_username = 'varanjit_admin';
$db_password = 'Bh@r@thi1994v1';
$db_name = 'varanjit_db';

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

define('JWT_SECRET', 'your_secret_key_32_chars_minimum'); // Replace with a strong key

function verifyJWT() {
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? '';

    if (!preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
        http_response_code(401);
        echo json_encode(['error' => 'No token provided']);
        exit;
    }

    $jwt = $matches[1];
    try {
        require_once 'lib/php-jwt/src/JWT.php';
        require_once 'lib/php-jwt/src/Key.php';
        $decoded = Firebase\JWT\JWT::decode($jwt, new Firebase\JWT\Key(JWT_SECRET, 'HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token: ' . $e->getMessage()]);
        exit;
    }
}
?>
