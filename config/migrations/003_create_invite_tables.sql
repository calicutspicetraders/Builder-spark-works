-- Additional Invite System Tables for Hostinger
-- Analytics and monitoring tables

-- Invite analytics table (for tracking invite success rates)
CREATE TABLE IF NOT EXISTS invite_analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invite_id INT NOT NULL,
    event_type ENUM('sent', 'viewed', 'accepted', 'expired', 'revoked') NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    referrer VARCHAR(500) DEFAULT NULL,
    event_data JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_invite_id (invite_id),
    INDEX idx_event_type (event_type),
    INDEX idx_created_at (created_at),
    INDEX idx_event_date (event_type, created_at),
    FOREIGN KEY (invite_id) REFERENCES user_invites(id) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Login attempts table (security monitoring)
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT DEFAULT NULL,
    attempt_type ENUM('google_oauth', 'superadmin', 'api') NOT NULL,
    success BOOLEAN NOT NULL,
    failure_reason VARCHAR(255) DEFAULT NULL,
    invite_code VARCHAR(32) DEFAULT NULL,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_ip_address (ip_address),
    INDEX idx_attempted_at (attempted_at),
    INDEX idx_success (success),
    INDEX idx_type_success (attempt_type, success),
    INDEX idx_invite_code (invite_code)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- System logs table (performance and error monitoring)
CREATE TABLE IF NOT EXISTS system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_level ENUM('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL') NOT NULL,
    category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    context JSON DEFAULT NULL,
    user_id INT DEFAULT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    request_id VARCHAR(36) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_log_level (log_level),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id),
    INDEX idx_level_category (log_level, category),
    INDEX idx_request_id (request_id)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Performance metrics table (for monitoring)
CREATE TABLE IF NOT EXISTS performance_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,4) NOT NULL,
    metric_unit VARCHAR(20) NOT NULL,
    endpoint VARCHAR(255) DEFAULT NULL,
    user_id INT DEFAULT NULL,
    measured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_metric_name (metric_name),
    INDEX idx_measured_at (measured_at),
    INDEX idx_endpoint (endpoint),
    INDEX idx_name_date (metric_name, measured_at)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;
