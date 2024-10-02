<!--PRODUCTOS-->

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
	<title>Patronus | Inventario</title>

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
		form {
			background-color: #f9f9f9;
			padding: 20px;
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			margin-bottom: 20px;
		}

		label {
			display: block;
			font-weight: bold;
			margin-bottom: 5px;
		}

		input[type="text"],
		input[type="number"],
		input[type="date"] {
			width: 100%;
			padding: 10px;
			margin-bottom: 15px;
			border: 1px solid #ccc;
			border-radius: 4px;
			box-sizing: border-box;
		}

		button {
			background-color: rgb(0, 185, 206);
			color: white;
			border: none;
			padding: 10px 20px;
			cursor: pointer;
			border-radius: 4px;
			font-size: 14px;
			transition: background-color 0.3s;
		}

		button:hover {
			background-color: rgb(250, 185, 206);
		}

		table {
			width: 100%;
			border-collapse: collapse;
			margin-bottom: 20px;
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

		.container-fullw {
			background-color: white;
			padding: 30px;
			border-radius: 8px;
		}

		h3 {
			margin-top: 0;
			color: rgb(0, 185, 206);
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
								<h1 class="mainTitle">Inventario de productos</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Admin </span>
								</li>
								<li class="active">
									<span>User Session Logs</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->

					<!-- start: body -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">
								<h3>Agregar Producto</h3>
								<form action="agregar_producto.php" method="POST">
									<label for="codigo">Código Producto:</label>
									<input type="text" id="codigo" name="codigo_producto" required><br>

									<label for="descripcion">Descripción:</label>
									<input type="text" id="descripcion" name="descripcion" required><br>

									<label for="existencias">Existencias Iniciales:</label>
									<input type="number" id="existencias" name="existencias_iniciales" required><br>

									<button type="submit">Agregar Producto</button>
								</form>
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">
								<h3>Actualizar Stock</h3>
								<form action="actualizar_stock.php" method="POST">
									<label for="codigo">Código Producto:</label>
									<input type="text" id="codigo" name="codigo_producto" required><br>

									<label for="entradas">Entradas:</label>
									<input type="number" id="entradas" name="entradas"><br>

									<label for="salidas">Salidas:</label>
									<input type="number" id="salidas" name="salidas"><br>

									<button type="submit">Actualizar Stock</button>
								</form>
							</div>
						</div>
					</div>
					<h3>Inventario de Productos</h3>
					<div class="table-responsive">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>Código Producto</th>
									<th>Descripción</th>
									<th>Existencias Iniciales</th>
									<th>Entradas</th>
									<th>Salidas</th>
									<th>Stock Actual</th>
								</tr>
							</thead>
							<tbody>
								<?php
								$query = "SELECT * FROM productos";
								$result = mysqli_query($con, $query);
								if ($result && mysqli_num_rows($result) > 0) {
									while ($row = mysqli_fetch_assoc($result)) {
										echo "<tr>
											<td>{$row['codigo_producto']}</td>
											<td>{$row['descripcion']}</td>
											<td>{$row['existencias_iniciales']}</td>
											<td>{$row['entradas']}</td>
											<td>{$row['salidas']}</td>
											<td>{$row['stock']}</td>
										</tr>";
									}
								} else {
									echo "<tr><td colspan='6'>No hay productos en el inventario</td></tr>";
								}
								?>
							</tbody>
						</table>
					</div>
					<!-- end: body -->
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