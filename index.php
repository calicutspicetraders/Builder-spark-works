<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

// Redirect to login if not authenticated
if (!isLoggedIn()) {
    header('Location: login.php');
    exit();
}

$currentUser = getCurrentUser();
$recentActivities = getRecentActivities(5);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Workspace - <?php echo SITE_NAME; ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'brand-green': {
                            50: '#f0f9f0',
                            500: '#2d7d32',
                            600: '#1b5e20',
                        },
                        'brand-gold': {
                            400: '#ffd740',
                            500: '#ffc107',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="h-8 w-8 bg-brand-green-500 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-sm">🌿</span>
                        </div>
                        <span class="ml-2 text-xl font-bold">
                            <span class="text-brand-green-500">Calicut</span>
                            <span class="text-brand-gold-500">Spice Traders</span>
                        </span>
                    </div>
                </div>
                
                <div class="flex items-center space-x-4">
                    <span class="text-gray-700">Welcome, <?php echo htmlspecialchars($currentUser['full_name']); ?></span>
                    <?php if (hasRole('superadmin') || hasRole('admin')): ?>
                        <a href="admin.php" class="bg-brand-green-500 text-white px-4 py-2 rounded-lg hover:bg-brand-green-600">
                            Admin Panel
                        </a>
                    <?php endif; ?>
                    <a href="logout.php" class="text-gray-500 hover:text-gray-700">Logout</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Welcome Section -->
        <div class="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div class="px-4 py-5 sm:p-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">
                    Workspace Dashboard
                </h1>
                <p class="text-gray-600">
                    Collaborate with your partners and manage your spice export business efficiently.
                </p>
            </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <?php
            $pdo = getDBConnection();
            
            // Get stats
            $totalUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE status = 'active'")->fetchColumn();
            $totalShipments = $pdo->query("SELECT COUNT(*) FROM export_shipments")->fetchColumn();
            $activeShipments = $pdo->query("SELECT COUNT(*) FROM export_shipments WHERE status IN ('preparing', 'in_transit', 'customs')")->fetchColumn();
            ?>
            
            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                <span class="text-white text-sm">👥</span>
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Active Partners</dt>
                                <dd class="text-lg font-medium text-gray-900"><?php echo $totalUsers; ?></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                <span class="text-white text-sm">📦</span>
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Shipments</dt>
                                <dd class="text-lg font-medium text-gray-900"><?php echo $totalShipments; ?></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                <span class="text-white text-sm">🚚</span>
                            </div>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Active Shipments</dt>
                                <dd class="text-lg font-medium text-gray-900"><?php echo $activeShipments; ?></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activities & Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Activities -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activities</h3>
                </div>
                <div class="px-4 py-4">
                    <div class="flow-root">
                        <ul class="-mb-8">
                            <?php foreach ($recentActivities as $index => $activity): ?>
                            <li>
                                <div class="relative pb-8">
                                    <?php if ($index < count($recentActivities) - 1): ?>
                                    <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
                                    <?php endif; ?>
                                    <div class="relative flex space-x-3">
                                        <div>
                                            <span class="h-8 w-8 rounded-full bg-brand-green-500 flex items-center justify-center ring-8 ring-white">
                                                <span class="text-white text-xs">👤</span>
                                            </span>
                                        </div>
                                        <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                            <div>
                                                <p class="text-sm text-gray-500">
                                                    <span class="font-medium text-gray-900"><?php echo htmlspecialchars($activity['full_name']); ?></span>
                                                    <?php echo htmlspecialchars($activity['description']); ?>
                                                </p>
                                            </div>
                                            <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                                <?php echo date('M j, g:i A', strtotime($activity['created_at'])); ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div class="px-4 py-4 space-y-4">
                    <a href="shipments.php" class="block w-full bg-brand-green-500 text-white text-center py-3 px-4 rounded-lg hover:bg-brand-green-600 transition-colors">
                        📦 View Shipments
                    </a>
                    <a href="documents.php" class="block w-full bg-blue-500 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        📄 Manage Documents
                    </a>
                    <a href="messages.php" class="block w-full bg-purple-500 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                        💬 Team Messages
                    </a>
                    <?php if (hasRole('superadmin') || hasRole('admin')): ?>
                    <a href="admin.php" class="block w-full bg-orange-500 text-white text-center py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                        ⚙️ Admin Panel
                    </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
