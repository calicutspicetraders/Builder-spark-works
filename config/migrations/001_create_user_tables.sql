-- User Tables Migration for Hostinger
-- Optimized for 3GB storage limit and 25 connection limit

-- User invites table (optimized)
CREATE TABLE IF NOT EXISTS user_invites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invite_code VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) DEFAULT NULL,
    department VARCHAR(50) DEFAULT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    status ENUM('pending', 'accepted', 'expired', 'revoked') DEFAULT 'pending',
    expires_at TIMESTAMP NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP NULL,
    metadata JSON DEFAULT NULL,
    INDEX idx_invite_code (invite_code),
    INDEX idx_email (email),
    INDEX idx_status_expires (status, expires_at),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Registered users table (optimized)
CREATE TABLE IF NOT EXISTS registered_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    given_name VARCHAR(255) DEFAULT NULL,
    family_name VARCHAR(255) DEFAULT NULL,
    picture VARCHAR(500) DEFAULT NULL,
    department VARCHAR(50) DEFAULT NULL,
    job_title VARCHAR(255) DEFAULT NULL,
    role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
    status ENUM('active', 'suspended', 'pending') DEFAULT 'active',
    invite_code VARCHAR(32) DEFAULT NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    preferences JSON DEFAULT NULL,
    INDEX idx_google_id (google_id),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_last_login (last_login),
    INDEX idx_invite_code (invite_code),
    FOREIGN KEY (invite_code) REFERENCES user_invites(invite_code) ON DELETE SET NULL
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Session tokens table (optimized for cleanup)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    INDEX idx_session_token (session_token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_last_activity (last_activity),
    FOREIGN KEY (user_id) REFERENCES registered_users(id) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;
