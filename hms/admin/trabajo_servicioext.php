<!--ORDENES COMPLETADAS-->

<?php
session_start();
include('include/config.php');
include('include/checklogin.php');
check_login();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Patronus | OS completadas</title>

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
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        th,
        td {
            padding: 12px 15px;
            text-align: left;
        }

        th {
            background-color: rgb(82, 183, 136);
            color: white;
            font-weight: bold;
            text-transform: uppercase;
        }

        tr {
            background-color: #f8f8f8;
            transition: background-color 0.3s;
        }

        tr:nth-child(even) {
            background-color: #f1f1f1;
        }

        tr:hover {
            background-color: #f2f2f2;
        }

        td {
            border-bottom: 1px solid #ddd;
        }

        button {
            background-color: rgb(82, 183, 136);
            color: white;
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 4px;
            font-size: 14px;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: rgb(27, 67, 50);
        }

        #detallesModal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }

        #detallesModal div {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }

        #detallesModal span {
            color: red;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
    <div id="app">
        <?php include('include/sidebar.php'); ?>
        <div class="app-content">

            <?php include('include/header.php'); ?>

            <!-- end: TOP NAVBAR -->
            <div class="main-content">
                <div class="wrap-content container" id="container">
                    <!-- start: PAGE TITLE -->
                    <section id="page-title">
                        <div class="row">
                            <div class="col-sm-8">
                                <h1 class="mainTitle">Trabajos realizados</h1>
                            </div>
                            <ol class="breadcrumb">
                                <li>
                                    <span>Admin</span>
                                </li>
                                <li class="active">
                                    <span>Manage Doctors</span>
                                </li>
                            </ol>
                        </div>
                    </section>
                    <!-- end: PAGE TITLE -->
                    <!-- start: Body -->
                    <div class="container-fluid container-fullw bg-white">
                        <div class="row">
                            <div class="col-md-12">
                                <?php
                                $sql_completadas = "SELECT * FROM orden_correctiva";
                                $result = $con->query($sql_completadas);

                                if ($result->num_rows > 0) {
                                    echo "<table border='1'>
									<tr>
										<th>ID</th>
										<th>Equipo</th>
										<th>Modelo</th>
										<th>Número de Serie</th>
										<th>Código</th>
										<th>Descripción</th>
										<th>Fecha</th>
										<th>Creado en</th>
										<th>Estado</th>
										<th>Detalles de Acción</th>
										<th>Fecha de Acción</th>
									</tr>";

                                    while ($row = $result->fetch_assoc()) {
                                        echo "<tr>
										<td>" . $row['id'] . "</td>
										<td>" . $row['equipo'] . "</td>
										<td>" . $row['modelo'] . "</td>
										<td>" . $row['numero_serie'] . "</td>
										<td>" . $row['codigo'] . "</td>
										<td>" . $row['descripcion'] . "</td>
										<td>" . $row['fecha'] . "</td>
										<td>" . $row['created_at'] . "</td>
										<td>" . $row['estado'] . "</td>
										<td>" . $row['detalles_accion'] . "</td>
										<td>" . $row['fecha_accion'] . "</td>
										</tr>";
                                    }

                                    echo "</table>";
                                } else {
                                    echo "No hay órdenes completadas.";
                                }

                                $con->close();
                                ?>

                                <!-- Modal para mostrar detalles de la solicitud -->
                                <div id="detallesModal" style="display:none; position:fixed; z-index:1; padding-top:100px; left:0; top:0; width:100%; height:100%; overflow:auto; background-color:rgb(0,0,0); background-color:rgba(0,0,0,0.4);">
                                    <div style="background-color:#fefefe; margin:auto; padding:20px; border:1px solid #888; width:80%;">
                                        <span style="color:red; float:right; font-size:28px; font-weight:bold; cursor:pointer;" onclick="cerrarModal()">&times;</span>
                                        <h2>Detalles de la Solicitud</h2>
                                        <div id="modalContenido"></div>
                                    </div>
                                </div>

                                <script>
                                    function verDetalles(id) {
                                        // Hacer una solicitud AJAX para obtener los detalles de la solicitud
                                        var xhr = new XMLHttpRequest();
                                        xhr.open('GET', 'ver_detalles.php?id=' + id, true);
                                        xhr.onload = function() {
                                            if (this.status == 200) {
                                                // Mostrar el contenido en el modal
                                                document.getElementById('modalContenido').innerHTML = this.responseText;
                                                document.getElementById('detallesModal').style.display = 'block';
                                            }
                                        };
                                        xhr.send();
                                    }

                                    function cerrarModal() {
                                        document.getElementById('detallesModal').style.display = 'none';
                                    }
                                </script>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end: body -->
            <!-- end: SELECT BOXES -->

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
    </script>
    <!-- end: JavaScript Event Handlers for this page -->
    <!-- end: CLIP-TWO JAVASCRIPTS -->
</body>

</html>