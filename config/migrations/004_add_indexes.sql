-- Additional indexes for Hostinger optimization
-- Focus on query performance and storage efficiency

-- Add composite indexes for common query patterns
ALTER TABLE user_invites 
ADD INDEX idx_status_expires_email (status, expires_at, email),
ADD INDEX idx_created_by_date (created_by, created_at);

ALTER TABLE registered_users 
ADD INDEX idx_role_status (role, status),
ADD INDEX idx_department_role (department, role),
ADD INDEX idx_email_status (email, status);

ALTER TABLE user_sessions 
ADD INDEX idx_user_expires (user_id, expires_at),
ADD INDEX idx_token_expires (session_token, expires_at);

ALTER TABLE content_blocks 
ADD INDEX idx_page_active_pos (page, is_active, position),
ADD INDEX idx_type_page_active (type, page, is_active);

ALTER TABLE custom_plugins 
ADD INDEX idx_active_type_name (is_active, type, name);

ALTER TABLE media_files 
ADD INDEX idx_type_archived (file_type, is_archived),
ADD INDEX idx_size_type (file_size, file_type);

-- Add full-text indexes for search functionality
ALTER TABLE content_blocks ADD FULLTEXT(name);
ALTER TABLE custom_plugins ADD FULLTEXT(name, description);
ALTER TABLE registered_users ADD FULLTEXT(full_name);

-- Create materialized view equivalent for analytics (using table)
CREATE TABLE IF NOT EXISTS user_stats_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metric_date DATE NOT NULL,
    total_users INT DEFAULT 0,
    active_users INT DEFAULT 0,
    new_registrations INT DEFAULT 0,
    pending_invites INT DEFAULT 0,
    accepted_invites INT DEFAULT 0,
    login_attempts INT DEFAULT 0,
    successful_logins INT DEFAULT 0,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY idx_metric_date (metric_date),
    INDEX idx_calculated_at (calculated_at)
) ENGINE=InnoDB;

-- Create summary table for dashboard performance
CREATE TABLE IF NOT EXISTS dashboard_summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    summary_type VARCHAR(50) NOT NULL,
    summary_data JSON NOT NULL,
    valid_until TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type_valid (summary_type, valid_until),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;
