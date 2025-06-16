<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

// Require admin access
if (!hasRole('superadmin') && !hasRole('admin')) {
    header('Location: index.php');
    exit();
}

$currentUser = getCurrentUser();
$message = '';

// Handle user actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'create_user') {
        $username = $_POST['username'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $fullName = $_POST['full_name'] ?? '';
        $role = $_POST['role'] ?? 'user';
        
        if (createUser($username, $email, $password, $fullName, $role)) {
            $message = 'User created successfully!';
            logActivity($_SESSION['user_id'], 'user_created', "Created new user: $username");
        } else {
            $message = 'Error: User already exists or invalid data.';
        }
    } elseif ($action === 'toggle_status') {
        $userId = $_POST['user_id'] ?? '';
        $status = $_POST['status'] ?? '';
        if (updateUserStatus($userId, $status)) {
            $message = 'User status updated successfully!';
            logActivity($_SESSION['user_id'], 'user_status_changed', "Changed user status to: $status");
        }
    }
}

$allUsers = getAllUsers();
$recentActivities = getRecentActivities(10);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - <?php echo SITE_NAME; ?></title>
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
                    <a href="index.php" class="flex items-center">
                        <div class="h-8 w-8 bg-brand-green-500 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-sm">🌿</span>
                        </div>
                        <span class="ml-2 text-xl font-bold">
                            <span class="text-brand-green-500">Calicut</span>
                            <span class="text-brand-gold-500">Spice Traders</span>
                        </span>
                    </a>
                </div>
                
                <div class="flex items-center space-x-4">
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Admin Panel</span>
                    <span class="text-gray-700"><?php echo htmlspecialchars($currentUser['full_name']); ?></span>
                    <a href="index.php" class="text-brand-green-500 hover:text-brand-green-600">← Back to Workspace</a>
                    <a href="logout.php" class="text-gray-500 hover:text-gray-700">Logout</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <?php if ($message): ?>
        <div class="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <?php echo htmlspecialchars($message); ?>
        </div>
        <?php endif; ?>

        <!-- Header -->
        <div class="bg-white shadow rounded-lg mb-6">
            <div class="px-4 py-5 sm:p-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h1>
                <p class="text-gray-600">Manage users, monitor activities, and configure workspace settings.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- User Management -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Create New User -->
                <div class="bg-white shadow rounded-lg">
                    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">Create New User</h3>
                    </div>
                    <div class="px-4 py-4">
                        <form method="POST" class="space-y-4">
                            <input type="hidden" name="action" value="create_user">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" name="username" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" name="email" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" name="full_name" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Role</label>
                                    <select name="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500">
                                        <option value="user">User</option>
                                        <option value="partner">Partner</option>
                                        <?php if (hasRole('superadmin')): ?>
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                        <?php endif; ?>
                                    </select>
                                </div>
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" name="password" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green-500 focus:border-brand-green-500">
                                </div>
                            </div>
                            <button type="submit" class="bg-brand-green-500 text-white px-4 py-2 rounded-md hover:bg-brand-green-600">
                                Create User
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Users List -->
                <div class="bg-white shadow rounded-lg">
                    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">All Users</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <?php foreach ($allUsers as $user): ?>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($user['full_name']); ?></div>
                                            <div class="text-sm text-gray-500"><?php echo htmlspecialchars($user['email']); ?></div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            <?php echo $user['role'] === 'superadmin' ? 'bg-red-100 text-red-800' : 
                                                     ($user['role'] === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                                     ($user['role'] === 'partner' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800')); ?>">
                                            <?php echo ucfirst($user['role']); ?>
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            <?php echo $user['status'] === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'; ?>">
                                            <?php echo ucfirst($user['status']); ?>
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <?php echo date('M j, Y', strtotime($user['created_at'])); ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <?php if ($user['id'] !== $_SESSION['user_id']): ?>
                                        <form method="POST" class="inline">
                                            <input type="hidden" name="action" value="toggle_status">
                                            <input type="hidden" name="user_id" value="<?php echo $user['id']; ?>">
                                            <input type="hidden" name="status" value="<?php echo $user['status'] === 'active' ? 'inactive' : 'active'; ?>">
                                            <button type="submit" class="text-indigo-600 hover:text-indigo-900">
                                                <?php echo $user['status'] === 'active' ? 'Deactivate' : 'Activate'; ?>
                                            </button>
                                        </form>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="space-y-6">
                <div class="bg-white shadow rounded-lg">
                    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">Recent Activities</h3>
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
                                            <div class="min-w-0 flex-1 pt-1.5">
                                                <div>
                                                    <p class="text-sm text-gray-500">
                                                        <span class="font-medium text-gray-900"><?php echo htmlspecialchars($activity['full_name']); ?></span>
                                                        <?php echo htmlspecialchars($activity['description']); ?>
                                                    </p>
                                                </div>
                                                <div class="text-sm text-gray-500">
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
            </div>
        </div>
    </div>
</body>
</html>
