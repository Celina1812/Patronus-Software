<?php
session_start();
include('include/config.php');

$fecha_actual = date('Y-m-d');

$query_alertas = "
    SELECT pm.*, e.equipo, e.codigo_equipo 
    FROM planes_mantenimiento pm
    JOIN equipos e ON pm.equipo_id = e.id
    WHERE pm.fecha_programada <= '$fecha_actual' AND pm.estado != 'completado'
";
$result_alertas = mysqli_query($con, $query_alertas);

$notificaciones = [];

if (mysqli_num_rows($result_alertas) > 0) {
    while ($row = mysqli_fetch_assoc($result_alertas)) {
        $notificaciones[] = "El equipo " . $row['equipo'] . " (Código: " . $row['codigo_equipo'] . ") tiene un mantenimiento programado para hoy " . $row['fecha_programada'] . ".";
    }
}

echo json_encode($notificaciones);
?>