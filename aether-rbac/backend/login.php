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

$requiredFields = ['email', 'password'];
$missingField = validateRequired($requiredFields, $input);
if ($missingField !== null) {
    sendJSON(['error' => "Field $missingField is required"], 400);
}

$email = trim($input['email']);
$password = $input['password'];

if (!isEmailValid($email)) {
    sendJSON(['error' => 'Invalid email format'], 400);
}

$user = findUserByEmail($pdo, $email);
if ($user === false) {
    sendJSON(['error' => 'Invalid email or password'], 401);
}

if (!password_verify($password, $user['password'])) {
    sendJSON(['error' => 'Invalid email or password'], 401);
}

session_start();
$_SESSION['user_id'] = $user['id'];
$_SESSION['role'] = $user['role'];

sendJSON([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role']
    ]
], 200);
