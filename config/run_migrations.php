<?php
// Migration Runner for Hostinger Database Setup
require_once 'database.php';

function runAllMigrations() {
    echo "🚀 Starting database migrations for Hostinger...\n";
    
    try {
        $result = runMigrations();
        if ($result) {
            echo "✅ All migrations completed successfully!\n";
            return true;
        } else {
            echo "❌ Migration failed!\n";
            return false;
        }
    } catch (Exception $e) {
        echo "💥 Migration error: " . $e->getMessage() . "\n";
        return false;
    }
}

// Run migrations if called directly
if (php_sapi_name() === 'cli' || basename($_SERVER['PHP_SELF']) === 'run_migrations.php') {
    $success = runAllMigrations();
    exit($success ? 0 : 1);
}
?>
