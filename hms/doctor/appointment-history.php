<!--TRIAJE DE SOLICITUDES INGENIERO-->

<?php
session_start();

// Mostrar todos los errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('include/config.php');
include('include/checklogin.php');
check_login();

$mensaje = ''; // Inicializamos la variable para el resultado

// Procesar los datos enviados por el formulario de acción
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['detalles'])) {
	$id = $_POST['solicitudId'];
	$detalles = $_POST['detalles'];
	$fechaAccion = $_POST['fechaAccion'];

	// Actualizar la orden_correctiva con los detalles proporcionados
	$query = "UPDATE orden_correctiva SET detalles_accion = ?, fecha_accion = ?, estado = 'completado' WHERE id = ?";
	$stmt = $con->prepare($query);
	$stmt->bind_param('ssi', $detalles, $fechaAccion, $id);

	if ($stmt->execute()) {
		$mensaje = "success"; // Mensaje de éxito
	} else {
		$mensaje = "error"; // Mensaje de error
	}
}
// Evitar errores con $_SESSION['msg1']
$msg1 = isset($_SESSION['msg1']) ? $_SESSION['msg1'] : '';
$_SESSION['msg1'] = ""; // Limpiar el mensaje después de mostrarlo

?>

<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Triaje</title>

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
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
			background-color: rgb(83, 41, 42);
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
	</style>
</head>

<body>
	<?php
	// Mostrar la alerta de éxito o error
	if ($mensaje === "success") {
		echo "<script>
            Swal.fire({
                icon: 'success',
                title: '¡Información guardada!',
                text: 'Detalle de trabajo guardado exitosamente.',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(function() {
                window.location = 'appointment-history.php'; // Cambié la redirección
            });
        </script>";
	} elseif ($mensaje === "error") {
		echo "<script>
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al enviar la información: " . mysqli_error($con) . "',
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
								<h1 class="mainTitle">Triaje de solicitudes</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Ordenes</span>
								</li>
								<li class="active">
									<span>Servicio</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: BASIC EXAMPLE -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">
								<h2>Solicitudes Pendientes</h2>
								<?php
								// Consulta para obtener los datos de la tabla orden_correctiva
								$sql = "SELECT * FROM orden_correctiva WHERE estado = 'pendiente'";
								$result = mysqli_query($con, $sql);

								if ($result && mysqli_num_rows($result) > 0) {
									echo "<table border='1'>
                                        <tr>
                                            <th>ID</th>
                                            <th>Equipo</th>
                                            <th>Modelo</th>
                                            <th>Número de Serie</th>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Fecha</th>
                                            <th>Acción</th>
                                        </tr>";

									while ($row = mysqli_fetch_assoc($result)) {
										echo "<tr data-id='{$row['id']}'>
                                            <td>{$row['id']}</td>
                                            <td>{$row['equipo']}</td>
                                            <td>{$row['modelo']}</td>
                                            <td>{$row['numero_serie']}</td>
                                            <td>{$row['codigo']}</td>
                                            <td>{$row['descripcion']}</td>
                                            <td>{$row['fecha']}</td>
                                            <td><button class='btn btn-primary' onclick='abrirModal({$row['id']})'>Registrar acción</button></td>
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
					<!-- end: BASIC EXAMPLE -->
					<!-- end: SELECT BOXES -->

				</div>
			</div>
		</div>

		<!-- Modal para registrar las acciones realizadas -->
		<div class="modal fade" id="modalAccion" tabindex="-1" role="dialog" aria-labelledby="modalAccionLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="modalAccionLabel">Registrar acción realizada</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form method="POST">
							<input type="hidden" id="solicitudId" name="solicitudId">
							<div class="form-group">
								<label for="detalles">Detalles de la acción realizada:</label>
								<textarea class="form-control" id="detalles" name="detalles" rows="4" required></textarea>
							</div>
							<div class="form-group">
								<label for="fechaAccion">Fecha de acción:</label>
								<input type="date" class="form-control" id="fechaAccion" name="fechaAccion" required>
							</div>
							<button type="submit" class="btn btn-success">Guardar</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-- Fin del Modal -->

		<!-- Scripts -->
		<script>
			function abrirModal(id) {
				// Abrir el modal y pasar el ID de la solicitud
				document.getElementById('solicitudId').value = id;
				$('#modalAccion').modal('show');
			}
		</script>

		

		<!-- start: SETTINGS -->
		<?php include('include/setting.php'); ?>

		<!-- end: SETTINGS -->
	</div>



	<!-- Scripts -->
	<script>
		function aceptarSolicitud(id) {
			// Enviar la solicitud AJAX para actualizar el estado a "aceptada"
			$.ajax({
				url: 'update_status.php',
				type: 'POST',
				data: {
					id: id
				},
				success: function(response) {
					var res = JSON.parse(response);
					if (res.success) {
						alert(res.message);
						// Eliminar la fila de la tabla después de aceptar
						$('tr[data-id="' + id + '"]').remove();
					} else {
						alert(res.message);
					}
				},
				error: function() {
					alert('Error al aceptar la solicitud.');
				}
			});
		}

		function rechazarSolicitud(id) {
			// Enviar la solicitud AJAX para eliminar la solicitud de la base de datos
			$.ajax({
				url: 'delete_solicitud.php', // Archivo PHP que eliminará la solicitud
				type: 'POST',
				data: {
					id: id
				},
				success: function(response) {
					var res = JSON.parse(response);
					if (res.success) {
						alert(res.message);
						// Eliminar la fila de la tabla después de rechazar
						$('tr[data-id="' + id + '"]').remove();
					} else {
						alert(res.message);
					}
				},
				error: function() {
					alert('Error al rechazar la solicitud.');
				}
			});
		}
	</script>
	<!-- END Modal para registrar las acciones realizadas -->
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