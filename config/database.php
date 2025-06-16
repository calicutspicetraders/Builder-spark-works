<?php
// Database configuration for Hostinger MySQL
define('DB_HOST', 'localhost');
define('DB_NAME', 'u272045696_zjbgK');
define('DB_USER', 'u272045696_ttPpR');
define('DB_PASS', ''); // Add your database password here

// Create connection
function getDBConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

// Session configuration
session_start();

// Security settings
ini_set('session.cookie_httponly', 1);
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_secure', 1);

// Application settings
define('SITE_URL', 'https://workspace.calicutspicetraders.com');
define('SITE_NAME', 'Calicut Spice Traders Workspace');
define('ADMIN_EMAIL', 'admin@calicutspicetraders.com');
?>
