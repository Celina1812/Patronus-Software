<!--HISTORIAL ORDENES DE SERVICIO doctor-->

<?php
session_start();
error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();
if (isset($_GET['cancel'])) {
	mysqli_query($con, "update appointment set userStatus='0' where id = '" . $_GET['id'] . "'");
	$_SESSION['msg'] = "¡Tu solicitud ha sido cancelada!";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Ordenes de servicio</title>

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
	<link rel="icon" type="image/png" sizes="32x32" href="../images/Patronus.png">

</head>

<body>
	<style>
		/* Estilos generales para la tabla */
		table {
			width: 100%;
			border-collapse: collapse;
			margin: 25px 0;
			font-size: 16px;
			font-family: 'Lato', sans-serif;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
			border: 2px solid #009879;
			/* Color de borde para la tabla */
		}

		table thead th {
			background-color: #97D3CB;
			color: #333;
			text-align: left;
			padding: 12px;
			font-weight: bold;
			text-transform: uppercase;
			border-bottom: 2px solid #009879;
			/* Borde en la cabecera */
		}

		table tbody tr {
			border-bottom: 1px solid #dddddd;
			transition: background-color 0.3s ease, border 0.3s ease;
		}

		/* Alternar color de filas */
		table tbody tr:nth-of-type(even) {
			background-color: #f9f9f9;
		}

		/* Última fila con borde */
		table tbody tr:last-of-type {
			border-bottom: 2px solid #009879;
		}

		table td {
			padding: 12px;
			text-align: left;
			vertical-align: middle;
			border-right: 1px solid #dddddd;
			/* Agregar borde derecho a las celdas */
		}

		/* Alinear la columna 'Estado' centrada y con estilo */
		table td:last-child {
			text-align: center;
			font-weight: bold;
			border-right: none;
			/* Eliminar borde en la última columna */
		}

		/* Colores personalizados para diferentes estados */
		table td:last-child:contains('Pendiente') {
			color: #ff9800;
			/* Naranja para pendiente */
		}

		table td:last-child:contains('Aceptada') {
			color: #4CAF50;
			/* Verde para aceptada */
		}

		table td:last-child:contains('Rechazada') {
			color: #f44336;
			/* Rojo para rechazada */
		}

		/* Efecto hover en las filas */
		table tbody tr:hover {
			background-color: #e0f7fa;
			/* Color de fondo cuando pasas el cursor */
			border-left: 4px solid #009879;
			/* Borde en la izquierda al hacer hover */
		}

		/* Estilos para el formulario de filtro */
		.filter-form {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.filter-form .input-group {
			display: flex;
			align-items: center;
		}

		.filter-form .input-group select {
			height: 38px;
			/* Aseguramos que el select tenga la misma altura que el botón */
			min-width: 200px;
			/* Ancho mínimo */
			margin-right: 10px;
			/* Separación del botón */
		}

		.filter-button {
			height: 38px;
			/* Aseguramos que el botón tenga la misma altura que el select */
			display: flex;
			align-items: center;
			justify-content: center;
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
								<h1 class="mainTitle"> Historial de órdenes</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Mi cuenta </span>
								</li>
								<li class="active">
									<span>Historial de órdenes</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: BASIC EXAMPLE -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">
								<?php
								// Recupera los sectores únicos de la base de datos
								$sectorQuery = mysqli_query($con, "SELECT DISTINCT sector FROM appointment");
								?>

								<!-- Formulario de filtro -->
								<form method="GET" action="" class="form-inline mb-3 filter-form" style="display: flex; align-items: center; justify-content: flex-start;">
									<!-- Ícono del filtro -->
									<div class="input-group mb-3" style="display: flex; align-items: center;">
										<div class="input-group-prepend">
											<span class="input-group-text" id="basic-addon1">
												<i class="fa fa-filter" aria-hidden="true"></i> <!-- Ícono de filtro -->
											</span>
										</div>

										<!-- Seleccionar sector -->
										<select name="sector" id="sector" class="form-control" aria-describedby="basic-addon1" style="min-width: 200px;">
											<option value="">Todos los sectores</option>
											<?php while ($sectorRow = mysqli_fetch_array($sectorQuery)) { ?>
												<option value="<?php echo $sectorRow['sector']; ?>" <?php if (isset($_GET['sector']) && $_GET['sector'] == $sectorRow['sector']) echo 'selected'; ?>>
													<?php echo $sectorRow['sector']; ?>
												</option>
											<?php } ?>
										</select>
									</div>

									<!-- Botón de filtro -->
									<button type="submit" class="btn btn-primary ml-2 filter-button" style="display: flex; align-items: center; height: 100%;">
										<i class="fa fa-search mr-1"></i> Filtrar
									</button>
								</form>

								<p style="color:red;"><?php echo htmlentities($_SESSION['msg']); ?>
									<?php echo htmlentities($_SESSION['msg'] = ""); ?></p>
								<table class="table table-hover" id="sample-table-1">
									<thead>
										<tr>
											<th>#</th>
											<th>Sector</th>
											<th>Solicitante</th>
											<th>Solicitud</th>
											<th>Fecha / Hora</th>
											<th>Estado</th>
										</tr>
									</thead>
									<tbody>
										<?php
										// Verifica si el filtro por sector está establecido
										$sectorFilter = "";
										if (isset($_GET['sector']) && !empty($_GET['sector'])) {
											$sectorFilter = " AND sector='" . $_GET['sector'] . "'";
										}
										// Solo seleccionamos las columnas necesarias y aplicamos el filtro de sector si existe
										$sql = mysqli_query($con, "SELECT sector, nombre, solicitud, fecha, tiempo, estado FROM appointment WHERE userId='" . $_SESSION['id'] . "' $sectorFilter");

										$cnt = 1;
										while ($row = mysqli_fetch_array($sql)) {
										?>
											<tr>
												<td><?php echo $cnt; ?>.</td>
												<td><?php echo $row['sector']; ?></td> <!-- Sector -->
												<td><?php echo $row['nombre']; ?></td> <!-- Solicitante -->
												<td><?php echo $row['solicitud']; ?></td> <!-- Solicitud -->
												<td><?php echo $row['fecha']; ?> / <?php echo $row['tiempo']; ?></td> <!-- Fecha / Hora -->
												<td>
													<?php
													if ($row['estado'] == 'pendiente') {
														echo "Pendiente";
													} elseif ($row['estado'] == 'aceptada') {
														echo "Aceptada";
													} elseif ($row['estado'] == 'rechazada') {
														echo "Rechazada";
													} elseif ($row['estado'] == 'completada') {
														echo "Completada";
													}
													?>

												</td>
											</tr>
										<?php
											$cnt = $cnt + 1;
										} ?>
									</tbody>
								</table>
							</div>
						</div>

						<!-- end: BASIC EXAMPLE -->
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