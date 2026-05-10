<?php
require_once 'helpers.php';
setCORSHeaders();

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['action'])) {
    sendJSON(['error' => 'Action is required'], 400);
}

$pdo = require 'config.php';

switch ($data['action']) {
    case 'delete':
        if (!isset($data['userIds']) || !is_array($data['userIds'])) {
            sendJSON(['error' => 'User IDs are required'], 400);
        }

        $placeholders = str_repeat('?,', count($data['userIds']) - 1) . '?';
        $stmt = $pdo->prepare("DELETE FROM users WHERE id IN ($placeholders)");
        $stmt->execute($data['userIds']);

        sendJSON([
            'success' => true,
            'message' => 'Users deleted successfully',
            'deletedCount' => $stmt->rowCount()
        ]);
        break;

    case 'updateRole':
        if (!isset($data['userIds']) || !is_array($data['userIds']) || !isset($data['role'])) {
            sendJSON(['error' => 'User IDs and role are required'], 400);
        }

        $placeholders = str_repeat('?,', count($data['userIds']) - 1) . '?';
        $params = [...$data['userIds'], $data['role']];
        $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id IN ($placeholders)");
        $stmt->execute($params);

        sendJSON([
            'success' => true,
            'message' => 'User roles updated successfully',
            'updatedCount' => $stmt->rowCount()
        ]);
        break;

    default:
        sendJSON(['error' => 'Invalid action'], 400);
}