-- Content Management Tables Migration for Hostinger
-- Optimized for 3GB storage and performance

-- Content blocks table (optimized)
CREATE TABLE IF NOT EXISTS content_blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('text', 'image', 'logo', 'plugin', 'custom') NOT NULL,
    name VARCHAR(255) NOT NULL,
    content JSON NOT NULL,
    page VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_page_position (page, position),
    INDEX idx_type_active (type, is_active),
    INDEX idx_active_updated (is_active, updated_at),
    INDEX idx_name (name)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Custom plugins table (optimized)
CREATE TABLE IF NOT EXISTS custom_plugins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    code LONGTEXT NOT NULL,
    type ENUM('component', 'script', 'style') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    pages JSON DEFAULT NULL,
    version VARCHAR(50) DEFAULT '1.0.0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type_active (type, is_active),
    INDEX idx_name (name),
    INDEX idx_active_updated (is_active, updated_at),
    INDEX idx_version (version)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Media files table (optimized for Hostinger)
CREATE TABLE IF NOT EXISTS media_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_type ENUM('image', 'document', 'logo', 'icon') NOT NULL,
    dimensions JSON DEFAULT NULL,
    alt_text VARCHAR(255) DEFAULT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_archived BOOLEAN DEFAULT FALSE,
    archive_date TIMESTAMP NULL,
    INDEX idx_file_type (file_type),
    INDEX idx_mime_type (mime_type),
    INDEX idx_uploaded_at (uploaded_at),
    INDEX idx_stored_name (stored_name),
    INDEX idx_archived (is_archived, archive_date),
    INDEX idx_file_size (file_size)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Website settings table (optimized)
CREATE TABLE IF NOT EXISTS website_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key),
    INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;

-- Archive table for old records (data retention strategy)
CREATE TABLE IF NOT EXISTS archived_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    original_id INT NOT NULL,
    data JSON NOT NULL,
    archived_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255) DEFAULT 'auto_archive_30_days',
    INDEX idx_table_name (table_name),
    INDEX idx_archived_at (archived_at),
    INDEX idx_original_id (original_id)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED;
