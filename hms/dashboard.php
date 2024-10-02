<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

?>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Dashboard</title>

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
		/* Gradiente de fondo y estilo de la tarjeta */
		.card {
			background: linear-gradient(to right, #ff416c, #ff4b2b);
			/* Gradiente similar al color de la imagen */
			color: white;
			position: relative;
			border-radius: 10px;
			padding: 20px;
			text-align: left;
			margin-bottom: 20px;
			transition: transform 0.3s ease;
		}

		/* Efecto hover para agrandar la tarjeta */
		.card:hover {
			transform: scale(1.05);
		}

		/* Estilo del ícono en la tarjeta */
		.card i {
			margin-bottom: 10px;
			font-size: 40px;
		}

		/* Estilo de los enlaces dentro de la tarjeta */
		.card a {
			color: white;
			text-decoration: none;
		}

		.card a:hover {
			color: #f8f9fa;
		}

		/* Diferentes colores de fondo para tarjetas */
		.bg-green {
			background: linear-gradient(to right, #28a745, #28d996);
		}

		.bg-blue {
			background: linear-gradient(to right, #007bff, #00c6ff);
		}

		.bg-orange {
			background: linear-gradient(to right, #fd7e14, #ffba44);
		}

		.bg-red {
			background: linear-gradient(to right, #dc3545, #ff616f);
		}

		.bg-gray {
			background: linear-gradient(to right, #6c757d, #8a929a);
		}

		.bg-purple {
			background: linear-gradient(to right, #6f42c1, #9a68ff);
		}

		/* Estilo de los títulos de las tarjetas */
		.card-title {
			color: white;
			/* Asegura que los títulos estén en color blanco */
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
								<h1 class="mainTitle">Jefe de servicio | Dashboard</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Usuario</span>
								</li>
								<li class="active">
									<span>Dashboard</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: BASIC EXAMPLE -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<!-- Equipos -->
							<div class="col-sm-4">
								<div class="card bg-green">
									<i class="fa fa-cogs"></i>
									<h2 class="card-title">Mi perfil</h2>
									<p><a href="edit-profile.php">Actualizar perfil</a></p>
								</div>
							</div>


							<!-- Solicitar servicio -->
							<div class="col-sm-4">
								<div class="card bg-orange">
									<i class="fa fa-terminal"></i>
									<h2 class="card-title">Solicitar servicio</h2>
									<p><a href="book-appointment.php">Crear orden de servicio</a></p>
								</div>
							</div>
							
							<!-- Ordenes de servicio -->
							<div class="col-sm-4">
								<div class="card bg-blue">
									<i class="fa fa-paperclip"></i>
									<h2 class="card-title">Órdenes de servicio</h2>
									<p><a href="appointment-history.php">Historial de órdenes de servicio</a></p>
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
		<>
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