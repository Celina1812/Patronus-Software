<!--ORDENES ACEPTADAS-->

<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();


if (isset($_POST['id'])) {
	$solicitud_id = $_POST['id'];

	// Actualizar el estado de la solicitud a 'aceptada'
	$sql = "UPDATE appointment SET estado = 'aceptada' WHERE id = '$solicitud_id'";

	if (mysqli_query($con, $sql)) {
		echo "success";
	} else {
		echo "error";
	}
}
// Obtener los equipos y sectores desde la base de datos
$equipos_sql = "SELECT id, codigo_equipo, equipo FROM equipos";
$sectores_sql = "SELECT id, specilization FROM doctorspecilization";

$result_equipos = mysqli_query($con, $equipos_sql);
$result_sectores = mysqli_query($con, $sectores_sql);

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

	<style>
		/* El modal ocupa toda la pantalla */
		.modal {
			display: none;
			position: fixed;
			z-index: 1;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			/* Filtro oscuro */
		}

		.modal-content {
			background-color: #fff;
			margin: auto;
			padding: 20px;
			border: 1px solid #888;
			width: 50%;
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
			position: relative;
			top: 50%;
			transform: translateY(-50%);
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

		/* Diseño en dos columnas */
		.form-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 20px;
		}

		.form-container label {
			margin-top: 10px;
		}

		.form-container input,
		.form-container select,
		.form-container textarea {
			width: 100%;
			padding: 8px;
			margin-top: 5px;
		}

		.full-width {
			grid-column: 1 / 3;
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
								<h1 class="mainTitle">Mis ordenes</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Ordenes de servicio</span>
								</li>
								<li class="active">
									<span>Aceptadas</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: body -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">

								<div class="row margin-top-30">
									<div class="col-lg-8 col-md-12">
										<div class="panel panel-white">
											<div class="panel-heading">
												<h5 class="panel-title">Ordenes de servicio aceptadas</h5>
											</div>
											<div class="panel-body">
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
														background-color: rgb(0, 185, 206);
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

													/* Estilos para el botón */
													button {
														background-color: rgb(0, 185, 206);
														color: white;
														border: none;
														padding: 8px 12px;
														cursor: pointer;
														border-radius: 4px;
														font-size: 14px;
														transition: background-color 0.3s;
													}

													button:hover {
														background-color: rgb(250, 185, 206);
													}
												</style>
												<?php

												$sql = "SELECT * FROM appointment WHERE estado = 'aceptada'";
												$result = mysqli_query($con, $sql);

												if ($result && mysqli_num_rows($result) > 0) {

													echo "<table border='1'>
														<tr>
															<th>ID</th>
															<th>Sector</th>
															<th>Jefe de Servicio</th>
															<th>Solicitud</th>
															<th>Fecha</th>
															<th>Acción</th>
														</tr>";

													while ($row = mysqli_fetch_assoc($result)) {
														echo "<tr>
														<td>{$row['id']}</td>
														<td>{$row['sector']}</td>
														<td>{$row['nombre']}</td>
														<td>{$row['solicitud']}</td>
														<td>{$row['fecha']}</td>
														<td><button onclick='openModal({$row['id']})'>Abrir</button></td>
													</tr>";
													}

													echo "</table>";
												} else {
													echo "<p>No se encontraron solicitudes pendientes.</p>";
												}
												?>
											</div>


										</div>
									</div>
									<!-- end: body -->

									<!--START MODAL  para ingresar tiempo y descripción-->

									<div id="myModal" class="modal">
										<div class="modal-content">
											<span class="close">&times;</span>
											<h2>Detalles del trabajo</h2>

											<form id="serviceForm" action="guardar_orden.php" method="POST">
												<input type="hidden" name="id" id="orderId" value="">

												<div class="form-container">

													<!-- Nombre del equipo o sector -->
													<label for="equipo">Nombre del equipo o sector:</label>
													<select id="equipo" name="equipo" required>
														<option value="">Seleccionar equipo o sector</option>
														<optgroup label="Equipos">
															<?php
															if ($result_equipos && mysqli_num_rows($result_equipos) > 0) {
																while ($equipo = mysqli_fetch_assoc($result_equipos)) {
																	echo "<option value='equipo_{$equipo['id']}'>Equipo: {$equipo['codigo_equipo']} - {$equipo['equipo']}</option>";
																}
															}
															?>
														</optgroup>
														<optgroup label="Sectores">
															<?php
															if ($result_sectores && mysqli_num_rows($result_sectores) > 0) {
																while ($sector = mysqli_fetch_assoc($result_sectores)) {
																	echo "<option value='sector_{$sector['id']}'>Sector: {$sector['specilization']}</option>";
																}
															}
															?>
														</optgroup>
													</select>

													<!-- Opciones de prioridad -->
													<label for="prioridad">Prioridad:</label>
													<select id="prioridad" name="prioridad" required>
														<option value="baja">Baja</option>
														<option value="media">Media</option>
														<option value="alta">Alta</option>
													</select>

													<!-- Responsable del servicio -->
													<label for="responsable">Responsable del servicio:</label>
													<input type="text" id="responsable" name="responsable" class="form-control" placeholder="Escribe tu nombre" required>

													<!-- Opciones de complejidad -->
													<label for="complejidad">Complejidad:</label>
													<select id="complejidad" name="complejidad" required>
														<option value="baja">Baja complejidad</option>
														<option value="media">Media complejidad</option>
														<option value="alta">Alta complejidad</option>
													</select>

													<!-- Fecha de parada del equipo -->
													<label for="fecha_parada">Fecha de parada del equipo:</label>
													<input type="date" id="fecha_parada" name="fecha_parada">

													<!-- Fecha de vuelta a funcionamiento -->
													<label for="fecha_funcion">Fecha de vuelta a funcionamiento:</label>
													<input type="date" id="fecha_funcion" name="fecha_funcion">

													<!-- Tiempo de trabajo (rango de horas) en formato 24 horas -->
													<label for="tiempo_inicio">Tiempo de trabajo (inicio):</label>
													<input type="time" id="tiempo_inicio" name="tiempo_inicio" required step="60">

													<label for="tiempo_fin">Tiempo de trabajo (fin):</label>
													<input type="time" id="tiempo_fin" name="tiempo_fin" required step="60">

													<label for="codigo_producto">Código del Producto:</label>
													<input type="text" id="codigo_producto" name="codigo_producto">

													<label for="cantidad_usada">Cantidad Usada:</label>
													<input type="number" id="cantidad_usada" name="cantidad_usada" min="0">

													<!-- Descripción del trabajo realizado -->
													<label for="descripcion" class="full-width">Descripción del trabajo realizado:</label>
													<textarea id="descripcion" name="descripcion" rows="4" required class="full-width"></textarea>
												</div>

												<button type="submit">Guardar</button>
											</form>
										</div>
									</div>

									<script>
										function openModal(id) {
											// Abrir el modal
											var modal = document.getElementById("myModal");
											modal.style.display = "block";

											// Asignar el ID de la orden al campo oculto en el formulario
											var orderIdField = document.getElementById("orderId");
											orderIdField.value = id;
										}

										// Cerrar el modal al hacer clic en el botón de cerrar (x)
										var span = document.getElementsByClassName("close")[0];
										var modal = document.getElementById("myModal");

										span.onclick = function() {
											modal.style.display = "none";
										}
									</script>
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