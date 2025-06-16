<?php
// Simple test endpoint to verify API is working
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

echo json_encode([
    'status' => 'success',
    'message' => 'API is working correctly',
    'timestamp' => date('c'),
    'endpoints' => [
        'preview' => '/api/superadmin/preview',
        'content-manager' => '/api/superadmin/content-manager'
    ]
]);
?>
