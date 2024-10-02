<!--VER PLANES DE MANTENIMIENTO-->

<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

$query_planes = "SELECT pm.id, pm.titulo, pm.periodicidad, pm.inspeccion_visual, pm.funcionamiento, pm.alarmas, pm.bateria, pm.identificacion, e.equipo, e.modelo 
                 FROM planes_mantenimiento pm 
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
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>

<body>
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
									<span>Plan </span>
								</li>
								<li class="active">
									<span>Mantenimiento</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: Body -->
					<div class="container-fluid container-fullw bg-white">


						<div class="row">
							<div class="col-md-12">
								<h1>Planes de Mantenimiento</h1>

								<table class="table table-bordered">
									<thead>
										<tr>
											<th>ID</th>
											<th>Equipo</th>
											<th>Modelo</th>
											<th>Título</th>
											<th>Descargar PDF</th>
										</tr>
									</thead>
									<tbody>
										<?php while ($row = mysqli_fetch_assoc($result_planes)) { ?>
											<tr>
												<td><?php echo $row['id']; ?></td>
												<td><?php echo $row['equipo']; ?></td>
												<td><?php echo $row['modelo']; ?></td>
												<td><?php echo $row['titulo']; ?></td>
												<td>
													<a href="generar_pdf.php?id=<?php echo $row['id']; ?>" class="btn btn-primary">Descargar PDF</a>

												</td>

											</tr>
										<?php } ?>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Generar PDF con jsPDF -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
		<script>
			function downloadPlanPDF(equipo, modelo, descripcion) {
				const {
					jsPDF
				} = window.jspdf;
				const doc = new jsPDF();

				// Agregar contenido al PDF
				doc.text(`Equipo: ${equipo}`, 10, 10);
				doc.text(`Modelo: ${modelo}`, 10, 20);
				doc.text(`Descripción: ${descripcion}`, 10, 30);

				// Descargar PDF
				doc.save(`Plan_Mantenimiento_${equipo}.pdf`);
			}
		</script>
		<!-- Generar PDF con jsPDF -->

		<?php include('include/footer.php'); ?>
		<?php include('include/setting.php'); ?>
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