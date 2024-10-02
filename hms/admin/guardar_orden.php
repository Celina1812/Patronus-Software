<?php
session_start();
include('include/config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $equipo = isset($_POST['equipo']) ? trim($_POST['equipo']) : '';
    $prioridad = isset($_POST['prioridad']) ? trim($_POST['prioridad']) : '';
    $responsable = isset($_POST['responsable']) ? trim($_POST['responsable']) : '';
    $complejidad = isset($_POST['complejidad']) ? trim($_POST['complejidad']) : '';
    $fecha_parada = isset($_POST['fecha_parada']) ? $_POST['fecha_parada'] : '';
    $fecha_funcion = isset($_POST['fecha_funcion']) ? $_POST['fecha_funcion'] : '';
    $tiempo_inicio = isset($_POST['tiempo_inicio']) ? $_POST['tiempo_inicio'] : '';
    $tiempo_fin = isset($_POST['tiempo_fin']) ? $_POST['tiempo_fin'] : '';
    $descripcion = isset($_POST['descripcion']) ? trim($_POST['descripcion']) : '';
    $codigo_producto = isset($_POST['codigo_producto']) ? trim($_POST['codigo_producto']) : '';
    $cantidad_usada = isset($_POST['cantidad_usada']) ? intval($_POST['cantidad_usada']) : 0;

    // Validar que los campos obligatorios no estén vacíos
    if (
        empty($id) || empty($equipo) || empty($prioridad) || empty($responsable) || empty($complejidad) ||
        empty($fecha_parada) || empty($fecha_funcion) || empty($tiempo_inicio) || empty($tiempo_fin) || empty($descripcion) ||
        empty($codigo_producto) || empty($cantidad_usada)
    ) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    // Validar que las fechas estén en formato correcto y la fecha de funcionamiento sea posterior a la de parada
    if (!strtotime($fecha_parada) || !strtotime($fecha_funcion) || strtotime($fecha_funcion) < strtotime($fecha_parada)) {
        echo "La fecha de vuelta a funcionamiento no puede ser anterior a la fecha de parada.";
        exit;
    }

    // Validar que el tiempo de fin sea posterior al tiempo de inicio
    if (!strtotime($tiempo_inicio) || !strtotime($tiempo_fin) || strtotime($tiempo_fin) <= strtotime($tiempo_inicio)) {
        echo "El tiempo de fin no puede ser anterior o igual al tiempo de inicio.";
        exit;
    }

    // Calcular la duración del tiempo de trabajo en horas
    $tiempo_inicio_datetime = new DateTime($tiempo_inicio);
    $tiempo_fin_datetime = new DateTime($tiempo_fin);
    $interval = $tiempo_inicio_datetime->diff($tiempo_fin_datetime);
    $tiempo_trabajo = $interval->h;

    // Actualizar la orden con los nuevos detalles del trabajo y cambiar el estado a 'completada'
    $sql_update_order = "UPDATE appointment 
                         SET 
                             equipo = ?, 
                             prioridad = ?, 
                             responsable = ?, 
                             complejidad = ?, 
                             fecha_parada = ?, 
                             fecha_funcion = ?, 
                             tiempo_trabajo = ?, 
                             descripcion_trabajo = ?, 
                             estado = 'completada',
                             updationDate = CURRENT_TIMESTAMP
                         WHERE id = ?";

    $stmt_order = $con->prepare($sql_update_order);
    if (!$stmt_order) {
        echo "Error en la preparación de la consulta: " . $con->error;
        exit;
    }

    $stmt_order->bind_param("ssssssisi", $equipo, $prioridad, $responsable, $complejidad, $fecha_parada, $fecha_funcion, $tiempo_trabajo, $descripcion, $id);

    // Ejecutar la consulta de actualización de la orden
    if ($stmt_order->execute()) {
        if ($stmt_order->affected_rows > 0) {
            // Si la orden se completó exitosamente, proceder a actualizar el stock
            $sql_update_stock = "UPDATE productos 
                                 SET salidas = salidas + ?, stock = stock - ? 
                                 WHERE codigo_producto = ?";

            $stmt_stock = $con->prepare($sql_update_stock);
            if ($stmt_stock) {
                $stmt_stock->bind_param("iis", $cantidad_usada, $cantidad_usada, $codigo_producto);
                $stmt_stock->execute();

                if ($stmt_stock->affected_rows > 0) {
                    echo "Orden completada y stock actualizado correctamente.";
                } else {
                    echo "Error al actualizar el stock. Verifica el código del producto.";
                }

                $stmt_stock->close();
            } else {
                echo "Error al preparar la actualización de stock: " . $con->error;
            }
        } else {
            echo "No se actualizó ninguna fila. Verifica que el ID de la orden sea correcto.";
        }
    } else {
        echo "Error al actualizar el estado de la orden: " . $stmt_order->error;
    }

    // Cerrar la consulta y la conexión
    $stmt_order->close();
    $con->close();
} else {
    echo "Solicitud inválida.";
}
?>