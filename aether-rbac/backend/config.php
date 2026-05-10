<?php


$host = 'sql113.infinityfree.com';
$dbname = 'if0_41880099_user_management';
$username = 'if0_41880099';
$password = '2o9qI2O9HhbZX2w';
try {
  
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
  
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch(PDOException $e) {

    die("Connection failed: " . $e->getMessage());
}

return $pdo;
