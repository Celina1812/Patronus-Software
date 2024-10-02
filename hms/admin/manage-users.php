<!--REGISTRAR EQUIPO-->

<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

// Incluir TCPDF
require_once($_SERVER['DOCUMENT_ROOT'] . '/hospital/hospital/tcpdf/tcpdf.php');

// Función para generar el PDF
function generarPDF($codigo_equipo, $qr_url)
{
	// Crear un nuevo documento PDF
	$pdf = new TCPDF();

	// Configuración inicial del PDF
	$pdf->SetCreator(PDF_CREATOR);
	$pdf->SetAuthor('Patronus');
	$pdf->SetTitle('Código del Equipo Médico');

	// Añadir una página
	$pdf->AddPage();

	// Escribir el título
	$pdf->SetFont('helvetica', 'B', 20);
	$pdf->Cell(0, 15, 'Información del Equipo', 0, 1, 'C');

	// Código del equipo
	$pdf->SetFont('helvetica', '', 12);
	$pdf->Cell(0, 15, 'Código del equipo: ' . $codigo_equipo, 0, 1, 'C');

	// Agregar el código QR
	$pdf->Image($qr_url, 80, 50, 50, 50, 'PNG');

	// Salida del PDF (el PDF se enviará al navegador para descargar)
	$pdf->Output('codigo_equipo_' . $codigo_equipo . '.pdf', 'D');
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// Recogemos los datos del formulario
	$situacion = $_POST['situacion'];
	$equipo = $_POST['equipo'];
	$modelo = $_POST['modelo'];
	$fabricante = $_POST['fabricante'];
	$reg_anmat = $_POST['reg_anmat'];
	$criticidad = $_POST['criticidad'];
	$sector = $_POST['sector'];
	$numero_serie = $_POST['numero_serie'];
	$proveedor = $_POST['proveedor'];
	$garantia_original = $_POST['garantia_original'];
	$fecha_registro = $_POST['fecha_registro'];
	$fecha_fabricacion = $_POST['fecha_fabricacion'];
	$fecha_adquisicion = $_POST['fecha_adquisicion'];
	$fecha_instalacion = $_POST['fecha_instalacion'];

	// Consulta para obtener el último código asignado
	$sql_last = "SELECT MAX(CAST(SUBSTRING(codigo_equipo, 4) AS UNSIGNED)) AS ultimo_codigo FROM equipos";
	$result_last = mysqli_query($con, $sql_last);
	$row_last = mysqli_fetch_assoc($result_last);

	$ultimo_codigo = $row_last['ultimo_codigo'] ? $row_last['ultimo_codigo'] : 0; // Si no hay registros, empieza en 0
	$codigo_equipo = 'PS-' . str_pad($ultimo_codigo + 1, 2, '0', STR_PAD_LEFT); // Incrementar y formatear el código

	// Aquí añadimos la consulta para obtener la fecha del próximo mantenimiento preventivo
	$sql_fecha_mantenimiento = "SELECT pm.fecha_programada FROM planes_mantenimiento pm 
                            INNER JOIN equipos e ON pm.equipo_id = e.id 
                            WHERE e.codigo_equipo = '$codigo_equipo' 
                            ORDER BY pm.fecha_programada ASC LIMIT 1";
	$result_mantenimiento = mysqli_query(
		$con,
		$sql_fecha_mantenimiento
	);
	$row_mantenimiento = mysqli_fetch_assoc($result_mantenimiento);

	// Verificar si existe un próximo mantenimiento
	$fecha_proximo_mantenimiento = $row_mantenimiento ? $row_mantenimiento['fecha_programada'] : 'No programado';

	// Código QR con la información del equipo y la fecha del próximo mantenimiento
	$qr_data = "Código: $codigo_equipo\nEquipo: $equipo\nModelo: $modelo\nFabricante: $fabricante\nNúmero de serie: $numero_serie\nSector: $sector\nPróximo Mantenimiento: $fecha_proximo_mantenimiento";
	$qr_url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" . urlencode($qr_data);

	// Query para insertar los datos en la tabla
	$sql = "INSERT INTO equipos (codigo_equipo, situacion, equipo, modelo, fabricante, reg_anmat, criticidad, sector, numero_serie, proveedor, garantia_original, fecha_registro, fecha_fabricacion, fecha_adquisicion, fecha_instalacion) 
    VALUES ('$codigo_equipo', '$situacion', '$equipo', '$modelo', '$fabricante', '$reg_anmat', '$criticidad', '$sector', '$numero_serie', '$proveedor', '$garantia_original', '$fecha_registro', '$fecha_fabricacion', '$fecha_adquisicion', '$fecha_instalacion')";


	if (mysqli_query($con, $sql)) {
		$query = "SELECT equipo, modelo FROM equipos WHERE codigo_equipo = '$codigo_equipo'";
		$result = mysqli_query($con, $query);

		if ($result && mysqli_num_rows($result) > 0) {
			$row = mysqli_fetch_assoc($result);
			$nombre_equipo = $row['equipo'];
			$modelo_equipo = $row['modelo'];

			echo "<div class='container text-center qr-container'>";
			echo "<div class='alert alert-success'>Equipo registrado exitosamente: <strong>$nombre_equipo</strong> (Modelo: <strong>$modelo_equipo</strong>) con el código: <strong>$codigo_equipo</strong></div>";
			echo "<div><img src='$qr_url' alt='Código QR para el equipo'></div>";

			// Formulario para descargar el PDF
			echo "<form method='post' action='descargar_pdf.php'>";
			echo "<input type='hidden' name='codigo_equipo' value='$codigo_equipo'>";
			echo "<input type='hidden' name='qr_url' value='$qr_url'>";
			echo "<input type='hidden' name='fecha_proximo_mantenimiento' value='$fecha_proximo_mantenimiento'>";
			echo "<button type='submit' class='btn btn-primary mt-3'>Descargar PDF</button>";
			echo "</form>";
		} else {
			echo "<div class='alert alert-danger'>Error al obtener el equipo registrado.</div>";
		}
	} else {
		echo "<div class='alert alert-danger'>Error: " . mysqli_error($con) . "</div>";
	}
}
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
	<style>
		.qr-container {
			text-align: center;
			/* Centra el contenido horizontalmente */
			margin-top: 70px;
			/* Espacio superior opcional */
			margin-right: 50px;
		}


		.qr-container img {
			max-width: 150px;
			/* Ajusta el tamaño del QR */
			height: 150px;
			/* Mantiene la proporción de la imagen */
		}
	</style>
</head>

<body>
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
								<h1 class="mainTitle">Registrar Equipo</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Registar</span>
								</li>
								<li class="active">
									<span>Equipos</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: BASIC EXAMPLE -->
					<div class="container mt-5">

						<form action="manage-users.php" method="POST">
							<input type="hidden" name="codigo_equipo" value="<?php echo $codigo_equipo; ?>">
							<!-- Situación -->
							<div class="form-group">
								<label for="situacion">Situación:</label>
								<select class="form-control" id="situacion" name="situacion" required>
									<option value="Propio">Propio</option>
									<option value="Comodato">Comodato</option>
									<option value="Alquilado">Alquilado</option>
									<option value="Prestamo">Prestamo</option>
									<option value="Tercerizado">Tercerizado</option>
									<option value="Otros">Otros</option>
								</select>
							</div>
							<!-- Equipo -->
							<div class="form-group">
								<label for="equipo">Equipo:</label>
								<input type="text" class="form-control" id="equipo" name="equipo" required>
							</div>
							<!-- Modelo -->
							<div class="form-group">
								<label for="modelo">Modelo:</label>
								<input type="text" class="form-control" id="modelo" name="modelo">
							</div>
							<!-- Fabricante -->
							<div class="form-group">
								<label for="fabricante">Fabricante:</label>
								<input type="text" class="form-control" id="fabricante" name="fabricante">
							</div>
							<!-- Reg ANMAT -->
							<div class="form-group">
								<label for="reg_anmat">Registro ANMAT:</label>
								<input type="text" class="form-control" id="reg_anmat" name="reg_anmat">
							</div>
							<!-- Criticidad -->
							<div class="form-group">
								<label for="criticidad">Criticidad:</label>
								<select class="form-control" id="criticidad" name="criticidad" required>
									<option value="Alta">Alta</option>
									<option value="Media">Media</option>
									<option value="Baja">Baja</option>
								</select>
							</div>
							<!-- Sector -->
							<div class="form-group">
								<label for="sector">Sector:</label>
								<select class="form-control" id="sector" name="sector" required>
									<option value="Consultorio">Consultorio</option>
									<option value="Endoscopia">Endoscopia</option>
									<option value="Esterilización">Esterilización</option>
									<option value="Guardia">Guardia</option>
									<option value="Hemodinamia">Hemodinamia</option>
									<option value="Hospital de día">Hospital de día</option>
									<option value="Internacion">Internación</option>
									<option value="Quirófano">Quirófano</option>
									<option value="Rayos">Rayos</option>
									<option value="Tomografía y resonancia">Tomografía y resonancia</option>
									<option value="Uco">UCO</option>
									<option value="Uti adulto">UTI adulto</option>
									<option value="Uti pediátrica">UTI pediátrica</option>
									<option value="Uti pediátrica">Neonatología</option>
								</select>
							</div>
							<!-- Número de Serie -->
							<div class="form-group">
								<label for="numero_serie">Número de Serie:</label>
								<input type="text" class="form-control" id="numero_serie" name="numero_serie">
							</div>
							<!-- Proveedor -->
							<div class="form-group">
								<label for="proveedor">Proveedor:</label>
								<input type="text" class="form-control" id="proveedor" name="proveedor">
							</div>
							<!-- Garantía Original -->
							<div class="form-group">
								<label for="garantia_original">Garantía Original (YYYY-MM-DD):</label>
								<input type="date" class="form-control" id="garantia_original" name="garantia_original">
							</div>
							<!-- Fecha de Registro -->
							<div class="form-group">
								<label for="fecha_registro">Fecha de Registro (YYYY-MM-DD):</label>
								<input type="date" class="form-control" id="fecha_registro" name="fecha_registro" required>
							</div>
							<!-- Fecha de Fabricación -->
							<div class="form-group">
								<label for="fecha_fabricacion">Fecha de Fabricación (YYYY-MM-DD):</label>
								<input type="date" class="form-control" id="fecha_fabricacion" name="fecha_fabricacion">
							</div>
							<!-- Fecha de Adquisición -->
							<div class="form-group">
								<label for="fecha_adquisicion">Fecha de Adquisición (YYYY-MM-DD):</label>
								<input type="date" class="form-control" id="fecha_adquisicion" name="fecha_adquisicion">
							</div>
							<!-- Fecha de Instalación -->
							<div class="form-group">
								<label for="fecha_instalacion">Fecha de Instalación (YYYY-MM-DD):</label>
								<input type="date" class="form-control" id="fecha_instalacion" name="fecha_instalacion">
							</div>

							<button type="submit" class="btn btn-primary">Guardar Equipo</button>

						</form>

					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- start: SETTINGS -->
	<?php include('include/setting.php'); ?>

	<!-- end: SETTINGS -->

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