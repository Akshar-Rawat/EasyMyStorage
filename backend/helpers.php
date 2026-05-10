<?php


function sendJSON($data, $code = 200) {
    header('Content-Type: application/json');
    http_response_code($code);
    echo json_encode($data);
    exit;
}


function setCORSHeaders() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode([]);
        exit;
    }
}

set_exception_handler(function($e) {
    sendJSON(['error' => 'Server error: ' . $e->getMessage()], 500);
});

function validateRequired($fields, $data) {
    foreach ($fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            return $field;
        }
    }
    return null;
}


function isEmailValid($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}


function getAdminCount($pdo) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE role = 'admin'");
    $stmt->execute();
    return (int)$stmt->fetchColumn();
}


function findUserByEmail($pdo, $email) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    return $stmt->fetch();
}

function createUser($pdo, $name, $email, $password, $role) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword, $role]);
    return $pdo->lastInsertId();
}
