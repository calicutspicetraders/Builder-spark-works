<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (login($email, $password)) {
        header('Location: index.php');
        exit();
    } else {
        $error = 'Invalid email or password';
    }
}

// If already logged in, redirect to dashboard
if (isLoggedIn()) {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - <?php echo SITE_NAME; ?></title>
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
<body class="min-h-screen bg-gradient-to-br from-brand-green-50 to-white flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8">
        <div>
            <div class="mx-auto h-16 w-16 bg-brand-green-500 rounded-xl flex items-center justify-center">
                <span class="text-white text-2xl">🌿</span>
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Welcome to Workspace
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                <span class="font-medium text-brand-green-600">Calicut Spice Traders LLP</span>
                <br>Partner Collaboration Hub
            </p>
        </div>
        
        <form class="mt-8 space-y-6" method="POST">
            <?php if ($error): ?>
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <?php echo htmlspecialchars($error); ?>
            </div>
            <?php endif; ?>
            
            <div class="rounded-lg shadow-sm space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                    <input id="email" name="email" type="email" required 
                           class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-green-500 focus:border-brand-green-500"
                           placeholder="Enter your email">
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" name="password" type="password" required
                           class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-green-500 focus:border-brand-green-500"
                           placeholder="Enter your password">
                </div>
            </div>

            <div>
                <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-green-500 hover:bg-brand-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-500 transition-colors">
                    Sign in to Workspace
                </button>
            </div>
        </form>
        
        <div class="mt-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 class="text-sm font-medium text-blue-800 mb-2">Demo Accounts:</h4>
                <div class="text-xs text-blue-700 space-y-1">
                    <div><strong>Super Admin:</strong> admin@calicutspicetraders.com / admin123</div>
                    <div><strong>Partners:</strong> rajesh@calicutspicetraders.com / partner123</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
