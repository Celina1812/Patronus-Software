<?php
session_start();
error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Patronus</title>

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>

<body>
    <div id="app">
        <?php include('include/sidebar.php'); ?>
        <div class="app-content">
            <?php include('include/header.php'); ?>
            <div class="main-content">
                <div class="wrap-content container" id="container">
                    <!-- start: PAGE TITLE -->
                    <section id="page-title">
                        <div class="row">
                            <div class="col-sm-8">
                                <h1 class="mainTitle">Búsqueda equipos</h1>
                            </div>
                            <ol class="breadcrumb">
                                <li>
                                    <span>Admin</span>
                                </li>
                                <li class="active">
                                    <span>View Patients</span>
                                </li>
                            </ol>
                        </div>
                    </section>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 20px;
                        }

                        .container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .card {
                            background-color: white;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            padding: 40px;
                            margin: 20px;
                            max-width: 1000px;
                            width: 100%;
                            text-align: left;
                        }

                        .card h2 {
                            font-size: 30px;
                            color: #333;
                            margin-bottom: 20px;
                        }

                        .card p {
                            font-size: 18px;
                            color: #666;
                            margin-bottom: 15px;
                        }

                        .label {
                            font-weight: bold;
                            color: #333;
                        }

                        .codigo {
                            background-color: #2196F3;
                            color: white;
                            padding: 10px;
                            border-radius: 4px;
                            display: inline-block;
                            margin-bottom: 20px;
                            font-size: 22px;
                        }
                    </style>
                    <?php
                    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                        $codigo_equipo = $_POST['codigo_equipo'];

                        $sql = "
                            SELECT e.*, pm.fecha_programada 
                            FROM equipos e
                            LEFT JOIN planes_mantenimiento pm ON e.id = pm.equipo_id
                            WHERE e.codigo_equipo = '$codigo_equipo'
                        ";
                        $result = mysqli_query($con, $sql);

                        if ($result && mysqli_num_rows($result) > 0) {
                            $row = mysqli_fetch_assoc($result);

                            echo "<div class='card'>";
                            echo "<h2 class='codigo'>Código: {$row['codigo_equipo']}</h2>";
                            echo "<p><span class='label'>Situación:</span> {$row['situacion']}</p>";
                            echo "<p><span class='label'>Equipo:</span> {$row['equipo']}</p>";
                            echo "<p><span class='label'>Modelo:</span> {$row['modelo']}</p>";
                            echo "<p><span class='label'>Fabricante:</span> {$row['fabricante']}</p>";
                            echo "<p><span class='label'>Registro ANMAT:</span> {$row['reg_anmat']}</p>";
                            echo "<p><span class='label'>Criticidad:</span> {$row['criticidad']}</p>";
                            echo "<p><span class='label'>Sector:</span> {$row['sector']}</p>";
                            echo "<p><span class='label'>Número de Serie:</span> {$row['numero_serie']}</p>";
                            echo "<p><span class='label'>Proveedor:</span> {$row['proveedor']}</p>";
                            echo "<p><span class='label'>Garantía Original:</span> {$row['garantia_original']}</p>";
                            echo "<p><span class='label'>Fecha de Registro:</span> {$row['fecha_registro']}</p>";
                            echo "<p><span class='label'>Fecha de Fabricación:</span> {$row['fecha_fabricacion']}</p>";
                            echo "<p><span class='label'>Fecha de Adquisición:</span> {$row['fecha_adquisicion']}</p>";
                            echo "<p><span class='label'>Fecha de Instalación:</span> {$row['fecha_instalacion']}</p>";

                            // Mostrar la fecha de mantenimiento preventivo
                            if (!empty($row['fecha_programada'])) {
                                echo "<p><span class='label'>Fecha de Mantenimiento Programado:</span> {$row['fecha_programada']}</p>";
                            } else {
                                echo "<p><span class='label'>Fecha de Mantenimiento Programado:</span> No disponible</p>";
                            }

                            echo "</div>";
                        } else {
                            echo "<p>No se encontró ningún equipo con el código proporcionado.</p>";
                        }
                    }
                    $con->close();
                    ?>
                </div>
            </div>
        </div>
    </div>


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
    </script>
    <!-- end: JavaScript Event Handlers for this page -->
    <!-- end: CLIP-TWO JAVASCRIPTS -->
</body>

</html>