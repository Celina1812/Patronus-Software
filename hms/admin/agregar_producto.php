<?php
session_start();
include('include/config.php');
include('include/checklogin.php');
check_login();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $codigo = $_POST['codigo_producto'];
    $descripcion = $_POST['descripcion'];
    $existencias = $_POST['existencias_iniciales'];

    $stock = $existencias;

    $query = "INSERT INTO productos (codigo_producto, descripcion, existencias_iniciales, entradas, salidas, stock) 
              VALUES ('$codigo', '$descripcion', $existencias, 0, 0, $stock)";

    if (mysqli_query($con, $query)) {
        $_SESSION['msg'] = "Producto agregado correctamente";
    } else {
        $_SESSION['msg'] = "Error al agregar el producto: " . mysqli_error($con);
    }
    header("Location: user-logs.php");
}
?>