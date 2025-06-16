<?php
// API for Dynamic Content Preview
require_once '../../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

class PreviewAPI {
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = getDBConnection();
        } catch (Exception $e) {
            // If database connection fails, we'll return empty data
            $this->pdo = null;
        }
    }

    public function getPreviewData($page) {
        // If no database connection, return empty data
        if (!$this->pdo) {
            return [
                'content_blocks' => [],
                'plugins' => [],
                'settings' => [],
                'status' => 'no_database'
            ];
        }

        try {
            // Get content blocks for the page
            $stmt = $this->pdo->prepare("
                SELECT id, type, name, content, page, position, is_active as isActive, metadata 
                FROM content_blocks 
                WHERE page = ? OR page = 'all'
                ORDER BY created_at ASC
            ");
            $stmt->execute([$page]);
            $contentBlocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Decode JSON content and metadata
            foreach ($contentBlocks as &$block) {
                $block['content'] = json_decode($block['content'], true);
                $block['metadata'] = $block['metadata'] ? json_decode($block['metadata'], true) : null;
                $block['isActive'] = (bool)$block['isActive'];
            }

            // Get plugins
            $stmt = $this->pdo->prepare("
                SELECT id, name, description, code, type, is_active as isActive, pages 
                FROM custom_plugins 
                WHERE is_active = 1 AND (pages LIKE ? OR pages LIKE '%all%')
                ORDER BY created_at ASC
            ");
            $stmt->execute(["%$page%"]);
            $plugins = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Decode JSON pages
            foreach ($plugins as &$plugin) {
                $plugin['pages'] = json_decode($plugin['pages'], true);
                $plugin['isActive'] = (bool)$plugin['isActive'];
            }

            // Get website settings
            $stmt = $this->pdo->query("SELECT setting_key, setting_value FROM website_settings");
            $settings = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $settings[$row['setting_key']] = json_decode($row['setting_value'], true);
            }

            return [
                'content_blocks' => $contentBlocks,
                'plugins' => $plugins,
                'settings' => $settings,
                'status' => 'success'
            ];

        } catch (Exception $e) {
            error_log("Preview API Error: " . $e->getMessage());
            return [
                'content_blocks' => $this->getDefaultContent($page),
                'plugins' => [],
                'settings' => [],
                'status' => 'fallback',
                'error' => $e->getMessage()
            ];
        }
    }

    private function getDefaultContent($page) {
        // Return some default content blocks for demonstration
        $defaultContent = [];

        if ($page === 'navigation') {
            $defaultContent = [
                [
                    'id' => 'default-logo',
                    'type' => 'logo',
                    'name' => 'Main Logo',
                    'content' => [
                        'url' => '/placeholder.svg',
                        'alt' => 'Calicut Spice Traders',
                        'width' => 48,
                        'height' => 48
                    ],
                    'page' => 'navigation',
                    'position' => 'header-left',
                    'isActive' => true,
                    'metadata' => [
                        'className' => 'company-logo',
                        'responsive' => [
                            'mobile' => true,
                            'tablet' => true,
                            'desktop' => true
                        ]
                    ]
                ],
                [
                    'id' => 'default-title',
                    'type' => 'text',
                    'name' => 'Company Name',
                    'content' => [
                        'text' => 'Calicut Spice Traders',
                        'tag' => 'h1',
                        'styling' => [
                            'fontSize' => '20px',
                            'fontWeight' => '700',
                            'background' => 'linear-gradient(to right, rgb(52, 211, 153), rgb(59, 130, 246))',
                            'backgroundClip' => 'text',
                            'color' => 'transparent'
                        ]
                    ],
                    'page' => 'navigation',
                    'position' => 'header-center',
                    'isActive' => true,
                    'metadata' => null
                ]
            ];
        }

        return $defaultContent;
    }
}

// Handle the request
try {
    $page = $_GET['page'] ?? 'home';
    $api = new PreviewAPI();
    $result = $api->getPreviewData($page);
    
    echo json_encode($result);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error',
        'message' => $e->getMessage(),
        'content_blocks' => [],
        'plugins' => [],
        'settings' => []
    ]);
}
?>
