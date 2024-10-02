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
	<link rel="icon" type="image/png" sizes="32x32" href="/hospital/hospital/images/Patronus.png">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

</head>

<body>
	<style>
		.card {
			background: linear-gradient(to right, #ff416c, #ff4b2b);
			color: white;
			position: relative;
			border-radius: 10px;
			padding: 20px;
			text-align: left;
			margin-bottom: 20px;
			transition: transform 0.3s ease;
		}

		.card:hover {
			transform: scale(1.05);
		}

		.card i {
			margin-bottom: 10px;
			font-size: 40px;
		}

		.card a {
			color: white;
			text-decoration: none;
		}

		.card a:hover {
			color: #f8f9fa;
		}

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

		.bg-pink {
			background: linear-gradient(to right, #ff69b4, #ff1493);
		}

		.card-title {
			color: white;
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
								<h1 class="mainTitle">Ingeniero | Dashboard</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Mi cuenta</span>
								</li>
								<li class="active">
									<span>Dashboard</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: body -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-sm-4">
								<div class="card bg-green">
									<i class="fa fa-cogs"></i>
									<h2 class="card-title">Equipos</h2>
									<p><a href="manage-users.php" class="btn btn-light">Registrar equipos</a></p>
								</div>
							</div>

							<div class="col-sm-4">
								<div class="card bg-orange">
									<i class="fa fa-list-alt"></i>
									<h2 class="card-title">Triaje de solicitudes</h2>
									<p>
										<a href="appointment-history.php" class="btn btn-light">
											<?php
											$sql_pending = mysqli_query($con, "SELECT * FROM appointment WHERE estado = 'pendiente'");
											$num_pending = mysqli_num_rows($sql_pending);
											?>
			
											Solicitudes nuevas: <?php echo htmlentities($num_pending); ?>
										</a>
									</p>
								</div>
							</div>

							<div class="col-sm-4">
								<div class="card bg-blue">
									<i class="fa fa-search"></i>
									<h2 class="card-title">OS aceptadas</h2>
									<p><a href="add-doctor.php" class="btn btn-light">Buscar</a></p>
								</div>
							</div>

							<div class="col-sm-4">
								<div class="card bg-red">
									<i class="fa fa-truck"></i>
									<h2 class="card-title">Servicio externo</h2>
									<p><a href="os_correctiva.php" class="btn btn-light">Crear solicitud</a></p>
								</div>
							</div>

							<div class="col-sm-4">
								<div class="card bg-gray">
									<i class="fa fa-database"></i>
									<h2 class="card-title">Inventario</h2>
									<p><a href="user-logs.php" class="btn btn-light">Existencias</a></p>
								</div>
							</div>

							<div class="col-sm-4">
								<div class="card bg-pink">
									<i class="fa fa-database"></i>
									<h2 class="card-title">Plan de mantenimiento</h2>
									<p><a href="read-query.php" class="btn btn-light">Planes</a></p>
								</div>
							</div>

						</div>
					</div>

					<!-- end: SELECT BOXES -->

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