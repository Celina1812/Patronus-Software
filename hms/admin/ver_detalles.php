<?php
include('include/config.php');

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $sql = "SELECT * FROM appointment WHERE id = ? AND estado = 'completada'";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<p><strong>ID:</strong> " . $row['id'] . "</p>";
        echo "<p><strong>Equipo:</strong> " . $row['equipo'] . "</p>";
        echo "<p><strong>Prioridad:</strong> " . $row['prioridad'] . "</p>";
        echo "<p><strong>Responsable:</strong> " . $row['responsable'] . "</p>";
        echo "<p><strong>Complejidad:</strong> " . $row['complejidad'] . "</p>";
        echo "<p><strong>Fecha de Parada:</strong> " . $row['fecha_parada'] . "</p>";
        echo "<p><strong>Fecha de Funcionamiento:</strong> " . $row['fecha_funcion'] . "</p>";
        echo "<p><strong>Tiempo de Trabajo:</strong> " . $row['tiempo_trabajo'] . " horas</p>";
        echo "<p><strong>Descripción:</strong> " . $row['descripcion_trabajo'] . "</p>";
    } else {
        echo "No se encontraron detalles para esta solicitud.";
    }

    $stmt->close();
}

$con->close();
?>