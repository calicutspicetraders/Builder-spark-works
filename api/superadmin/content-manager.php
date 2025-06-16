<?php
// API for SuperAdmin Content Management System
require_once '../../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check superadmin authentication
session_start();
if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'superadmin') {
    http_response_code(403);
    echo json_encode(['error' => 'SuperAdmin access required']);
    exit;
}

class ContentManager {
    private $pdo;

    public function __construct() {
        $this->pdo = getDBConnection();
        $this->initializeTables();
    }

    private function initializeTables() {
        // Content blocks table
        $sql = "CREATE TABLE IF NOT EXISTS content_blocks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type ENUM('text', 'image', 'logo', 'plugin', 'custom') NOT NULL,
            name VARCHAR(255) NOT NULL,
            content JSON NOT NULL,
            page VARCHAR(100) NOT NULL,
            position VARCHAR(100) NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            metadata JSON DEFAULT NULL,
            created_by INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_page_position (page, position),
            INDEX idx_type_active (type, is_active),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )";
        $this->pdo->exec($sql);

        // Plugins table
        $sql = "CREATE TABLE IF NOT EXISTS custom_plugins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            code LONGTEXT NOT NULL,
            type ENUM('component', 'script', 'style') NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            pages JSON DEFAULT NULL,
            version VARCHAR(50) DEFAULT '1.0.0',
            created_by INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_type_active (type, is_active),
            FOREIGN KEY (created_by) REFERENCES users(id)
        )";
        $this->pdo->exec($sql);

        // Media files table
        $sql = "CREATE TABLE IF NOT EXISTS media_files (
            id INT AUTO_INCREMENT PRIMARY KEY,
            original_name VARCHAR(255) NOT NULL,
            stored_name VARCHAR(255) NOT NULL,
            file_path VARCHAR(500) NOT NULL,
            file_size INT NOT NULL,
            mime_type VARCHAR(100) NOT NULL,
            file_type ENUM('image', 'document', 'logo', 'icon') NOT NULL,
            dimensions JSON DEFAULT NULL,
            alt_text VARCHAR(255) DEFAULT NULL,
            uploaded_by INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_type (file_type),
            INDEX idx_uploaded_by (uploaded_by),
            FOREIGN KEY (uploaded_by) REFERENCES users(id)
        )";
        $this->pdo->exec($sql);

        // Website settings table
        $sql = "CREATE TABLE IF NOT EXISTS website_settings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            setting_key VARCHAR(100) UNIQUE NOT NULL,
            setting_value JSON NOT NULL,
            description TEXT,
            updated_by INT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_key (setting_key),
            FOREIGN KEY (updated_by) REFERENCES users(id)
        )";
        $this->pdo->exec($sql);
    }

    // Content Blocks Management
    public function getContentBlocks($page = null) {
        $sql = "SELECT cb.*, u.username as created_by_name
                FROM content_blocks cb
                LEFT JOIN users u ON cb.created_by = u.id";
        
        $params = [];
        if ($page && $page !== 'all') {
            $sql .= " WHERE cb.page = ?";
            $params[] = $page;
        }
        
        $sql .= " ORDER BY cb.page, cb.position, cb.created_at";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        
        $blocks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields
        foreach ($blocks as &$block) {
            $block['content'] = json_decode($block['content'], true);
            $block['metadata'] = $block['metadata'] ? json_decode($block['metadata'], true) : null;
        }
        
        return $blocks;
    }

    public function createContentBlock($data) {
        $sql = "INSERT INTO content_blocks 
                (type, name, content, page, position, is_active, metadata, created_by)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $data['type'],
            $data['name'],
            json_encode($data['content']),
            $data['page'],
            $data['position'],
            $data['is_active'] ?? true,
            isset($data['metadata']) ? json_encode($data['metadata']) : null,
            $_SESSION['user_id']
        ]);
        
        return [
            'id' => $this->pdo->lastInsertId(),
            'success' => true
        ];
    }

    public function updateContentBlock($id, $data) {
        $allowedFields = ['type', 'name', 'content', 'page', 'position', 'is_active', 'metadata'];
        $updateFields = [];
        $params = [];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                if (in_array($field, ['content', 'metadata'])) {
                    $updateFields[] = "$field = ?";
                    $params[] = json_encode($data[$field]);
                } else {
                    $updateFields[] = "$field = ?";
                    $params[] = $data[$field];
                }
            }
        }
        
        if (empty($updateFields)) {
            return ['success' => false, 'error' => 'No valid fields to update'];
        }
        
        $params[] = $id;
        
        $sql = "UPDATE content_blocks SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        
        return ['success' => $stmt->execute($params)];
    }

    public function deleteContentBlock($id) {
        $sql = "DELETE FROM content_blocks WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        
        return ['success' => $stmt->execute([$id])];
    }

    // Plugin Management
    public function getPlugins() {
        $sql = "SELECT p.*, u.username as created_by_name
                FROM custom_plugins p
                LEFT JOIN users u ON p.created_by = u.id
                ORDER BY p.name";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        
        $plugins = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields
        foreach ($plugins as &$plugin) {
            $plugin['pages'] = $plugin['pages'] ? json_decode($plugin['pages'], true) : [];
        }
        
        return $plugins;
    }

    public function createPlugin($data) {
        $sql = "INSERT INTO custom_plugins 
                (name, description, code, type, is_active, pages, version, created_by)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['description'] ?? '',
            $data['code'],
            $data['type'],
            $data['is_active'] ?? true,
            isset($data['pages']) ? json_encode($data['pages']) : json_encode([]),
            $data['version'] ?? '1.0.0',
            $_SESSION['user_id']
        ]);
        
        return [
            'id' => $this->pdo->lastInsertId(),
            'success' => true
        ];
    }

    public function updatePlugin($id, $data) {
        $allowedFields = ['name', 'description', 'code', 'type', 'is_active', 'pages', 'version'];
        $updateFields = [];
        $params = [];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                if ($field === 'pages') {
                    $updateFields[] = "$field = ?";
                    $params[] = json_encode($data[$field]);
                } else {
                    $updateFields[] = "$field = ?";
                    $params[] = $data[$field];
                }
            }
        }
        
        if (empty($updateFields)) {
            return ['success' => false, 'error' => 'No valid fields to update'];
        }
        
        $params[] = $id;
        
        $sql = "UPDATE custom_plugins SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        
        return ['success' => $stmt->execute($params)];
    }

    public function deletePlugin($id) {
        $sql = "DELETE FROM custom_plugins WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        
        return ['success' => $stmt->execute([$id])];
    }

    // Media Management
    public function uploadFile($file, $type = 'image') {
        $uploadDir = '../../uploads/';
        $allowedTypes = [
            'image' => ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
            'document' => ['pdf', 'doc', 'docx', 'txt'],
            'logo' => ['png', 'svg', 'jpg', 'jpeg'],
            'icon' => ['ico', 'png', 'svg']
        ];

        // Create upload directory if it doesn't exist
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $fileName = $file['name'];
        $fileSize = $file['size'];
        $fileTmp = $file['tmp_name'];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Validate file type
        if (!in_array($fileExt, $allowedTypes[$type] ?? [])) {
            return ['success' => false, 'error' => 'Invalid file type'];
        }

        // Generate unique filename
        $storedName = uniqid() . '_' . time() . '.' . $fileExt;
        $filePath = $uploadDir . $storedName;

        if (move_uploaded_file($fileTmp, $filePath)) {
            // Get image dimensions if it's an image
            $dimensions = null;
            if ($type === 'image' || $type === 'logo') {
                $imageInfo = getimagesize($filePath);
                if ($imageInfo) {
                    $dimensions = [
                        'width' => $imageInfo[0],
                        'height' => $imageInfo[1]
                    ];
                }
            }

            // Store in database
            $sql = "INSERT INTO media_files 
                    (original_name, stored_name, file_path, file_size, mime_type, file_type, dimensions, uploaded_by)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                $fileName,
                $storedName,
                $filePath,
                $fileSize,
                $file['type'],
                $type,
                $dimensions ? json_encode($dimensions) : null,
                $_SESSION['user_id']
            ]);

            return [
                'success' => true,
                'id' => $this->pdo->lastInsertId(),
                'url' => '/uploads/' . $storedName,
                'filename' => $storedName,
                'dimensions' => $dimensions
            ];
        } else {
            return ['success' => false, 'error' => 'Upload failed'];
        }
    }

    public function getMediaFiles($type = null) {
        $sql = "SELECT mf.*, u.username as uploaded_by_name
                FROM media_files mf
                LEFT JOIN users u ON mf.uploaded_by = u.id";
        
        $params = [];
        if ($type) {
            $sql .= " WHERE mf.file_type = ?";
            $params[] = $type;
        }
        
        $sql .= " ORDER BY mf.created_at DESC";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        
        $files = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Parse JSON fields and add URLs
        foreach ($files as &$file) {
            $file['dimensions'] = $file['dimensions'] ? json_decode($file['dimensions'], true) : null;
            $file['url'] = '/uploads/' . $file['stored_name'];
        }
        
        return $files;
    }

    // Website Settings
    public function updateSetting($key, $value, $description = null) {
        $sql = "INSERT INTO website_settings (setting_key, setting_value, description, updated_by)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                setting_value = VALUES(setting_value),
                description = VALUES(description),
                updated_by = VALUES(updated_by)";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            $key,
            json_encode($value),
            $description,
            $_SESSION['user_id']
        ]);
        
        return ['success' => true];
    }

    public function getSetting($key) {
        $sql = "SELECT setting_value FROM website_settings WHERE setting_key = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$key]);
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $result ? json_decode($result['setting_value'], true) : null;
    }

    public function getAllSettings() {
        $sql = "SELECT * FROM website_settings ORDER BY setting_key";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        
        $settings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result = [];
        
        foreach ($settings as $setting) {
            $result[$setting['setting_key']] = [
                'value' => json_decode($setting['setting_value'], true),
                'description' => $setting['description'],
                'updated_at' => $setting['updated_at']
            ];
        }
        
        return $result;
    }

    // Generate live preview data
    public function generatePreviewData($page) {
        $contentBlocks = $this->getContentBlocks($page);
        $plugins = array_filter($this->getPlugins(), function($plugin) use ($page) {
            return $plugin['is_active'] && (empty($plugin['pages']) || in_array($page, $plugin['pages']));
        });
        
        return [
            'content_blocks' => $contentBlocks,
            'plugins' => $plugins,
            'settings' => $this->getAllSettings()
        ];
    }
}

// Handle API requests
try {
    $manager = new ContentManager();
    $method = $_SERVER['REQUEST_METHOD'];
    $path = $_SERVER['REQUEST_URI'];
    $pathParts = explode('/', trim($path, '/'));
    
    // Parse request body
    $input = json_decode(file_get_contents('php://input'), true);
    
    switch ($method) {
        case 'GET':
            if (strpos($path, '/content-blocks') !== false) {
                $page = $_GET['page'] ?? null;
                echo json_encode($manager->getContentBlocks($page));
            } elseif (strpos($path, '/plugins') !== false) {
                echo json_encode($manager->getPlugins());
            } elseif (strpos($path, '/media') !== false) {
                $type = $_GET['type'] ?? null;
                echo json_encode($manager->getMediaFiles($type));
            } elseif (strpos($path, '/settings') !== false) {
                echo json_encode($manager->getAllSettings());
            } elseif (strpos($path, '/preview') !== false) {
                $page = $_GET['page'] ?? 'home';
                echo json_encode($manager->generatePreviewData($page));
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
            }
            break;

        case 'POST':
            if (strpos($path, '/content-blocks') !== false) {
                echo json_encode($manager->createContentBlock($input));
            } elseif (strpos($path, '/plugins') !== false) {
                echo json_encode($manager->createPlugin($input));
            } elseif (strpos($path, '/upload') !== false) {
                if (isset($_FILES['file'])) {
                    $type = $_POST['type'] ?? 'image';
                    echo json_encode($manager->uploadFile($_FILES['file'], $type));
                } else {
                    echo json_encode(['success' => false, 'error' => 'No file uploaded']);
                }
            } elseif (strpos($path, '/settings') !== false) {
                $key = $input['key'];
                $value = $input['value'];
                $description = $input['description'] ?? null;
                echo json_encode($manager->updateSetting($key, $value, $description));
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
            }
            break;

        case 'PATCH':
            $id = end($pathParts);
            if (strpos($path, '/content-blocks') !== false) {
                echo json_encode($manager->updateContentBlock($id, $input));
            } elseif (strpos($path, '/plugins') !== false) {
                echo json_encode($manager->updatePlugin($id, $input));
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
            }
            break;

        case 'DELETE':
            $id = end($pathParts);
            if (strpos($path, '/content-blocks') !== false) {
                echo json_encode($manager->deleteContentBlock($id));
            } elseif (strpos($path, '/plugins') !== false) {
                echo json_encode($manager->deletePlugin($id));
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
}
?>
