<?php
session_start();
include_once('include/config.php');
include_once('include/checklogin.php');
check_login();

// Conexión a la base de datos
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $codigo = $_POST['codigo_producto'];
    $entradas = isset($_POST['entradas']) ? $_POST['entradas'] : 0;
    $salidas = isset($_POST['salidas']) ? $_POST['salidas'] : 0;

    // Obtener el producto actual
    $query = "SELECT existencias_iniciales, entradas, salidas FROM productos WHERE codigo_producto = '$codigo'";
    $result = mysqli_query($con, $query);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $nuevas_entradas = $row['entradas'] + $entradas;
        $nuevas_salidas = $row['salidas'] + $salidas;
        $nuevo_stock = $row['existencias_iniciales'] + $nuevas_entradas - $nuevas_salidas;

        // Actualizar los valores de stock
        $update_query = "UPDATE productos 
                         SET entradas = $nuevas_entradas, salidas = $nuevas_salidas, stock = $nuevo_stock 
                         WHERE codigo_producto = '$codigo'";

        if (mysqli_query($con, $update_query)) {
            $_SESSION['msg'] = "Stock actualizado correctamente";
        } else {
            $_SESSION['msg'] = "Error al actualizar el stock: " . mysqli_error($con);
        }
    } else {
        $_SESSION['msg'] = "Producto no encontrado";
    }
    header("Location: user-logs.php");
}
?>