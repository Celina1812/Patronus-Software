<?php
include('include/config.php');


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $request_id = $_POST['request_id'];
    $service_details = $_POST['service_details']; 

    $query = "UPDATE appointment SET status = 'completed', descripcion_trabajo = '$service_details' WHERE id = '$request_id'";

    if (mysqli_query($conn, $query)) {
        echo "Detalles guardados con éxito.";
        header("Location: solicitudes_completadas.php");
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
    }
}
?>