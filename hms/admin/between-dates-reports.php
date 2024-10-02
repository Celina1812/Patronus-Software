<?php
session_start();
include('include/config.php');
include('include/checklogin.php');
check_login();


$query_mantenimiento = "
    SELECT pm.*, e.equipo, e.codigo_equipo 
    FROM planes_mantenimiento pm
    JOIN equipos e ON pm.equipo_id = e.id
    WHERE pm.fecha_programada";
$result_mantenimiento = mysqli_query($con, $query_mantenimiento);
$fechas_mantenimiento = [];
while ($row = mysqli_fetch_assoc($result_mantenimiento)) {
	$fechas_mantenimiento[] = [
		'fecha' => $row['fecha_programada'],
		'equipo' => $row['equipo'],
		'codigo_equipo' => $row['codigo_equipo']
	];
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
	<title>Patronus | Calendario </title>

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
	<link href='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css' rel='stylesheet' />
</head>

<body>
	<style>
		.fc-event {
			white-space: normal !important;
			height: auto !important;
			padding: 5px;
		}

		#calendario {
			max-width: 900px;
			margin: 20px auto;
			padding: 20px;
			background-color: #ffffff;
			border-radius: 10px;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		}

		.fc {
			font-family: 'Lato', sans-serif;
		}

		.fc-toolbar {
			background-color: #007bff;
			color: white;
			border-radius: 5px;
			padding: 10px;
			margin-bottom: 15px;
		}

		.fc-toolbar h2 {
			margin: 0;
			font-size: 24px;
			font-weight: bold;
		}

		.fc-button {
			background-color: #0056b3;
			color: white;
			border: none;
			border-radius: 5px;
			padding: 10px 15px;
			transition: background-color 0.3s;
		}

		.fc-button:hover {
			background-color: #004494;
		}

		.fc-day-grid-event {
			background-color: #28a745;
			color: white;
			border-radius: 5px;
			padding: 5px;
			font-size: 14px;
			text-align: center;
		}

		.fc-day-grid-event:hover {
			background-color: #218838;
		}

		.fc-day-grid-event .fc-title {
			font-weight: bold;
			text-transform: uppercase;
		}
	</style>
	<div id="app">
		<?php include('include/sidebar.php'); ?>
		<div class="app-content">

			<?php include('include/header.php'); ?>

			<!-- end: TOP NAVBAR -->
			<div class="main-content">
				<div class="wrap-content container" id="container">
					<!-- Título de la página -->
					<section id="page-title">
						<div class="row">
							<div class="col-sm-8">
								<h1 class="mainTitle">Calendario 📅</h1>
							</div>
						</div>
					</section>

					<div class="row">
						<div class="col-md-12">
							<div id="calendario"></div>
						</div>
					</div>

					<script src="vendor/jquery/jquery.min.js"></script>
					<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
					<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js'></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/locale/es.js"></script>

					<script>
						$(document).ready(function() {
							$('#calendario').fullCalendar({
								locale: 'es', // Idioma en español
								header: {
									left: 'prev,next today',
									center: 'title',
									right: 'month,agendaWeek,agendaDay'
								},
								events: [
									<?php
									foreach ($fechas_mantenimiento as $mantenimiento) {
										echo "{ 
                                            title: 'Mantenimiento de Equipo: {$mantenimiento['equipo']} (Código: {$mantenimiento['codigo_equipo']})', 
                                            start: '{$mantenimiento['fecha']}',
                                            description: 'Equipo: {$mantenimiento['equipo']}, Código: {$mantenimiento['codigo_equipo']}, Fecha: {$mantenimiento['fecha']}'
                                        },";
									}
									?>
								],
								editable: false,
								droppable: false,
								eventRender: function(event, element) {
									// Inicializa los tooltips de Bootstrap
									element.attr('data-toggle', 'tooltip');
									element.attr('title', event.description);
									$('[data-toggle="tooltip"]').tooltip();
								}
							});
						});
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
	<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js'></script>
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