<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

$mensaje = '';

if (isset($_POST['submit'])) {
    // Recuperamos los valores del formulario
    $equipo = isset($_POST['equipo']) ? $_POST['equipo'] : '';
    $modelo = isset($_POST['modelo']) ? $_POST['modelo'] : '';
    $numero_serie = isset($_POST['numero_serie']) ? $_POST['numero_serie'] : '';
    $codigo = isset($_POST['codigo']) ? $_POST['codigo'] : '';
    $descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : '';
    $fecha = isset($_POST['fecha']) ? $_POST['fecha'] : '';

    $query = mysqli_query($con, "INSERT INTO orden_correctiva (equipo, modelo, numero_serie, codigo, descripcion, fecha) 
                                 VALUES ('$equipo', '$modelo', '$numero_serie', '$codigo', '$descripcion', '$fecha')");

    if ($query) {
        $mensaje = "success"; 
    } else {
        $mensaje = "error"; 
    }
}

$msg1 = isset($_SESSION['msg1']) ? $_SESSION['msg1'] : '';
$_SESSION['msg1'] = ""; 
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>Patronus | Orden de servicio</title>

    <link href="http://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendor/fontawesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendor/themify-icons/themify-icons.min.css">
    <link href="vendor/animate.css/animate.min.css" rel="stylesheet" media="screen">
    <link href="vendor/perfect-scrollbar/perfect-scrollbar.min.css" rel="stylesheet" media="screen">
    <link href="vendor/switchery/switchery.min.css" rel="stylesheet" media="screen">
    <link href="vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" media="screen">
    <link href="vendor/select2/select2.min.css" rel="stylesheet" media="screen">
    <link href="vendor/bootstrap-datepicker/bootstrap-datepicker3.standalone.min.css" rel="stylesheet" media="screen">
    <link href="vendor/bootstrap-timepicker/bootstrap-timepicker.min.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/plugins.css">
    <link rel="stylesheet" href="assets/css/themes/theme-1.css" id="skin_color" />
    <link rel="icon" type="image/png" sizes="32x32" href="/hospital/hospital/images/Patronus.png">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


</head>

<body>
    <?php
    // Mostrar la alerta de éxito o error
    if ($mensaje === "success") {
        echo "<script>
            Swal.fire({
                icon: 'success',
                title: '¡Solicitud enviada!',
                text: 'Solicitud enviada exitosamente.',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(function() {
                window.location = 'os_correctiva.php'; // Cambié la redirección
            });
        </script>";
    } elseif ($mensaje === "error") {
        echo "<script>
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al enviar la solicitud: " . mysqli_error($con) . "',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            });
        </script>";
    }
    ?>

    <div id="app">
        <?php include('include/sidebar.php'); ?>
        <div class="app-content">
            <?php include('include/header.php'); ?>
            <div class="main-content">
                <div class="wrap-content container" id="container">
                    <section id="page-title">
                        <div class="row">
                            <div class="col-sm-8">
                                <h1 class="mainTitle">Orden de servicio para servicio externo🚚</h1>
                            </div>
                            <ol class="breadcrumb">
                                <li>
                                    <span>Mi cuenta</span>
                                </li>
                                <li class="active">
                                    <span>Crear orden de servicio</span>
                                </li>
                            </ol>
                        </div>
                    </section>
                    <div class="container-fluid container-fullw bg-white">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row margin-top-30">
                                    <div class="col-lg-8 col-md-12">
                                        <div class="panel panel-white">
                                            <div class="panel-heading">
                                                <h5 class="panel-title">Crear orden de servicio</h5>
                                            </div>
                                            <div class="panel-body">
                                                <p style="color:red;">
                                                    <?php echo htmlentities($msg1); ?>
                                                </p>
                                                <form method="post">
                                                    <!-- Campo para el equipo -->
                                                    <div class="form-group">
                                                        <label for="equipo">Equipo</label>
                                                        <input type="text" name="equipo" class="form-control" placeholder="Nombre del equipo" required>
                                                    </div>

                                                    <!-- Campo para el modelo -->
                                                    <div class="form-group">
                                                        <label for="modelo">Modelo</label>
                                                        <input type="text" name="modelo" class="form-control" placeholder="Modelo del equipo" required>
                                                    </div>

                                                    <!-- Campo para el número de serie -->
                                                    <div class="form-group">
                                                        <label for="numero_serie">Número de Serie</label>
                                                        <input type="text" name="numero_serie" class="form-control" placeholder="Número de serie" required>
                                                    </div>

                                                    <!-- Campo para el código -->
                                                    <div class="form-group">
                                                        <label for="codigo">Código</label>
                                                        <input type="text" name="codigo" class="form-control" placeholder="Código del equipo" required>
                                                    </div>

                                                    <!-- Campo para la descripción del trabajo -->
                                                    <div class="form-group">
                                                        <label for="descripcion">Descripción del Trabajo</label>
                                                        <textarea name="descripcion" class="form-control" placeholder="Descripción del trabajo" required></textarea>
                                                    </div>

                                                    <!-- Campo para la fecha -->
                                                    <div class="form-group">
                                                        <label for="fecha">Fecha</label>
                                                        <input type="date" name="fecha" class="form-control" required>
                                                    </div>

                                                    <!-- Botón de envío -->
                                                    <button type="submit" name="submit" class="btn btn-primary">Crear Orden Correctiva</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- start: FOOTER -->
        <?php include('include/footer.php'); ?>
        <!-- end: FOOTER -->

        <!-- start: SETTINGS -->
        <?php include('include/setting.php'); ?>

        <!-- end: SETTINGS -->

    </div>
    <!-- start: MAIN JAVASCRIPTS -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="vendor/modernizr/modernizr.js"></script>
    <script src="vendor/jquery-cookie/jquery.cookie.js"></script>
    <script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="vendor/switchery/switchery.min.js"></script>
    <!-- end: MAIN JAVASCRIPTS -->
    <!-- start: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
    <script src="vendor/maskedinput/jquery.maskedinput.min.js"></script>
    <script src="vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    <script src="vendor/autosize/autosize.min.js"></script>
    <script src="vendor/selectFx/classie.js"></script>
    <script src="vendor/selectFx/selectFx.js"></script>
    <script src="vendor/select2/select2.min.js"></script>
    <script src="vendor/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
    <script src="vendor/bootstrap-timepicker/bootstrap-timepicker.min.js"></script>
    <!-- end: JAVASCRIPTS REQUIRED FOR THIS PAGE ONLY -->
    <!-- start: CLIP-TWO JAVASCRIPTS -->
    <script src="assets/js/main.js"></script>
    <!-- start: JavaScript Event Handlers for this page -->
    <script src="assets/js/form-elements.js"></script>
    <script>
        jQuery(document).ready(function() {
            Main.init();
            FormElements.init();
        });

        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',
            startDate: '-3d'
        });
    </script>
    <script type="text/javascript">
        $('#timepicker1').timepicker();
    </script>
    <!-- end: JavaScript Event Handlers for this page -->
    <!-- end: CLIP-TWO JAVASCRIPTS -->

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>

</body>

</html>