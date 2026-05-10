<?php

require_once 'helpers.php';
setCORSHeaders();

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

$columns = "id, name, email, role, created_at";

$roleFilter = isset($_GET['role']) ? trim($_GET['role']) : null;
$appliedFilter = 'all';

if ($roleFilter !== null && in_array($roleFilter, ['admin', 'user'])) {
    $query = "SELECT $columns FROM users WHERE role = ? ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$roleFilter]);
    $appliedFilter = $roleFilter;
} else {
    $query = "SELECT $columns FROM users ORDER BY created_at DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
}

$users = $stmt->fetchAll();

sendJSON([
    'success' => true,
    'count' => count($users),
    'filter' => $appliedFilter,
    'users' => $users
], 200);
