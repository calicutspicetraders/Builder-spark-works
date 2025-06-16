<?php
require_once 'config/database.php';

function login($email, $password) {
    $pdo = getDBConnection();
    $sql = "SELECT * FROM users WHERE email = ? AND status = 'active'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['full_name'] = $user['full_name'];
        $_SESSION['role'] = $user['role'];
        
        // Log activity
        logActivity($user['id'], 'login', 'User logged in');
        
        return true;
    }
    return false;
}

function logout() {
    if (isset($_SESSION['user_id'])) {
        logActivity($_SESSION['user_id'], 'logout', 'User logged out');
    }
    session_destroy();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit();
    }
}

function hasRole($role) {
    return isset($_SESSION['role']) && $_SESSION['role'] === $role;
}

function requireRole($role) {
    requireLogin();
    if (!hasRole($role)) {
        header('Location: dashboard.php');
        exit();
    }
}

function getCurrentUser() {
    if (!isLoggedIn()) return null;
    
    $pdo = getDBConnection();
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function logActivity($userId, $type, $description, $metadata = null) {
    $pdo = getDBConnection();
    $sql = "INSERT INTO workspace_activities (user_id, activity_type, description, metadata) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId, $type, $description, json_encode($metadata)]);
}

function createUser($username, $email, $password, $fullName, $role = 'user') {
    $pdo = getDBConnection();
    
    // Check if user already exists
    $sql = "SELECT COUNT(*) FROM users WHERE username = ? OR email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$username, $email]);
    if ($stmt->fetchColumn() > 0) {
        return false; // User already exists
    }
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$username, $email, $hashedPassword, $fullName, $role]);
}

function updateUserStatus($userId, $status) {
    $pdo = getDBConnection();
    $sql = "UPDATE users SET status = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$status, $userId]);
}

function getAllUsers() {
    $pdo = getDBConnection();
    $sql = "SELECT id, username, email, full_name, role, status, created_at FROM users ORDER BY created_at DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getRecentActivities($limit = 10) {
    $pdo = getDBConnection();
    $sql = "SELECT wa.*, u.full_name, u.username 
            FROM workspace_activities wa 
            JOIN users u ON wa.user_id = u.id 
            ORDER BY wa.created_at DESC 
            LIMIT ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$limit]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
