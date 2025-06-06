<?php
$host = 'mysql-tg20taps.alwaysdata.net';
$user = 'tg20taps';
$pass = 'yasuo2015';
$dbname = 'tg20taps_dulcemae';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

echo "Conectado exitosamente";
?>
