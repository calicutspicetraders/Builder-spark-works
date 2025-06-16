<?php
// Health Check Script for Hostinger Monitoring
require_once 'database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function performHealthCheck() {
    $healthData = [
        'timestamp' => date('c'),
        'status' => 'healthy',
        'checks' => [],
        'metrics' => [],
        'warnings' => [],
        'errors' => []
    ];
    
    try {
        // Database Health Check
        $dbHealth = checkDatabaseHealth();
        $healthData['checks']['database'] = $dbHealth;
        
        if ($dbHealth['status'] !== 'healthy') {
            $healthData['status'] = 'degraded';
            if ($dbHealth['status'] === 'error') {
                $healthData['errors'][] = 'Database connection failed';
            }
        }
        
        // File System Check
        $fsHealth = checkFileSystem();
        $healthData['checks']['filesystem'] = $fsHealth;
        
        // Memory Check
        $memoryHealth = checkMemoryUsage();
        $healthData['checks']['memory'] = $memoryHealth;
        $healthData['metrics']['memory'] = $memoryHealth;
        
        if ($memoryHealth['usage_percent'] > 90) {
            $healthData['status'] = 'critical';
            $healthData['errors'][] = 'High memory usage: ' . $memoryHealth['usage_percent'] . '%';
        } elseif ($memoryHealth['usage_percent'] > 75) {
            $healthData['warnings'][] = 'Memory usage warning: ' . $memoryHealth['usage_percent'] . '%';
        }
        
        // PHP Configuration Check
        $phpHealth = checkPHPConfiguration();
        $healthData['checks']['php'] = $phpHealth;
        
        // API Endpoints Check
        $apiHealth = checkAPIEndpoints();
        $healthData['checks']['api'] = $apiHealth;
        
        // Security Check
        $securityHealth = checkSecurity();
        $healthData['checks']['security'] = $securityHealth;
        
        // Performance Metrics
        $performanceMetrics = getPerformanceMetrics();
        $healthData['metrics']['performance'] = $performanceMetrics;
        
        // Overall Status
        if (count($healthData['errors']) > 0) {
            $healthData['status'] = 'critical';
        } elseif (count($healthData['warnings']) > 0) {
            $healthData['status'] = 'warning';
        }
        
    } catch (Exception $e) {
        $healthData['status'] = 'error';
        $healthData['errors'][] = 'Health check failed: ' . $e->getMessage();
    }
    
    return $healthData;
}

function checkDatabaseHealth() {
    try {
        $pdo = getDBConnection();
        if (!$pdo) {
            return [
                'status' => 'error',
                'message' => 'Cannot connect to database',
                'response_time_ms' => null
            ];
        }
        
        $startTime = microtime(true);
        $stmt = $pdo->query("SELECT 1");
        $endTime = microtime(true);
        $responseTime = round(($endTime - $startTime) * 1000, 2);
        
        // Check database size
        $stmt = $pdo->query("
            SELECT 
                ROUND(SUM(data_length + index_length) / 1024 / 1024 / 1024, 2) as size_gb,
                COUNT(*) as table_count
            FROM information_schema.tables 
            WHERE table_schema = DATABASE()
        ");
        $dbInfo = $stmt->fetch();
        
        // Check connections
        $stmt = $pdo->query("SHOW STATUS LIKE 'Threads_connected'");
        $connections = $stmt->fetch();
        
        $status = 'healthy';
        if ($responseTime > 1000) $status = 'warning';
        if ($responseTime > 2000) $status = 'critical';
        if ($dbInfo['size_gb'] > 2.5) $status = 'warning';
        if ($dbInfo['size_gb'] > 2.8) $status = 'critical';
        
        return [
            'status' => $status,
            'response_time_ms' => $responseTime,
            'size_gb' => $dbInfo['size_gb'],
            'table_count' => $dbInfo['table_count'],
            'connections' => $connections['Value'],
            'connection_limit' => 25
        ];
        
    } catch (Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage(),
            'response_time_ms' => null
        ];
    }
}

function checkFileSystem() {
    try {
        $docRoot = $_SERVER['DOCUMENT_ROOT'];
        $totalSpace = disk_total_space($docRoot);
        $freeSpace = disk_free_space($docRoot);
        $usedSpace = $totalSpace - $freeSpace;
        $usagePercent = round(($usedSpace / $totalSpace) * 100, 2);
        
        // Check if critical files exist
        $criticalFiles = [
            '.htaccess',
            'index.html',
            'api/test.php'
        ];
        
        $missingFiles = [];
        foreach ($criticalFiles as $file) {
            if (!file_exists($docRoot . '/' . $file)) {
                $missingFiles[] = $file;
            }
        }
        
        $status = 'healthy';
        if ($usagePercent > 80) $status = 'warning';
        if ($usagePercent > 90 || count($missingFiles) > 0) $status = 'critical';
        
        return [
            'status' => $status,
            'total_space_gb' => round($totalSpace / 1024 / 1024 / 1024, 2),
            'free_space_gb' => round($freeSpace / 1024 / 1024 / 1024, 2),
            'usage_percent' => $usagePercent,
            'missing_files' => $missingFiles
        ];
        
    } catch (Exception $e) {
        return [
            'status' => 'error',
            'message' => $e->getMessage()
        ];
    }
}

function checkMemoryUsage() {
    $memoryUsage = memory_get_usage(true);
    $memoryLimit = ini_get('memory_limit');
    $memoryLimitBytes = convertToBytes($memoryLimit);
    $usagePercent = round(($memoryUsage / $memoryLimitBytes) * 100, 2);
    
    $status = 'healthy';
    if ($usagePercent > 75) $status = 'warning';
    if ($usagePercent > 90) $status = 'critical';
    
    return [
        'status' => $status,
        'usage_mb' => round($memoryUsage / 1024 / 1024, 2),
        'limit_mb' => round($memoryLimitBytes / 1024 / 1024, 2),
        'usage_percent' => $usagePercent
    ];
}

function checkPHPConfiguration() {
    $config = [
        'version' => PHP_VERSION,
        'memory_limit' => ini_get('memory_limit'),
        'max_execution_time' => ini_get('max_execution_time'),
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'post_max_size' => ini_get('post_max_size'),
        'display_errors' => ini_get('display_errors'),
        'log_errors' => ini_get('log_errors')
    ];
    
    $issues = [];
    if (ini_get('display_errors')) {
        $issues[] = 'display_errors should be disabled in production';
    }
    if (!ini_get('log_errors')) {
        $issues[] = 'log_errors should be enabled';
    }
    
    $status = count($issues) > 0 ? 'warning' : 'healthy';
    
    return [
        'status' => $status,
        'config' => $config,
        'issues' => $issues
    ];
}

function checkAPIEndpoints() {
    $endpoints = [
        '/api/test.php',
        '/api/superadmin/preview.php',
        '/api/superadmin/invite-manager.php'
    ];
    
    $results = [];
    $allHealthy = true;
    
    foreach ($endpoints as $endpoint) {
        $url = 'http://localhost' . $endpoint;
        $startTime = microtime(true);
        
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'timeout' => 5
            ]
        ]);
        
        $response = @file_get_contents($url, false, $context);
        $endTime = microtime(true);
        $responseTime = round(($endTime - $startTime) * 1000, 2);
        
        $status = $response !== false ? 'healthy' : 'error';
        if ($status === 'error') $allHealthy = false;
        
        $results[$endpoint] = [
            'status' => $status,
            'response_time_ms' => $responseTime
        ];
    }
    
    return [
        'status' => $allHealthy ? 'healthy' : 'degraded',
        'endpoints' => $results
    ];
}

function checkSecurity() {
    $securityIssues = [];
    
    // Check .htaccess
    if (!file_exists('.htaccess')) {
        $securityIssues[] = '.htaccess file missing';
    }
    
    // Check sensitive file exposure
    $sensitiveFiles = ['.env', 'config/database.php'];
    foreach ($sensitiveFiles as $file) {
        if (file_exists($file)) {
            $headers = @get_headers('http://localhost/' . $file);
            if ($headers && strpos($headers[0], '200') !== false) {
                $securityIssues[] = "Sensitive file exposed: $file";
            }
        }
    }
    
    $status = count($securityIssues) > 0 ? 'warning' : 'healthy';
    
    return [
        'status' => $status,
        'issues' => $securityIssues,
        'last_scan' => date('c')
    ];
}

function getPerformanceMetrics() {
    return [
        'cpu_load' => sys_getloadavg()[0] ?? null,
        'memory_peak_mb' => round(memory_get_peak_usage(true) / 1024 / 1024, 2),
        'script_execution_time_ms' => round((microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']) * 1000, 2),
        'active_sessions' => session_status() === PHP_SESSION_ACTIVE ? 1 : 0
    ];
}

function convertToBytes($value) {
    $unit = strtolower(substr($value, -1));
    $value = (int) $value;
    
    switch ($unit) {
        case 'g': $value *= 1024;
        case 'm': $value *= 1024;
        case 'k': $value *= 1024;
    }
    
    return $value;
}

// If called directly, output health check
if (basename($_SERVER['PHP_SELF']) === 'health_check.php') {
    echo json_encode(performHealthCheck(), JSON_PRETTY_PRINT);
} else {
    // Return function for use in other scripts
    return performHealthCheck();
}
?>
