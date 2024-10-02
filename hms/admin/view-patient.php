<?php
session_start();
include_once('include/config.php');
include('include/checklogin.php');
check_login();


$query = "
    SELECT 
        e.equipo, 
        e.codigo_equipo, 
        e.numero_serie, 
        a.fecha_parada, 
        a.fecha_funcion 
    FROM 
        equipos e
    JOIN 
        appointment a ON e.id = a.equipo
";

$result = mysqli_query($con, $query);

$equipos = [];
$fechas_parada = [];
$fechas_funcion = [];

while ($row = mysqli_fetch_assoc($result)) {
	$equipos[] = $row['equipo'] . ' (' . $row['codigo_equipo'] . ')';  // Nombre + Código del equipo
	$fechas_parada[] = $row['fecha_parada'];
	$fechas_funcion[] = $row['fecha_funcion'];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Manage Patients</title>

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
</head>

<body>
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
								<h1 class="mainTitle">Estadísticas de Ciclo de Vida de Equipos</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Gráficos</span>
								</li>
								<li class="active">
									<span>Ciclo de vida</span>
								</li>
							</ol>
						</div>
					</section>
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">
								<h1 class="mainTitle">Gráfico de Ciclo de Vida de Equipos</h1>

								<canvas id="cicloVidaEquipos" width="400" height="200"></canvas>

								<script>
									const ctx = document.getElementById('cicloVidaEquipos').getContext('2d');
									const cicloVidaChart = new Chart(ctx, {
										type: 'bar',
										data: {
											labels: <?php echo json_encode($equipos); ?>,
											datasets: [{
													label: 'Fecha Parada',
													data: <?php echo json_encode($fechas_parada); ?>,
													backgroundColor: 'rgba(255, 99, 132, 0.2)',
													borderColor: 'rgba(255, 99, 132, 1)',
													borderWidth: 1
												},
												{
													label: 'Fecha Función',
													data: <?php echo json_encode($fechas_funcion); ?>,
													backgroundColor: 'rgba(54, 162, 235, 0.2)',
													borderColor: 'rgba(54, 162, 235, 1)',
													borderWidth: 1
												}
											]
										},
										options: {
											scales: {
												y: {
													beginAtZero: false,
													type: 'time',
													time: {
														unit: 'day',
														tooltipFormat: 'YYYY-MM-DD',
														displayFormats: {
															day: 'YYYY-MM-DD'
														}
													}
												}
											}
										}
									});
								</script>
							</div>

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