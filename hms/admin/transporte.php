<!-- TRANSPORTE EQUIPOS-->

<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

if (isset($_POST['buscar_equipo'])) {
    $numero_serie = $_POST['numero_serie'];

    // Consulta para buscar el equipo en la tabla "equipos"
    $query = "SELECT id, equipo, modelo, numero_serie, codigo_equipo FROM equipos WHERE numero_serie = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $numero_serie);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si se encontró el equipo
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $codigo_equipo = $row['codigo_equipo'];  // Cambiar 'id' por 'codigo_equipo'
        $nombre = $row['equipo'];
        $modelo = $row['modelo'];
        $numero_serie = $row['numero_serie'];


        // Mostrar la información del equipo
        $equipo_info = "
        <div class='equipo-info card'>
            <div class='card-header'>
                <h5 class='card-title'>Información del Equipo</h5>
            </div>
            <div class='card-body'>
                <p><strong>Nombre: </strong>{$nombre}</p>
                <p><strong>Modelo: </strong>{$modelo}</p>
                <p><strong>Número de serie: </strong>{$numero_serie}</p>
                <p><strong>Código: </strong>{$codigo_equipo}</p>
            </div>
        </div>";
    } else {
        $equipo_info = "<p style='color: red;'>Equipo no encontrado.</p>";
    }
}

if (isset($_POST['ubicacion'])) {
    $ubicacion = $_POST['ubicacion'];
    $codigo_equipo = $_POST['equipo_id'];
    date_default_timezone_set('America/Argentina/Buenos_Aires');  // Establece tu zona horaria correcta
    $fecha = date('Y-m-d H:i:s');


    // Verificar que codigo_equipo no esté vacío
    if (empty($codigo_equipo)) {
        echo "Error: Código del equipo no proporcionado.";
        exit;
    }

    // Obtener el ID del equipo desde la tabla equipos
    $query = "SELECT id FROM equipos WHERE codigo_equipo = ?";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $codigo_equipo);
    $stmt->execute();
    $stmt->bind_result($equipo_id);
    $stmt->fetch();
    $stmt->close();

    if (empty($equipo_id)) {
        echo "Error: Equipo no encontrado.";
        exit;
    }

    // Insertar la ubicación en la tabla historial_ubicaciones
    $query = "INSERT INTO historial_ubicaciones (equipo_id, ubicacion, fecha) VALUES (?, ?, ?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param("iss", $equipo_id, $ubicacion, $fecha);
    $execute_result = $stmt->execute();

    // Verificar si la consulta se ejecutó correctamente
    if ($execute_result) {
        echo "Ubicación guardada exitosamente.";
    } else {
        echo "Error al guardar la ubicación: " . $stmt->error;
    }
    exit;
}
// Obtener el historial de ubicaciones
$historial_ubicaciones = "";
if (isset($codigo_equipo)) {
    $query = "SELECT ubicacion, fecha FROM historial_ubicaciones WHERE equipo_id = (SELECT id FROM equipos WHERE codigo_equipo = ?)";
    $stmt = $con->prepare($query);
    $stmt->bind_param("s", $codigo_equipo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $historial_ubicaciones = "
        <div class='historial-ubicaciones card mt-3'>
            <div class='card-header'>
                <h5 class='card-title'>Historial de Ubicaciones</h5>
            </div>
            <div class='card-body'>
                <table class='table table-striped'>
                    <thead>
                        <tr>
                            <th>Ubicación</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>";

        // Recorrer los resultados y agregarlos a la tabla
        while ($row = $result->fetch_assoc()) {
            $historial_ubicaciones .= "
                <tr>
                    <td>{$row['ubicacion']}</td>
                    <td>{$row['fecha']}</td>
                </tr>";
        }

        $historial_ubicaciones .= "
                    </tbody>
                </table>
            </div>
        </div>";
    } else {
        $historial_ubicaciones = "<p>No hay historial de ubicaciones para este equipo.</p>";
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Patronus | Transporte</title>

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha384-<your-integrity-value>" crossorigin="anonymous">


    <style>
        /* General */
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
        }

        h1,
        h5 {
            color: #333;
        }

        label {
            font-weight: bold;
            color: #333;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        button.btn-primary {
            background-color: #527a63;
            color: white;
        }

        button.btn-primary:hover {
            background-color: #0056b3;
        }

        button.btn-warning {
            background-color: #ffc107;
            color: black;
        }

        button.btn-warning:hover {
            background-color: #e0a800;
        }

        button.btn-secondary {
            background-color: #6c757d;
            color: white;
        }

        button.btn-secondary:hover {
            background-color: #5a6268;
        }

        /* Modal */
        .modal-content {
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
            border-bottom: none;
        }

        .modal-footer {
            border-top: none;
        }

        .modal-title {
            color: #333;
        }

        .circuit-container {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            margin-top: 20px;
        }

        .step {
            text-align: center;
            width: 100px;
            padding: 10px;
            border: 2px dashed #ccc;
            border-radius: 10px;
            cursor: pointer;
            transition: border-color 0.3s ease-in-out;
        }

        .step:hover {
            background-color: #f0f0f0;
            border-color: #007bff;
        }

        .step .icon {
            font-size: 36px;
            margin-bottom: 10px;
        }

        .status-message {
            text-align: center;
            font-size: 16px;
            color: #666;
            margin-top: 20px;
        }

        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #00ff6a;
            color: white;
        }

        td {
            background-color: #f9f9f9;
        }

        tr:nth-child(even) td {
            background-color: #f2f2f2;
        }

        .card {
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            background-color: #00ff6a;
            color: white;
            padding: 10px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .card-title {
            margin: 0;
            font-size: 1.5rem;
        }

        .card-body {
            padding: 15px;
            font-size: 1rem;
        }
    </style>

</head>

<body>
    <div id="app">
        <?php include('include/sidebar.php'); ?>
        <div class="app-content">
            <?php include('include/header.php'); ?>
            <div class="main-content">
                <div class="wrap-content container" id="container">
                    <section id="page-title">
                        <div class="row">
                            <div class="col-sm-8">
                                <div class="container">

                                    <form method="POST" action="">
                                        <div class="form-group">
                                            <label for="numero_serie">Número de Serie del Equipo:</label>
                                            <input type="text" id="numero_serie" name="numero_serie" class="form-control" required>
                                        </div>
                                        <button type="submit" name="buscar_equipo" class="btn btn-primary">Buscar Equipo</button>
                                    </form>

                                    <!-- Mostrar información del equipo si existe -->
                                    <?php if (isset($equipo_info)): ?>
                                        <?php echo $equipo_info; ?>
                                        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#transporteModal">Transporte</button>
                                    <?php endif; ?>
                                </div>

                                <!-- Mostrar historial de ubicaciones -->
                                <?php if (isset($historial_ubicaciones)): ?>
                                    <?php echo $historial_ubicaciones; ?>
                                <?php endif; ?>

                                <!-- Modal -->
                                <div class="modal fade" id="transporteModal" tabindex="-1" role="dialog" aria-labelledby="transporteModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="transporteModalLabel">Seleccionar Ubicación</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="circuit-container">
                                                    <div class="step" id="hospital" onclick="selectLocation('hospital')">
                                                        <i class="fas fa-hospital-alt icon"></i>
                                                        <p>Hospital</p>
                                                    </div>
                                                    <div class="step" id="truck" onclick="selectLocation('camion')">
                                                        <i class="fas fa-truck icon"></i>
                                                        <p>Camión</p>
                                                    </div>
                                                    <div class="step" id="factory" onclick="selectLocation('proveedor')">
                                                        <i class="fas fa-industry icon"></i>
                                                        <p>Proveedor</p>
                                                    </div>
                                                </div>
                                                <div class="status-message">
                                                    <p id="status">Selecciona la ubicación del equipo.</p>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>

        <script>
            function selectLocation(location) {
                const statusMessage = document.getElementById('status');
                let ubicacionText = '';

                // Mensaje según la ubicación seleccionada
                if (location === 'hospital') {
                    ubicacionText = 'El equipo está en el Hospital.';
                } else if (location === 'camion') {
                    ubicacionText = 'El equipo está en camino (Camión).';
                } else if (location === 'proveedor') {
                    ubicacionText = 'El equipo ha llegado a la Fábrica.';
                }

                // Mostrar el mensaje correspondiente
                statusMessage.textContent = ubicacionText;

                // Restablecer los estilos de todos los iconos
                document.querySelectorAll('.step').forEach(step => {
                    step.style.border = '2px dashed #ccc'; 
                });

                // Marcar el icono seleccionado
                const selectedStep = document.getElementById(location);
                if (selectedStep) {
                    selectedStep.style.border = '2px solid blue'; 
                }

                // Enviar la ubicación al servidor usando AJAX
                const equipoId = <?php echo json_encode($codigo_equipo); ?>; 

                $.ajax({
                    url: '', 
                    type: 'POST',
                    data: {
                        ubicacion: location,
                        equipo_id: equipoId 
                    },
                    success: function(response) {
                        console.log(response);
                    },
                    error: function() {
                        console.log("Error en la solicitud AJAX.");
                    }
                });

            }
        </script>


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