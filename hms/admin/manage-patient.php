<?php
session_start();
include_once('include/config.php');
include_once('include/checklogin.php');
check_login();

$currentDate = date('Y-m-d');

if (isset($_POST['submit'])) {
	$titulo = $_POST['titulo'];
	$equipo_id = $_POST['equipo_id'];
	$fecha_programada = $_POST['fecha_programada'];

	$sql = mysqli_query($con, "INSERT INTO planes_mantenimiento(titulo, equipo_id, fecha_programada) VALUES('$titulo', '$equipo_id', '$fecha_programada')");
	$_SESSION['msg'] = "Plan de mantenimiento agregado exitosamente";
}

if (isset($_POST['update'])) {
	$id = $_POST['id'];
	$detalle_mantenimiento = $_POST['detalle_mantenimiento'];

	$sql = mysqli_query($con, "UPDATE planes_mantenimiento SET detalle_mantenimiento='$detalle_mantenimiento', estado='completado' WHERE id='$id'");
	$_SESSION['msg'] = "Mantenimiento completado";
}

if (isset($_POST['guardar_detalles'])) {
	$id = $_POST['id'];
	$detalle = mysqli_real_escape_string($con, $_POST['detalle']); 
	$checklist = implode(", ", $_POST['checklist']);  

	$query = "UPDATE planes_mantenimiento SET detalle_mantenimiento = '$detalle', checklist = '$checklist', estado = 'completado' WHERE id = '$id'";

	if (mysqli_query($con, $query)) {
		$_SESSION['msg'] = "Mantenimiento actualizado exitosamente";
	} else {
		$_SESSION['msg'] = "Error al actualizar el mantenimiento: " . mysqli_error($con);
	}
}


$sql = mysqli_query($con, "SELECT pm.*, e.equipo AS equipo_nombre, e.codigo_equipo
    FROM planes_mantenimiento pm
    LEFT JOIN equipos e ON pm.equipo_id = e.id
    WHERE pm.fecha_programada <= '$currentDate' AND pm.estado != 'completado'");

?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Mantenimientos preventivos</title>

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
		.styled-textarea {
			min-height: 100px;
			font-size: 14px;
			padding: 10px;
			border-radius: 4px;
			border: 1px solid #ccc;
		}

		.checklist-section .form-check {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		}

		.checklist-section .checklist-title {
			width: 150px;
			font-weight: bold;
			margin-right: 10px;
		}

		.form-check-input {
			margin-right: 5px;
		}

		.form-check-label {
			margin-right: 15px;
		}

		.btn-modern {
			background-color: #17a2b8;
			color: white;
			border: none;
			padding: 10px 20px;
			border-radius: 4px;
			font-size: 16px;
		}

		.btn-modern:hover {
			background-color: #138496;
			cursor: pointer;
		}

		h3 {
			font-size: 24px;
			margin-bottom: 20px;
		}

		.table-hover tbody tr:hover {
			background-color: #f9f9f9;
		}

		.table thead {
			background-color: #f1f1f1;
		}

		.table-bordered {
			border: 1px solid #dee2e6;
		}
	</style>
	<div id="app">
		<?php include('include/sidebar.php'); ?>
		<div class="app-content">
			<?php include('include/header.php'); ?>

			<div class="main-content">
				<div class="wrap-content container" id="container">
					<section id="page-title">
						<div class="row">
							<div class="col-sm-8">
								<h1 class="mainTitle">Detalles de Mantenimiento Preventivo</h1>
							</div>
						</div>
					</section>

					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="container mt-5">
								
								<table class="table table-hover table-bordered">
									<thead class="thead-light">
										<tr>
											<th>#</th>
											<th>Título</th>
											<th>Equipo</th>
											<th>Fecha Programada</th>
											<th>Detalles</th>
										</tr>
									</thead>
									<tbody>
										<?php
										$cnt = 1;
										while ($row = mysqli_fetch_array($sql)) {
										?>
											<tr>
												<td><?php echo $cnt; ?>.</td>
												<td><?php echo $row['titulo']; ?></td>
												<td><?php echo $row['equipo_nombre']; ?> (<?php echo $row['codigo_equipo']; ?>)</td>
												<td><?php echo $row['fecha_programada']; ?></td>
												<td>
													<form method="post" action="">
														<div class="row mb-3">
															<!-- Detalles del mantenimiento -->
															<div class="col-md-6">
																<label for="detalle" class="form-label">Detalles del mantenimiento</label>
																<textarea name="detalle" class="form-control styled-textarea" placeholder="Ingresa los detalles del mantenimiento"></textarea>
															</div>

															<!-- Checklist del mantenimiento -->
															<div class="col-md-6 checklist-section">
																<label for="checklist" class="form-label">Checklist del mantenimiento</label>

																<!-- Inspección visual -->
																<div class="form-check mb-2">
																	<p class="checklist-title">Inspección visual</p>
																	<input type="radio" name="checklist[inspeccion_visual]" value="OK" class="form-check-input" id="inspeccion_ok">
																	<label class="form-check-label" for="inspeccion_ok">✓ OK</label>
																	<input type="radio" name="checklist[inspeccion_visual]" value="Error" class="form-check-input" id="inspeccion_error">
																	<label class="form-check-label" for="inspeccion_error">✗ Error</label>
																</div>

																<!-- Prueba de alarmas -->
																<div class="form-check mb-2">
																	<p class="checklist-title">Prueba de alarmas</p>
																	<input type="radio" name="checklist[prueba_alarmas]" value="OK" class="form-check-input" id="alarmas_ok">
																	<label class="form-check-label" for="alarmas_ok">✓ OK</label>
																	<input type="radio" name="checklist[prueba_alarmas]" value="Error" class="form-check-input" id="alarmas_error">
																	<label class="form-check-label" for="alarmas_error">✗ Error</label>
																</div>

																<!-- Revisión de baterías -->
																<div class="form-check mb-2">
																	<p class="checklist-title">Cambio de filtro</p>
																	<input type="radio" name="checklist[revision_baterias]" value="OK" class="form-check-input" id="baterias_ok">
																	<label class="form-check-label" for="baterias_ok">✓ OK</label>
																	<input type="radio" name="checklist[revision_baterias]" value="Error" class="form-check-input" id="baterias_error">
																	<label class="form-check-label" for="baterias_error">✗ Error</label>
																</div>
															</div>
														</div>

														<!-- Botón de envío -->
														<div class="text-center">
															<input type="hidden" name="id" value="<?php echo $row['id']; ?>">
															<button type="submit" name="guardar_detalles" class="btn btn-modern mt-3">Guardar</button>
														</div>
													</form>
												</td>
											</tr>
										<?php
											$cnt++;
										}
										?>
									</tbody>
								</table>
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
	</script>
	<!-- end: JavaScript Event Handlers for this page -->
	<!-- end: CLIP-TWO JAVASCRIPTS -->
</body>

</html>