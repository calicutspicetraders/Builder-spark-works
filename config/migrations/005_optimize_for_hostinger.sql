-- Hostinger-specific optimizations
-- Memory, connection, and storage optimizations

-- Set MySQL variables for optimal performance on Hostinger
SET SESSION query_cache_type = ON;
SET SESSION query_cache_size = 16777216; -- 16MB
SET SESSION tmp_table_size = 16777216; -- 16MB
SET SESSION max_heap_table_size = 16777216; -- 16MB

-- Create cleanup procedures for automatic maintenance
DELIMITER //

-- Procedure to clean up expired sessions
CREATE PROCEDURE CleanupExpiredSessions()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Archive expired sessions before deletion
    INSERT INTO archived_data (table_name, original_id, data, reason)
    SELECT 'user_sessions', id, 
           JSON_OBJECT(
               'session_token', session_token,
               'user_id', user_id,
               'created_at', created_at,
               'expires_at', expires_at,
               'last_activity', last_activity
           ),
           'expired_session_cleanup'
    FROM user_sessions 
    WHERE expires_at < NOW() - INTERVAL 1 DAY;
    
    -- Delete expired sessions
    DELETE FROM user_sessions WHERE expires_at < NOW() - INTERVAL 1 DAY;
    
    COMMIT;
END//

-- Procedure to archive old data (30 days)
CREATE PROCEDURE ArchiveOldData()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Archive old login attempts (keep only 30 days)
    INSERT INTO archived_data (table_name, original_id, data, reason)
    SELECT 'login_attempts', id,
           JSON_OBJECT(
               'email', email,
               'ip_address', ip_address,
               'attempt_type', attempt_type,
               'success', success,
               'attempted_at', attempted_at
           ),
           'auto_archive_30_days'
    FROM login_attempts 
    WHERE attempted_at < NOW() - INTERVAL 30 DAY;
    
    DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL 30 DAY;
    
    -- Archive old system logs (keep only 30 days)
    INSERT INTO archived_data (table_name, original_id, data, reason)
    SELECT 'system_logs', id,
           JSON_OBJECT(
               'log_level', log_level,
               'category', category,
               'message', message,
               'created_at', created_at
           ),
           'auto_archive_30_days'
    FROM system_logs 
    WHERE created_at < NOW() - INTERVAL 30 DAY;
    
    DELETE FROM system_logs WHERE created_at < NOW() - INTERVAL 30 DAY;
    
    -- Archive old performance metrics (keep only 30 days)
    INSERT INTO archived_data (table_name, original_id, data, reason)
    SELECT 'performance_metrics', id,
           JSON_OBJECT(
               'metric_name', metric_name,
               'metric_value', metric_value,
               'measured_at', measured_at
           ),
           'auto_archive_30_days'
    FROM performance_metrics 
    WHERE measured_at < NOW() - INTERVAL 30 DAY;
    
    DELETE FROM performance_metrics WHERE measured_at < NOW() - INTERVAL 30 DAY;
    
    COMMIT;
END//

-- Procedure to update dashboard cache
CREATE PROCEDURE UpdateDashboardCache()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Update user statistics cache
    INSERT INTO user_stats_cache (
        metric_date, total_users, active_users, new_registrations,
        pending_invites, accepted_invites, login_attempts, successful_logins
    )
    SELECT 
        CURDATE(),
        (SELECT COUNT(*) FROM registered_users WHERE status = 'active'),
        (SELECT COUNT(*) FROM registered_users WHERE last_login > NOW() - INTERVAL 7 DAY),
        (SELECT COUNT(*) FROM registered_users WHERE created_at >= CURDATE()),
        (SELECT COUNT(*) FROM user_invites WHERE status = 'pending'),
        (SELECT COUNT(*) FROM user_invites WHERE status = 'accepted'),
        (SELECT COUNT(*) FROM login_attempts WHERE attempted_at >= CURDATE()),
        (SELECT COUNT(*) FROM login_attempts WHERE attempted_at >= CURDATE() AND success = 1)
    ON DUPLICATE KEY UPDATE
        total_users = VALUES(total_users),
        active_users = VALUES(active_users),
        new_registrations = VALUES(new_registrations),
        pending_invites = VALUES(pending_invites),
        accepted_invites = VALUES(accepted_invites),
        login_attempts = VALUES(login_attempts),
        successful_logins = VALUES(successful_logins),
        calculated_at = NOW();
    
    -- Clean old dashboard summary cache
    DELETE FROM dashboard_summary WHERE valid_until < NOW();
    
    COMMIT;
END//

-- Procedure to optimize tables
CREATE PROCEDURE OptimizeTables()
BEGIN
    -- Optimize main tables for better performance
    OPTIMIZE TABLE user_invites;
    OPTIMIZE TABLE registered_users;
    OPTIMIZE TABLE user_sessions;
    OPTIMIZE TABLE content_blocks;
    OPTIMIZE TABLE custom_plugins;
    OPTIMIZE TABLE media_files;
    OPTIMIZE TABLE website_settings;
    
    -- Analyze tables for better query planning
    ANALYZE TABLE user_invites;
    ANALYZE TABLE registered_users;
    ANALYZE TABLE user_sessions;
    ANALYZE TABLE content_blocks;
    ANALYZE TABLE custom_plugins;
    ANALYZE TABLE media_files;
END//

DELIMITER ;

-- Create events for automatic maintenance (if Event Scheduler is enabled)
-- Note: Check with Hostinger if Event Scheduler is available

-- Clean up expired sessions daily
DROP EVENT IF EXISTS cleanup_expired_sessions;
CREATE EVENT cleanup_expired_sessions
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 2 HOUR
DO CALL CleanupExpiredSessions();

-- Archive old data weekly
DROP EVENT IF EXISTS archive_old_data;
CREATE EVENT archive_old_data
ON SCHEDULE EVERY 1 WEEK
STARTS CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 3 HOUR
DO CALL ArchiveOldData();

-- Update dashboard cache every hour
DROP EVENT IF EXISTS update_dashboard_cache;
CREATE EVENT update_dashboard_cache
ON SCHEDULE EVERY 1 HOUR
DO CALL UpdateDashboardCache();

-- Optimize tables weekly
DROP EVENT IF EXISTS optimize_tables;
CREATE EVENT optimize_tables
ON SCHEDULE EVERY 1 WEEK
STARTS CURRENT_DATE + INTERVAL 1 DAY + INTERVAL 4 HOUR
DO CALL OptimizeTables();

-- Insert initial dashboard cache data
INSERT IGNORE INTO user_stats_cache (metric_date, total_users, active_users, new_registrations, pending_invites, accepted_invites, login_attempts, successful_logins)
VALUES (CURDATE(), 0, 0, 0, 0, 0, 0, 0);
