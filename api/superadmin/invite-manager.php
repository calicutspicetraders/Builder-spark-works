<?php
// API for SuperAdmin Invite Management System
require_once '../../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

class InviteManager {
    private $pdo;

    public function __construct() {
        try {
            $this->pdo = getDBConnection();
            $this->initializeTables();
        } catch (Exception $e) {
            $this->pdo = null;
        }
    }

    private function initializeTables() {
        if (!$this->pdo) return;

        try {
            // User invites table
            $sql = "CREATE TABLE IF NOT EXISTS user_invites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                invite_code VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) NOT NULL,
                full_name VARCHAR(255) DEFAULT NULL,
                department VARCHAR(100) DEFAULT NULL,
                role ENUM('user', 'admin') DEFAULT 'user',
                status ENUM('pending', 'accepted', 'expired', 'revoked') DEFAULT 'pending',
                expires_at TIMESTAMP NOT NULL,
                created_by VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                accepted_at TIMESTAMP NULL,
                metadata JSON DEFAULT NULL,
                INDEX idx_invite_code (invite_code),
                INDEX idx_email (email),
                INDEX idx_status (status)
            )";
            $this->pdo->exec($sql);

            // Registered users table (extends invites)
            $sql = "CREATE TABLE IF NOT EXISTS registered_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                google_id VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                given_name VARCHAR(255) DEFAULT NULL,
                family_name VARCHAR(255) DEFAULT NULL,
                picture VARCHAR(500) DEFAULT NULL,
                department VARCHAR(100) DEFAULT NULL,
                job_title VARCHAR(255) DEFAULT NULL,
                role ENUM('user', 'admin', 'superadmin') DEFAULT 'user',
                status ENUM('active', 'suspended', 'pending') DEFAULT 'active',
                invite_code VARCHAR(255) DEFAULT NULL,
                last_login TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                preferences JSON DEFAULT NULL,
                FOREIGN KEY (invite_code) REFERENCES user_invites(invite_code),
                INDEX idx_google_id (google_id),
                INDEX idx_email (email),
                INDEX idx_status (status)
            )";
            $this->pdo->exec($sql);

            // Session tokens table for authentication
            $sql = "CREATE TABLE IF NOT EXISTS user_sessions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                session_token VARCHAR(255) UNIQUE NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                ip_address VARCHAR(45) DEFAULT NULL,
                user_agent TEXT DEFAULT NULL,
                FOREIGN KEY (user_id) REFERENCES registered_users(id) ON DELETE CASCADE,
                INDEX idx_session_token (session_token),
                INDEX idx_user_id (user_id)
            )";
            $this->pdo->exec($sql);

        } catch (Exception $e) {
            error_log("Invite Manager table initialization error: " . $e->getMessage());
        }
    }

    private function generateInviteCode() {
        return bin2hex(random_bytes(16));
    }

    public function createInvite($data) {
        if (!$this->pdo) {
            return ['success' => false, 'error' => 'Database unavailable'];
        }

        try {
            $inviteCode = $this->generateInviteCode();
            $expiresAt = date('Y-m-d H:i:s', strtotime('+7 days')); // Invite expires in 7 days

            $stmt = $this->pdo->prepare("
                INSERT INTO user_invites (invite_code, email, full_name, department, role, expires_at, created_by, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");

            $metadata = json_encode([
                'invite_message' => $data['message'] ?? '',
                'invited_by_name' => $data['invited_by_name'] ?? 'SuperAdmin',
                'company_name' => $data['company_name'] ?? 'Company',
                'permissions' => $data['permissions'] ?? []
            ]);

            $stmt->execute([
                $inviteCode,
                $data['email'],
                $data['full_name'] ?? null,
                $data['department'] ?? null,
                $data['role'] ?? 'user',
                $expiresAt,
                $data['created_by'] ?? 'superadmin',
                $metadata
            ]);

            return [
                'success' => true,
                'invite_code' => $inviteCode,
                'expires_at' => $expiresAt,
                'invite_link' => $this->generateInviteLink($inviteCode)
            ];

        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function getInvites($status = null) {
        if (!$this->pdo) {
            return ['success' => false, 'error' => 'Database unavailable'];
        }

        try {
            $sql = "SELECT * FROM user_invites";
            $params = [];

            if ($status) {
                $sql .= " WHERE status = ?";
                $params[] = $status;
            }

            $sql .= " ORDER BY created_at DESC";
            
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            $invites = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Decode metadata for each invite
            foreach ($invites as &$invite) {
                $invite['metadata'] = json_decode($invite['metadata'], true);
                $invite['invite_link'] = $this->generateInviteLink($invite['invite_code']);
            }

            return ['success' => true, 'invites' => $invites];

        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function validateInvite($inviteCode) {
        if (!$this->pdo) {
            return ['success' => false, 'error' => 'Database unavailable'];
        }

        try {
            $stmt = $this->pdo->prepare("
                SELECT * FROM user_invites 
                WHERE invite_code = ? AND status = 'pending' AND expires_at > NOW()
            ");
            $stmt->execute([$inviteCode]);
            $invite = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$invite) {
                return ['success' => false, 'error' => 'Invalid or expired invite'];
            }

            $invite['metadata'] = json_decode($invite['metadata'], true);
            return ['success' => true, 'invite' => $invite];

        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function acceptInvite($inviteCode, $googleUserData) {
        if (!$this->pdo) {
            return ['success' => false, 'error' => 'Database unavailable'];
        }

        try {
            $this->pdo->beginTransaction();

            // Validate invite
            $inviteResult = $this->validateInvite($inviteCode);
            if (!$inviteResult['success']) {
                $this->pdo->rollBack();
                return $inviteResult;
            }

            $invite = $inviteResult['invite'];

            // Check if email matches
            if ($invite['email'] !== $googleUserData['email']) {
                $this->pdo->rollBack();
                return ['success' => false, 'error' => 'Email mismatch with invite'];
            }

            // Create user account
            $stmt = $this->pdo->prepare("
                INSERT INTO registered_users (
                    google_id, email, full_name, given_name, family_name, picture,
                    department, role, invite_code, preferences
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    full_name = VALUES(full_name),
                    given_name = VALUES(given_name),
                    family_name = VALUES(family_name),
                    picture = VALUES(picture),
                    last_login = NOW()
            ");

            $preferences = json_encode([
                'language' => 'en',
                'currency' => 'USD',
                'dateFormat' => 'dd-mm-yyyy',
                'timeFormat' => '24h',
                'defaultDashboard' => 'overview'
            ]);

            $stmt->execute([
                $googleUserData['sub'],
                $googleUserData['email'],
                $googleUserData['name'],
                $googleUserData['given_name'] ?? null,
                $googleUserData['family_name'] ?? null,
                $googleUserData['picture'] ?? null,
                $invite['department'],
                $invite['role'],
                $inviteCode,
                $preferences
            ]);

            // Mark invite as accepted
            $stmt = $this->pdo->prepare("
                UPDATE user_invites 
                SET status = 'accepted', accepted_at = NOW() 
                WHERE invite_code = ?
            ");
            $stmt->execute([$inviteCode]);

            // Create session token
            $sessionToken = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));

            $stmt = $this->pdo->prepare("
                SELECT id FROM registered_users WHERE google_id = ?
            ");
            $stmt->execute([$googleUserData['sub']]);
            $userId = $stmt->fetchColumn();

            $stmt = $this->pdo->prepare("
                INSERT INTO user_sessions (user_id, session_token, expires_at, ip_address, user_agent)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $userId,
                $sessionToken,
                $expiresAt,
                $_SERVER['REMOTE_ADDR'] ?? null,
                $_SERVER['HTTP_USER_AGENT'] ?? null
            ]);

            $this->pdo->commit();

            return [
                'success' => true,
                'user_id' => $userId,
                'session_token' => $sessionToken,
                'expires_at' => $expiresAt
            ];

        } catch (Exception $e) {
            $this->pdo->rollBack();
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function revokeInvite($inviteCode) {
        if (!$this->pdo) {
            return ['success' => false, 'error' => 'Database unavailable'];
        }

        try {
            $stmt = $this->pdo->prepare("
                UPDATE user_invites SET status = 'revoked' WHERE invite_code = ?
            ");
            $stmt->execute([$inviteCode]);

            return ['success' => true, 'message' => 'Invite revoked successfully'];

        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function getRegisteredUsers() {
        if (!$this->pdo) {
            return ['success' => false, 'error' => 'Database unavailable'];
        }

        try {
            $stmt = $this->pdo->query("
                SELECT u.*, i.invite_code, i.created_by as invited_by
                FROM registered_users u
                LEFT JOIN user_invites i ON u.invite_code = i.invite_code
                ORDER BY u.created_at DESC
            ");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($users as &$user) {
                $user['preferences'] = json_decode($user['preferences'], true);
                unset($user['google_id']); // Don't expose Google ID
            }

            return ['success' => true, 'users' => $users];

        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    private function generateInviteLink($inviteCode) {
        $baseUrl = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
        return $protocol . $baseUrl . "/?invite=" . $inviteCode;
    }
}

// Handle the request
try {
    $method = $_SERVER['REQUEST_METHOD'];
    $inviteManager = new InviteManager();

    switch ($method) {
        case 'GET':
            if (isset($_GET['action'])) {
                switch ($_GET['action']) {
                    case 'validate':
                        $inviteCode = $_GET['invite_code'] ?? '';
                        echo json_encode($inviteManager->validateInvite($inviteCode));
                        break;
                    case 'users':
                        echo json_encode($inviteManager->getRegisteredUsers());
                        break;
                    default:
                        $status = $_GET['status'] ?? null;
                        echo json_encode($inviteManager->getInvites($status));
                }
            } else {
                echo json_encode($inviteManager->getInvites());
            }
            break;

        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (isset($input['action'])) {
                switch ($input['action']) {
                    case 'create':
                        echo json_encode($inviteManager->createInvite($input));
                        break;
                    case 'accept':
                        $inviteCode = $input['invite_code'] ?? '';
                        $googleUserData = $input['google_user_data'] ?? [];
                        echo json_encode($inviteManager->acceptInvite($inviteCode, $googleUserData));
                        break;
                    default:
                        echo json_encode(['success' => false, 'error' => 'Invalid action']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Action required']);
            }
            break;

        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);
            $inviteCode = $input['invite_code'] ?? '';
            echo json_encode($inviteManager->revokeInvite($inviteCode));
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error',
        'message' => $e->getMessage()
    ]);
}
?>
