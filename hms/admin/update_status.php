<?php
session_start();
include('include/config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];

    if (isset($id)) {

        $sql = "UPDATE appointment SET estado = 'aceptada' WHERE id = ?";
        if ($stmt = $con->prepare($sql)) {
            $stmt->bind_param("i", $id);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Solicitud aceptada con éxito.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'No se pudo aceptar la solicitud.']);
            }

            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'ID inválido.']);
    }
}
?>