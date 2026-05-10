<?php

require_once 'helpers.php';
setCORSHeaders();

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
if ($input === null) {
    $input = $_POST;
}

$requiredFields = ['name', 'email', 'password', 'role'];
$missingField = validateRequired($requiredFields, $input);
if ($missingField !== null) {
    sendJSON(['error' => "Field $missingField is required"], 400);
}

$name = trim($input['name']);
$email = trim($input['email']);
$password = $input['password'];
$role = $input['role'];

if (!isEmailValid($email)) {
    sendJSON(['error' => 'Invalid email format'], 400);
}

if (!in_array($role, ['admin', 'user'])) {
    sendJSON(['error' => 'Invalid role'], 400);
}

if ($role === 'admin') {
    $adminCount = getAdminCount($pdo);
    if ($adminCount >= 1) {
        sendJSON(['error' => 'An admin already exists'], 409);
    }
}

$existingUser = findUserByEmail($pdo, $email);
if ($existingUser !== false) {
    sendJSON(['error' => 'Email already registered'], 409);
}

if (strlen($password) < 6) {
    sendJSON(['error' => 'Password must be at least 6 characters'], 400);
}

$userId = createUser($pdo, $name, $email, $password, $role);

sendJSON([
    'success' => true,
    'message' => 'Registration successful',
    'id' => $userId
], 201);
