<?php
require_once '../config/database.php';

// Database setup script
try {
    $pdo = getDBConnection();
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role ENUM('superadmin', 'admin', 'partner', 'user') DEFAULT 'user',
        status ENUM('active', 'inactive') DEFAULT 'active',
        avatar VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    
    // Create workspace_activities table
    $sql = "CREATE TABLE IF NOT EXISTS workspace_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        activity_type VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        metadata JSON DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )";
    $pdo->exec($sql);
    
    // Create documents table
    $sql = "CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        file_path VARCHAR(500) NOT NULL,
        file_size INT NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        uploaded_by INT NOT NULL,
        category VARCHAR(50) DEFAULT 'general',
        access_level ENUM('public', 'partners', 'admin') DEFAULT 'partners',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
    )";
    $pdo->exec($sql);
    
    // Create messages table for communication
    $sql = "CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT DEFAULT NULL,
        message TEXT NOT NULL,
        message_type ENUM('direct', 'broadcast', 'announcement') DEFAULT 'direct',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
    )";
    $pdo->exec($sql);
    
    // Create export_shipments table
    $sql = "CREATE TABLE IF NOT EXISTS export_shipments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shipment_id VARCHAR(50) UNIQUE NOT NULL,
        destination VARCHAR(100) NOT NULL,
        product VARCHAR(200) NOT NULL,
        quantity VARCHAR(50) NOT NULL,
        status ENUM('preparing', 'in_transit', 'customs', 'delivered') DEFAULT 'preparing',
        eta DATE,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
    )";
    $pdo->exec($sql);
    
    // Insert default superadmin user
    $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $sql = "INSERT IGNORE INTO users (username, email, password, full_name, role) 
            VALUES ('superadmin', 'admin@calicutspicetraders.com', ?, 'Super Administrator', 'superadmin')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$hashedPassword]);
    
    // Insert sample partner users
    $partners = [
        ['rajesh_kumar', 'rajesh@calicutspicetraders.com', 'Rajesh Kumar', 'partner'],
        ['priya_nair', 'priya@calicutspicetraders.com', 'Priya Nair', 'partner'],
        ['mohammed_ali', 'mohammed@calicutspicetraders.com', 'Mohammed Ali', 'partner'],
        ['suresh_menon', 'suresh@calicutspicetraders.com', 'Suresh Menon', 'partner'],
        ['lakshmi_pillai', 'lakshmi@calicutspicetraders.com', 'Lakshmi Pillai', 'partner']
    ];
    
    foreach ($partners as $partner) {
        $defaultPassword = password_hash('partner123', PASSWORD_DEFAULT);
        $sql = "INSERT IGNORE INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$partner[0], $partner[1], $defaultPassword, $partner[2], $partner[3]]);
    }
    
    // Insert sample shipments
    $shipments = [
        ['SP-2024-001', 'Dubai, UAE', 'Cardamom (AAA Grade)', '5.2 MT', 'in_transit', '2024-12-28'],
        ['SP-2024-002', 'London, UK', 'Black Pepper', '3.8 MT', 'customs', '2024-12-30'],
        ['SP-2024-003', 'Kuwait City', 'Turmeric Powder', '7.1 MT', 'delivered', '2024-12-25']
    ];
    
    foreach ($shipments as $shipment) {
        $sql = "INSERT IGNORE INTO export_shipments (shipment_id, destination, product, quantity, status, eta, created_by) 
                VALUES (?, ?, ?, ?, ?, ?, 1)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($shipment);
    }
    
    echo "✅ Database setup completed successfully!<br>";
    echo "📊 Tables created: users, workspace_activities, documents, messages, export_shipments<br>";
    echo "👤 Default superadmin created: admin@calicutspicetraders.com (password: admin123)<br>";
    echo "🤝 Sample partner accounts created (password: partner123)<br>";
    echo "📦 Sample shipment data added<br><br>";
    echo "<strong>⚠️ Important:</strong> Please change default passwords after first login!<br>";
    echo "<a href='../index.php'>Go to Workspace</a>";
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
