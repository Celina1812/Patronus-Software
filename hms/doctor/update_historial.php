<?php
include('include/config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $equipo_id = $_POST['equipo_id'];
    $ubicacion = $_POST['ubicacion'];
    $fecha = $_POST['fecha'];

    // Insertar un nuevo registro en el historial
    $query = "INSERT INTO historial_ubicaciones (equipo_id, ubicacion, fecha) VALUES (?, ?, ?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param("iss", $equipo_id, $ubicacion, $fecha);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Historial actualizado.";
    } else {
        echo "Error al actualizar el historial.";
    }
}
?>