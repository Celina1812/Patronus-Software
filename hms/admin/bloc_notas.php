<?php
session_start();
include('include/config.php');
include('include/checklogin.php');
check_login();

$usuario_id = $_SESSION['login']; 

// Guardar o editar nota
if (isset($_POST['guardar_nota'])) {
    $id_nota = $_POST['id_nota'] ?? null; 
    $nuevo_contenido = $_POST['nuevo_contenido'];

    if ($id_nota) {
        $sql_update = "UPDATE notas SET contenido = ? WHERE id = ? AND usuario_id = ?";
        $stmt = $con->prepare($sql_update);
        $stmt->bind_param('sis', $nuevo_contenido, $id_nota, $usuario_id);
        $stmt->execute();
    } else {
        $sql_insert = "INSERT INTO notas (contenido, usuario_id) VALUES (?, ?)";
        $stmt = $con->prepare($sql_insert);
        $stmt->bind_param('si', $nuevo_contenido, $usuario_id);
        $stmt->execute();
    }
}

if (isset($_POST['eliminar_nota'])) {
    $id_nota = $_POST['id_nota'];

    $sql_delete = "DELETE FROM notas WHERE id = ? AND usuario_id = ?";
    $stmt = $con->prepare($sql_delete);
    $stmt->bind_param('is', $id_nota, $usuario_id);
    $stmt->execute();
}

$sql = "SELECT * FROM notas WHERE usuario_id = '$usuario_id' ORDER BY fecha_creacion DESC";
$resultado = $con->query($sql);

function getRandomColor()
{
    $colors = ['#C7E4F5', '#FFE9B5', '#CDE9A4', '#F9D4D4'];
    return $colors[array_rand($colors)];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Patronus | Bloc de notas</title>

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="icon" type="image/png" sizes="32x32" href="/hospital/hospital/images/Patronus.png">
</head>

<body>
    <style>
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            padding-top: 100px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
            background-color: #fff;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 50%;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .notas-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }

        .nota-card {
            width: 250px;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #f0f0f0;
        }

        .nota-header {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .nota-body {
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1.5;
        }

        .nota-footer {
            text-align: right;
        }

        .categoria {
            font-size: 12px;
            background-color: #000;
            color: #fff;
            padding: 3px 8px;
            border-radius: 4px;
        }

        .nota-card:nth-child(1) {
            background-color: #C7E4F5;
        }

        .nota-card:nth-child(2) {
            background-color: #FFE9B5;
        }

        .nota-card:nth-child(3) {
            background-color: #CDE9A4;
        }

        .nota-card:nth-child(4) {
            background-color: #F9D4D4;
        }

        .agregar-nota-btn {
            margin-bottom: 20px;
            /* Ajusta el valor según la separación que quieras */
        }
    </style>
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
                                <h1 class="mainTitle">Bloc de notas📝</h1>
                            </div>
                            <ol class="breadcrumb">
                                <li>
                                    <span>Bloc</span>
                                </li>
                                <li class="active">
                                    <span>Notas</span>
                                </li>
                            </ol>
                        </div>
                    </section>

                    <!--START body-->
                    <!-- Sección para agregar una nueva nota -->
                    <div class="container-fluid container-fullw bg-white">
                        <div class="row mb-4">
                            <div class="col-md-12">
                                <button id="agregarNotaBtn" class="btn btn-primary agregar-nota-btn" onclick="abrirModal()">Agregar Nota</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <h2>Tus Notas</h2>

                                <div class="notas-container">
                                    <?php if ($resultado->num_rows > 0): ?>
                                        <?php while ($fila = $resultado->fetch_assoc()): ?>
                                            <div class="nota-card" style="background-color: <?php echo getRandomColor(); ?>;">
                                                <div class="nota-header">
                                                    <strong><?php echo $fila['fecha_creacion']; ?></strong>
                                                </div>
                                                <div class="nota-body">
                                                    <p><?php echo htmlspecialchars($fila['contenido']); ?></p>
                                                </div>
                                                <div class="nota-footer">

                                                    <br>
                                                    <button class="btn btn-sm btn-warning" onclick="editarNota('<?php echo $fila['id']; ?>', '<?php echo htmlspecialchars($fila['contenido']); ?>')">Editar</button>

                                                    <form method="post" class="d-inline" onsubmit="return confirm('¿Estás seguro de eliminar esta nota?');">
                                                        <input type="hidden" name="id_nota" value="<?php echo $fila['id']; ?>">
                                                        <button type="submit" name="eliminar_nota" class="btn btn-sm btn-danger">Eliminar</button>
                                                    </form>
                                                </div>
                                            </div>
                                        <?php endwhile; ?>
                                    <?php else: ?>
                                        <p>No tienes notas guardadas.</p>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="modalAgregarNota" class="modal" style="display: none;">
                        <div class="modal-content">
                            <span class="close" onclick="cerrarModal()">&times;</span>
                            <h2>Agregar / Editar Nota</h2>
                            <form method="post" action="">
                                <input type="hidden" name="id_nota" id="id_nota">
                                <div class="form-group">
                                    <label for="nuevo_contenido">Contenido:</label>
                                    <textarea class="form-control" name="nuevo_contenido" id="nuevo_contenido" rows="5" required></textarea>
                                </div>
                                <button type="submit" name="guardar_nota" class="btn btn-success">Guardar</button>
                            </form>
                        </div>
                    </div>

                    <script>
                        var modalAgregarNota = document.getElementById("modalAgregarNota");

                        function abrirModal() {
                            document.getElementById('id_nota').value = ""; // Limpiar el ID al agregar una nueva nota
                            document.getElementById('nuevo_contenido').value = ""; // Limpiar el contenido
                            modalAgregarNota.style.display = "block";
                        }

                        function cerrarModal() {
                            modalAgregarNota.style.display = "none";
                        }

                        window.onclick = function(event) {
                            if (event.target == modalAgregarNota) {
                                cerrarModal();
                            }
                        }

                        function editarNota(id, contenido) {
                            document.getElementById('id_nota').value = id;
                            document.getElementById('nuevo_contenido').value = contenido;
                            modalAgregarNota.style.display = "block";
                        }
                    </script>
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
    </script>
    <!-- end: JavaScript Event Handlers for this page -->
    <!-- end: CLIP-TWO JAVASCRIPTS -->
</body>

</html>