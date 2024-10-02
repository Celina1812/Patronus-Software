<?php
session_start();
include('include/config.php');
include('include/checklogin.php');
check_login();

if (isset($_POST['contenido']) && !empty($_POST['contenido'])) {
    $usuario_id = $_SESSION['login']; // ID del usuario logueado
    $contenido = mysqli_real_escape_string($con, $_POST['contenido']);
    $fecha_creacion = date("Y-m-d H:i:s");

    $sql = "INSERT INTO notas (usuario_id, contenido, fecha_creacion) VALUES ('$usuario_id', '$contenido', '$fecha_creacion')";

    if ($con->query($sql) === TRUE) {
        echo "Nota guardada con éxito.";
    } else {
        echo "Error: " . $sql . "<br>" . $con->error;
    }
} else {
    echo "No se ha proporcionado contenido para la nota.";
}
?>