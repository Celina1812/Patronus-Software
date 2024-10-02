<!--CREAR OS POR JEFE DE SERVICIO-->

<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

$mensaje = ''; // Inicializamos la variable para evitar el error de "undefined variable"

if (isset($_POST['submit'])) {
	$sector = isset($_POST['sector']) ? $_POST['sector'] : '';   // Verificación de sector
	$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';   // Verificación de nombre
	$userid = $_SESSION['id'];   // Mantiene el id del usuario en sesión
	$solicitud = isset($_POST['solicitud']) ? $_POST['solicitud'] : '';  // Verificación de solicitud
	$fecha = isset($_POST['fecha']) ? $_POST['fecha'] : '';   // Verificación de fecha
	$tiempo = isset($_POST['tiempo']) ? $_POST['tiempo'] : '';  // Verificación de tiempo
	$descripcion_trabajo = isset($_POST['descripcion_trabajo']) ? $_POST['descripcion_trabajo'] : '';
	$estado = 'pendiente'; //necesario para que aparezca en el triaje

	// Consulta actualizada para reflejar los nuevos nombres de columna
	$query = mysqli_query($con, "INSERT INTO appointment(sector, nombre, userId, solicitud, fecha, tiempo, descripcion_trabajo, estado) 
	VALUES('$sector', '$nombre', '$userid', '$solicitud', '$fecha', '$tiempo', '$descripcion_trabajo', '$estado')");

	if ($query) {
		$mensaje = "success"; // Asignamos el valor de éxito a $mensaje
	} else {
		$mensaje = "error"; // Asignamos el valor de error a $mensaje
	}
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Orden de servicio</title>

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
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script>
		function getdoctor(val) {
			$.ajax({
				type: "POST",
				url: "get_doctor.php",
				data: 'specilizationid=' + val,
				success: function(data) {
					$("#doctor").html(data);
				}
			});
		}
	</script>


	<script>
		function getfee(val) {
			$.ajax({
				type: "POST",
				url: "get_doctor.php",
				data: 'doctor=' + val,
				success: function(data) {
					$("#fees").html(data);
				}
			});
		}
	</script>

</head>

<body>
	<?php
	// Mostrar una sola alerta basada en el resultado
	if ($mensaje === "success") {
		echo "<script>
            Swal.fire({
                icon: 'success',
                title: '¡Solicitud enviada!',
                text: 'Solicitud enviada exitosamente.',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(function() {
                window.location = 'book-appointment.php';
            });
        </script>";
	} elseif ($mensaje === "error") {
		echo "<script>
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al enviar la solicitud: " . mysqli_error($con) . "',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            });
        </script>";
	}
	?>
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
								<h1 class="mainTitle">Orden de servicio</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Mi cuenta</span>
								</li>
								<li class="active">
									<span>Crear orden de servicio</span>
								</li>
							</ol>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: BASIC EXAMPLE -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">

								<div class="row margin-top-30">
									<div class="col-lg-8 col-md-12">
										<div class="panel panel-white">
											<div class="panel-heading">
												<h5 class="panel-title">Crear orden de servicio</h5>
											</div>
											<div class="panel-body">
												<p style="color:red;"><?php echo htmlentities($_SESSION['msg1']); ?>
													<?php echo htmlentities($_SESSION['msg1'] = ""); ?></p>
												<form role="form" name="book" method="post">


													<div class="form-group">
														<label for="sector">
															Sector
														</label>
														<select name="sector" class="form-control" required="required">
															<option value="">Sector al que perteneces</option>
															<?php
															$ret = mysqli_query($con, "select * from doctorspecilization");
															while ($row = mysqli_fetch_array($ret)) {
															?>
																<option value="<?php echo htmlentities($row['specilization']); ?>">
																	<?php echo htmlentities($row['specilization']); ?>
																</option>
															<?php } ?>
														</select>
													</div>

													<div class="form-group">
														<label for="nombre">
															Nombre y apellido
														</label>
														<input type="text" name="nombre" class="form-control" id="nombre" placeholder="Escribe tu nombre" required="required">
													</div>

													<div class="form-group">
														<label for="solicitud">
															Solicitud
														</label>
														<input type="text" name="solicitud" class="form-control" id="solicitud" placeholder="Escribe tu solicitud/reclamo">
													</div>

													<div class="form-group">
														<label for="fecha">
															Fecha
														</label>
														<input class="form-control" type="date" name="fecha" required="required">
													</div>

													<div class="form-group">
														<label for="tiempo">
															Hora
														</label>
														<input class="form-control" type="time" name="tiempo" required="required" step="60">
													</div>

													<button type="submit" name="submit" class="btn btn-o btn-primary">
														Enviar
													</button>
												</form>
											</div>
										</div>
									</div>

								</div>
							</div>

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

		$('.datepicker').datepicker({
			format: 'yyyy-mm-dd',
			startDate: '-3d'
		});
	</script>
	<script type="text/javascript">
		$('#timepicker1').timepicker();
	</script>
	<!-- end: JavaScript Event Handlers for this page -->
	<!-- end: CLIP-TWO JAVASCRIPTS -->

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>

</body>

</html>