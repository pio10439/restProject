<?php
$postData = file_get_contents('php://input');

if(isset($postData) && !empty($postData)){
    $data = json_decode($postData, true);

    $data["Imię Nazwisko"] = utf8_encode($data["Imię Nazwisko"]);
    $data["Data Ważności"] = utf8_encode($data["Data Ważności"]);

    $file = 'dane.json';

    $currentData = file_exists($file) ? file_get_contents($file) : '';

    $currentData .= json_encode($data, JSON_UNESCAPED_UNICODE) . "\n";

    file_put_contents($file, $currentData);

    $command = 'node token.js';
    $output = shell_exec($command);

    file_put_contents($file, "\n", FILE_APPEND);

    echo $output . "\n";
} else {
    echo "Błąd: brak danych.";
}
?>
