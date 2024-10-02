<?php
session_start();
error_reporting(0);
include('include/config.php');  // Conexión a la base de datos
include('include/checklogin.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $request_id = $_POST['request_id'];
    $action = $_POST['action'];

    if ($action == 'accept') {
        // Actualizar el estado a 'Aceptada'
        $query = "UPDATE appointment SET aceptacion = 'Aceptada' WHERE id = '$request_id'";
    } else if ($action == 'deny') {
        // Actualizar el estado a 'Rechazada'
        $query = "UPDATE appointment SET aceptacion = 'Rechazada' WHERE id = '$request_id'";
    }

    if (mysqli_query($conn, $query)) {
        // Redirigir al ingeniero a una página de éxito o lista de solicitudes
        header("Location: appointment-history.php");
        exit();
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
    }
}
?>