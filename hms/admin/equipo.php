<?php
include('include/config.php');

if (isset($_GET['codigo_equipo'])) {
    $codigo_equipo = $_GET['codigo_equipo'];

    $sql_equipo = "SELECT * FROM equipos WHERE codigo_equipo='$codigo_equipo'";
    $result_equipo = mysqli_query($con, $sql_equipo);

    if ($result_equipo && mysqli_num_rows($result_equipo) > 0) {
        $equipo = mysqli_fetch_assoc($result_equipo);

        echo "<h1>Detalles del Equipo</h1>";
        echo "<p>Código: " . $equipo['codigo_equipo'] . "</p>";
        echo "<p>Equipo: " . $equipo['equipo'] . "</p>";
        echo "<p>Fabricante: " . $equipo['fabricante'] . "</p>";
        echo "<p>Modelo: " . $equipo['modelo'] . "</p>";

        // Obtener el id del equipo
        $equipo_id = $equipo['id']; 

        $sql_mantenimientos = "SELECT * FROM planes_mantenimiento WHERE equipo_id='$equipo_id' AND estado='Abierto'";
        $result_mantenimientos = mysqli_query($con, $sql_mantenimientos);

        if ($result_mantenimientos && mysqli_num_rows($result_mantenimientos) > 0) {
            echo "<h2>Planes de Mantenimiento Abiertos</h2>";
            while ($mantenimiento = mysqli_fetch_assoc($result_mantenimientos)) {
                echo "<p>Tipo: " . $mantenimiento['tipo'] . " - Fecha: " . $mantenimiento['fecha'] . "</p>";
            }
        } else {
            echo "<p>No se encontraron planes de mantenimiento abiertos.</p>";
        }

        $sql_ordenes = "SELECT * FROM appointment WHERE equipo='$equipo_id'";
        $result_ordenes = mysqli_query($con, $sql_ordenes);

        if ($result_ordenes && mysqli_num_rows($result_ordenes) > 0) {
            echo "<h2>Órdenes Asociadas</h2>";
            while ($orden = mysqli_fetch_assoc($result_ordenes)) {
                echo "<p>ID Orden: " . $orden['id'] . " - Descripción: " . $orden['descripcion_trabajo'] . " - Fecha: " . $orden['fecha'] . "</p>";
            }
        } else {
            echo "<p>No se encontraron órdenes asociadas.</p>";
        }
    } else {
        echo "<p>No se encontró el equipo con el código proporcionado.</p>";
    }
} else {
    echo "<p>No se proporcionó un código de equipo.</p>";
}

mysqli_close($con);
?>