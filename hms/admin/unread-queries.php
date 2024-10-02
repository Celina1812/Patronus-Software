<!--AGREGAR PLANES DE MANTENIMIENTO-->

<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

$mensaje = ""; 

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['accion']) && $_POST['accion'] == 'agregar') {
	$equipo_id = $_POST['equipo_id'];
	$titulo = $_POST['titulo'];
	$fecha_programada = $_POST['fecha_programada'];
	$periodicidad = $_POST['periodicidad'];
	$inspeccion_visual = $_POST['inspeccion_visual'];
	$funcionamiento = $_POST['funcionamiento'];
	$alarmas = $_POST['alarmas'];
	$bateria = $_POST['bateria'];
	$identificacion = $_POST['identificacion'];
	$materiales_necesarios = $_POST['materiales_necesarios'];
	$estado = $_POST['estado'];

	$query = "INSERT INTO planes_mantenimiento (equipo_id, titulo, fecha_programada, periodicidad, inspeccion_visual, funcionamiento, alarmas, bateria, identificacion, materiales_necesarios, estado) 
              VALUES ('$equipo_id', '$titulo', '$fecha_programada', '$periodicidad', '$inspeccion_visual', '$funcionamiento', '$alarmas', '$bateria', '$identificacion', '$materiales_necesarios','$estado')";

	if (mysqli_query($con, $query)) {
		$mensaje = "success"; 
	} else {
		$mensaje = "error"; 
	}
}

if (isset($_GET['eliminar_id'])) {
	$id = $_GET['eliminar_id'];

	// Eliminar el plan de mantenimiento
	$query = "DELETE FROM planes_mantenimiento WHERE id='$id'";

	if (mysqli_query($con, $query)) {
		$mensaje = "Plan eliminado correctamente.";
	} else {
		$mensaje = "Error al eliminar el plan: " . mysqli_error($con);
	}
}

$query_equipos = "SELECT id, equipo, codigo_equipo FROM equipos"; // Asegúrate de incluir el código
$result_equipos = mysqli_query($con, $query_equipos);

$query_planes = "SELECT pm.*, e.equipo, e.modelo FROM planes_mantenimiento pm 
                 JOIN equipos e ON pm.equipo_id = e.id";
$result_planes = mysqli_query($con, $query_planes);
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Planes de mantenimiento</title>

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
	// Mostrar una sola alerta basada en el resultado
	if ($mensaje === "success") {
		echo "<script>
            Swal.fire({
                icon: 'success',
                title: '¡Plan agregado!',
                text: 'El plan de mantenimiento ha sido agregado correctamente.',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(function() {
                window.location = 'unread-queries.php';
            });
        </script>";
	} elseif ($mensaje === "error") {
		echo "<script>
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al agregar el plan: " . mysqli_error($con) . "',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            });
        </script>";
	}
	?>
	<style>

		.container {
			margin-top: 30px;
			margin-bottom: 30px;
		}

		.mainTitle {
			font-size: 24px;
			margin-bottom: 20px;
			color: #009bba;
		}

		h1 {
			color: #333;
			margin-bottom: 20px;
		}

		label {
			font-weight: bold;
			margin-bottom: 5px;
		}

		select,
		textarea,
		input[type="date"],
		input[type="text"] {
			width: 100%;
			padding: 10px;
			margin-bottom: 15px;
			border: 1px solid #ddd;
			border-radius: 4px;
			transition: border-color 0.3s;
		}

		select:focus,
		textarea:focus,
		input[type="date"]:focus,
		input[type="text"]:focus {
			border-color: #009bba;
			outline: none;
		}

		button {
			background-color: #009bba;
			color: white;
			border: none;
			padding: 10px 15px;
			cursor: pointer;
			border-radius: 4px;
			font-size: 16px;
			transition: background-color 0.3s;
		}

		button:hover {
			background-color: #007a9e;
		}

		table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 20px;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			border-radius: 8px;
			overflow: hidden;
		}

		th,
		td {
			padding: 15px;
			text-align: left;
		}

		th {
			background-color: #009bba;
			color: white;
			font-weight: bold;
			text-transform: uppercase;
		}

		tr:nth-child(even) {
			background-color: #f9f9f9;
		}

		tr:hover {
			background-color: #f1f1f1;
		}

		td {
			border-bottom: 1px solid #ddd;
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
								<h1 class="mainTitle">Planes de mantenimiento</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Admin </span>
								</li>
								<li class="active">
									<span>Doctor Session Logs</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: Body -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">
								<h1>Agregar Plan de Mantenimiento</h1>
								<form action="" method="POST">
									<input type="hidden" name="accion" value="agregar">

									<label for="titulo">Título del Plan:</label>
									<input type="text" name="titulo" required>

									<label for="equipo_id">Equipo:</label>
									<select name="equipo_id" required>
										<option value="">Seleccione un equipo</option>
										<?php while ($row = mysqli_fetch_assoc($result_equipos)) { ?>
											<option value="<?php echo $row['id']; ?>">
												<?php echo $row['equipo'] . " (Código: " . $row['codigo_equipo'] . ")"; ?>
											</option>
										<?php } ?>
									</select>

									<label for="fecha_programada">Fecha Programada:</label>
									<input type="date" name="fecha_programada" required>

									<label for="periodicidad">Periodicidad:</label>
									<select name="periodicidad" required>
										<option value="Mensual">Mensual</option>
										<option value="Trimestral">Trimestral</option>
										<option value="Semestral">Semestral</option>
										<option value="Anual">Anual</option>
									</select>

									<h3>Inspección del Equipo</h3>
									<label for="inspeccion_visual">Inspección visual:</label>
									<input type="text" name="inspeccion_visual">

									<label for="funcionamiento">Funcionamiento:</label>
									<input type="text" name="funcionamiento">

									<label for="alarmas">Alarmas:</label>
									<input type="text" name="alarmas">

									<label for="bateria">Batería:</label>
									<input type="text" name="bateria">

									<label for="materiales_necesarios">Materiales necesarios:</label>
									<textarea name="materiales_necesarios"></textarea>

									<label for="identificacion">Identificación:</label>
									<input type="text" name="identificacion">

									<button type="submit">Agregar Plan</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script>
			function downloadPDF() {
				const {
					jsPDF
				} = window.jspdf;
				const doc = new jsPDF();

				doc.text("Planes de Mantenimiento", 10, 10);
				let yPos = 20;

				<?php while ($row = mysqli_fetch_assoc($result_planes)) { ?>
					doc.text(`Equipo: <?php echo $row['equipo']; ?>`, 10, yPos);
					doc.text(`Descripción: <?php echo $row['descripcion']; ?>`, 10, yPos + 10);
					doc.text(`Instrucciones: <?php echo $row['instrucciones']; ?>`, 10, yPos + 20);
					doc.text(`Fecha Programada: <?php echo $row['fecha_programada']; ?>`, 10, yPos + 30);
					yPos += 40;
				<?php } ?>

				doc.save("planes_mantenimiento.pdf");
			}
		</script>
		<div class="header-notifications">
			<ul id="notificaciones-lista">
				<li>Cargando notificaciones...</li>
			</ul>
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