<!--REMITOS-->

<?php
session_start();
//error_reporting(0);
include_once('include/config.php');
include_once('include/checklogin.php');
check_login();

if (isset($_POST['submit'])) {
	$nombre = $_POST['nombre'];
	$file_name = $_FILES['remito']['name'];
	$file_tmp = $_FILES['remito']['tmp_name'];
	$upload_dir = 'uploads/remitos/'; // Carpeta donde guardar los remitos

	date_default_timezone_set('America/Argentina/Buenos_Aires'); // Cambia según tu zona horaria

	// Crear la carpeta si no existe
	if (!is_dir($upload_dir)) {
		mkdir($upload_dir, 0777, true);
	}

	$file_path = $upload_dir . basename($file_name);

	if (move_uploaded_file($file_tmp, $file_path)) {
		// Insertar la información en la base de datos
		$query = mysqli_query($con, "INSERT INTO remitos (nombre_remito, ruta_remito, fecha_subida) VALUES ('$nombre', '$file_path', NOW())");

		if ($query) {
			// Mensaje de éxito
			$_SESSION['msg'] = "success";
		} else {
			// Mensaje de error
			$_SESSION['msg'] = "error_db";
		}
	} else {
		// Mensaje de error al subir el archivo
		$_SESSION['msg'] = "error_upload";
	}
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Remitos</title>

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
	// Mostrar la alerta de acuerdo al mensaje de la sesión
	if (isset($_SESSION['msg'])) {
		if ($_SESSION['msg'] == "success") {
			echo "<script>
                Swal.fire({
                    icon: 'success',
                    title: '¡Remito Subido!',
                    text: 'El remito ha sido subido exitosamente.',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok'
                }).then(function() {
                    window.location = 'manage-patient.php';
                });
            </script>";
		} elseif ($_SESSION['msg'] == "error_db") {
			echo "<script>
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la base de datos',
                    text: 'Hubo un problema al guardar el remito en la base de datos.',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok'
                });
            </script>";
		} elseif ($_SESSION['msg'] == "error_upload") {
			echo "<script>
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la subida',
                    text: 'Hubo un problema al subir el archivo.',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok'
                });
            </script>";
		}

		// Limpiar el mensaje después de mostrarlo
		unset($_SESSION['msg']);
	}
	?>
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
								<h1 class="mainTitle">Gestión de Remitos</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Home</span>
								</li>
								<li class="active">
									<span>Gestión de Remitos</span>
								</li>
							</ol>
						</div>
					</section>
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">
								<h5 class="over-title margin-bottom-15">Subir <span class="text-bold">Remito</span></h5>

								<!-- Formulario para subir remito -->
								<form action="" method="POST" enctype="multipart/form-data" class="form-horizontal">
									<div class="form-group">
										<label for="nombre" class="col-sm-2 control-label">Nombre del Remito:</label>
										<div class="col-sm-10">
											<input type="text" name="nombre" class="form-control" placeholder="Nombre del remito" required>
										</div>
									</div>

									<div class="form-group">
										<label for="remito" class="col-sm-2 control-label">Subir Remito (PNG):</label>
										<div class="col-sm-10">
											<input type="file" name="remito" accept="image/*" class="form-control" required>
										</div>
									</div>

									<div class="form-group">
										<div class="col-sm-offset-2 col-sm-10">
											<button type="submit" name="submit" class="btn btn-primary">Subir imagen</button>
										</div>
									</div>
								</form>

								<!-- Lista de remitos subidos -->
								<h5 class="over-title margin-bottom-15">Lista de <span class="text-bold">Remitos Subidos</span></h5>
								<table class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>#</th>
											<th>Nombre del Remito</th>
											<th>Fecha de Subida</th>
											<th>Ver Remito</th>
										</tr>
									</thead>
									<tbody>
										<?php
										// Consulta a la base de datos para obtener los remitos subidos
										$query = mysqli_query($con, "SELECT * FROM remitos ORDER BY fecha_subida DESC");
										$cnt = 1;
										while ($row = mysqli_fetch_array($query)) {
										?>
											<tr>
												<td><?php echo $cnt; ?>.</td>
												<td><?php echo $row['nombre_remito']; ?></td>
												<td><?php echo $row['fecha_subida']; ?></td>
												<td><a href="<?php echo $row['ruta_remito']; ?>" target="_blank" class="btn btn-info">Ver Remito</a></td>
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