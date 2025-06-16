<?php
// Hostinger MySQL Database Configuration
// workspace.calicutspicetraders.com

function getDBConnection() {
    // Hostinger database credentials
    $host = 'localhost'; // Hostinger typically uses localhost
    $dbname = 'u272045696_cst';
    $username = 'u272045696_cst';
    $password = 'Clt@230525';
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
        // Optimize for Hostinger constraints
        PDO::ATTR_TIMEOUT => 30, // Connection timeout
        PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true, // Use buffered queries for better memory management
        PDO::MYSQL_ATTR_LOCAL_INFILE => false, // Security: disable LOCAL INFILE
        PDO::ATTR_PERSISTENT => false, // Avoid persistent connections due to 25 connection limit
    ];
    
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    
    try {
        $pdo = new PDO($dsn, $username, $password, $options);
        
        // Set session variables for optimal performance on Hostinger
        $pdo->exec("SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO'");
        $pdo->exec("SET SESSION innodb_lock_wait_timeout = 50"); // Reduce lock wait time
        $pdo->exec("SET SESSION max_execution_time = 50000"); // 50 seconds (under 60s limit)
        $pdo->exec("SET SESSION sort_buffer_size = 256000"); // Optimize sorting
        
        return $pdo;
        
    } catch (PDOException $e) {
        // Log error without exposing credentials
        error_log("Database connection failed: " . $e->getMessage());
        
        // Return null for graceful degradation
        return null;
    }
}

// Connection pool management for Hostinger's 25 connection limit
class DatabasePool {
    private static $connections = [];
    private static $maxConnections = 20; // Leave 5 connections for other processes
    private static $currentConnections = 0;
    
    public static function getConnection() {
        // Clean up expired connections
        self::cleanupConnections();
        
        // Check if we've hit the connection limit
        if (self::$currentConnections >= self::$maxConnections) {
            // Wait briefly and try to cleanup again
            usleep(100000); // 0.1 seconds
            self::cleanupConnections();
            
            if (self::$currentConnections >= self::$maxConnections) {
                throw new Exception("Database connection pool exhausted");
            }
        }
        
        $connection = getDBConnection();
        if ($connection) {
            self::$connections[] = [
                'pdo' => $connection,
                'created' => time(),
                'last_used' => time()
            ];
            self::$currentConnections++;
        }
        
        return $connection;
    }
    
    public static function releaseConnection($pdo) {
        foreach (self::$connections as $key => $conn) {
            if ($conn['pdo'] === $pdo) {
                unset(self::$connections[$key]);
                self::$currentConnections--;
                break;
            }
        }
    }
    
    private static function cleanupConnections() {
        $now = time();
        $maxAge = 300; // 5 minutes
        
        foreach (self::$connections as $key => $conn) {
            if (($now - $conn['last_used']) > $maxAge) {
                unset(self::$connections[$key]);
                self::$currentConnections--;
            }
        }
        
        // Reindex array
        self::$connections = array_values(self::$connections);
    }
    
    public static function getStats() {
        return [
            'active_connections' => self::$currentConnections,
            'max_connections' => self::$maxConnections,
            'total_connections' => count(self::$connections)
        ];
    }
}

// Helper function for read-only analytics queries
function getAnalyticsConnection() {
    $pdo = getDBConnection();
    if ($pdo) {
        // Set read-only mode for analytics queries
        $pdo->exec("SET SESSION transaction_read_only = 1");
    }
    return $pdo;
}

// Migration functions for Hostinger deployment
function runMigrations() {
    $pdo = getDBConnection();
    if (!$pdo) {
        throw new Exception("Cannot connect to database for migrations");
    }
    
    try {
        // Create migrations table if it doesn't exist
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                migration_name VARCHAR(255) NOT NULL UNIQUE,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_migration_name (migration_name)
            ) ENGINE=InnoDB
        ");
        
        // Get list of executed migrations
        $stmt = $pdo->query("SELECT migration_name FROM migrations");
        $executedMigrations = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Define migration files in order
        $migrationFiles = [
            '001_create_user_tables.sql',
            '002_create_content_tables.sql',
            '003_create_invite_tables.sql',
            '004_add_indexes.sql',
            '005_optimize_for_hostinger.sql'
        ];
        
        foreach ($migrationFiles as $migrationFile) {
            if (!in_array($migrationFile, $executedMigrations)) {
                $migrationPath = __DIR__ . "/migrations/{$migrationFile}";
                if (file_exists($migrationPath)) {
                    $sql = file_get_contents($migrationPath);
                    $pdo->exec($sql);
                    
                    // Record migration as executed
                    $stmt = $pdo->prepare("INSERT INTO migrations (migration_name) VALUES (?)");
                    $stmt->execute([$migrationFile]);
                    
                    error_log("Executed migration: {$migrationFile}");
                }
            }
        }
        
        return true;
        
    } catch (Exception $e) {
        error_log("Migration failed: " . $e->getMessage());
        throw $e;
    }
}

// Health check function for monitoring
function checkDatabaseHealth() {
    $pdo = getDBConnection();
    if (!$pdo) {
        return ['status' => 'error', 'message' => 'Cannot connect to database'];
    }
    
    try {
        // Check connection
        $stmt = $pdo->query("SELECT 1");
        
        // Check database size (3GB limit)
        $stmt = $pdo->query("
            SELECT 
                ROUND(SUM(data_length + index_length) / 1024 / 1024 / 1024, 2) as size_gb,
                COUNT(*) as table_count
            FROM information_schema.tables 
            WHERE table_schema = DATABASE()
        ");
        $dbInfo = $stmt->fetch();
        
        // Check active connections
        $stmt = $pdo->query("SHOW STATUS LIKE 'Threads_connected'");
        $connections = $stmt->fetch();
        
        return [
            'status' => 'healthy',
            'database_size_gb' => $dbInfo['size_gb'],
            'table_count' => $dbInfo['table_count'],
            'active_connections' => $connections['Value'],
            'connection_limit' => 25,
            'memory_usage_mb' => round(memory_get_usage(true) / 1024 / 1024, 2),
            'memory_limit_mb' => 1536
        ];
        
    } catch (Exception $e) {
        return ['status' => 'error', 'message' => $e->getMessage()];
    }
}
?>
