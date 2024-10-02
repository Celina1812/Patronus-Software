<?php
session_start();
include_once('include/config.php');
include_once('include/checklogin.php');
check_login();

// Habilitar el informe de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Obtener el código del equipo que se quiere consultar
$data = json_decode(file_get_contents("php://input"), true);
$codigo_equipo = $data['codigo_equipo'];

// Validar que el código del equipo no esté vacío
if (empty($codigo_equipo)) {
    echo json_encode(["success" => false, "error" => "Código del equipo no proporcionado."]);
    exit;
}

// Consultar el ID del equipo en base al codigo_equipo
$query = "SELECT id FROM equipos WHERE codigo_equipo = ?";
$stmt = $con->prepare($query);
if (!$stmt) {
    echo json_encode(["success" => false, "error" => "Error en la consulta: " . $con->error]);
    exit;
}
$stmt->bind_param("s", $codigo_equipo);
$stmt->execute();
$stmt->bind_result($equipo_id);
$stmt->fetch();
$stmt->close();

if (empty($equipo_id)) {
    echo json_encode(["success" => false, "error" => "Equipo no encontrado."]);
    exit;
}

// 1. Consultar el historial de ubicaciones
$sql_historial = "SELECT ubicacion, fecha FROM historial_ubicaciones WHERE equipo_id = ? ORDER BY fecha ASC";
$stmt_historial = $con->prepare($sql_historial);
if (!$stmt_historial) {
    echo json_encode(["success" => false, "error" => "Error en la consulta del historial: " . $con->error]);
    exit;
}
$stmt_historial->bind_param("i", $equipo_id);
$stmt_historial->execute();
$result_historial = $stmt_historial->get_result();

$historial = [];
while ($row = $result_historial->fetch_assoc()) {
    $historial[] = $row;
}

$stmt_historial->close();

// Retornar el historial como respuesta
echo json_encode(["success" => true, "historial" => $historial]);

$con->close();
?>