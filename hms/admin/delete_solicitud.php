<?php
include('include/config.php');

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);

    // Consulta para eliminar la solicitud
    $sql = "DELETE FROM appointment WHERE id = '$id'";

    if (mysqli_query($con, $sql)) {
        echo json_encode(['success' => true, 'message' => 'Solicitud rechazada y eliminada con éxito.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar la solicitud.']);
    }
}
?>