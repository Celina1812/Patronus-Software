<!--SECTORES-->

<?php
session_start();
error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

if (isset($_POST['submit'])) {
	$sql = mysqli_query($con, "insert into doctorSpecilization(specilization) values('" . $_POST['doctorspecilization'] . "')");

	if ($sql) {
		$_SESSION['msg'] = "success";
	} else {
		$_SESSION['msg'] = "error";
	}
}

if (isset($_GET['del'])) {
	$sql = mysqli_query($con, "delete from doctorSpecilization where id = '" . $_GET['id'] . "'");

	if ($sql) {
		$_SESSION['msg'] = "deleted";
	} else {
		$_SESSION['msg'] = "error";
	}
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>Patronus | Sectores</title>

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
</head>

<body>
	<?php
	if (isset($_SESSION['msg']) && $_SESSION['msg'] === "success") {
		echo "<script>
            Swal.fire({
                icon: 'success',
                title: '¡Sector agregado!',
                text: 'El sector ha sido agregado correctamente.',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(function() {
                window.location = 'doctor-specilization.php'; // Redirige a la misma página u otra si lo prefieres
            });
        </script>";
		$_SESSION['msg'] = "";
	} elseif (isset($_SESSION['msg']) && $_SESSION['msg'] === "error") {
		echo "<script>
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al realizar la operación. Por favor, intenta nuevamente.',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            });
        </script>";
		$_SESSION['msg'] = "";
	} elseif (isset($_SESSION['msg']) && $_SESSION['msg'] === "deleted") {
		echo "<script>
            Swal.fire({
                icon: 'success',
                title: '¡Sector eliminado!',
                text: 'El sector ha sido eliminado correctamente.',
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            }).then(function() {
                window.location = 'doctor-specilization.php'; // Redirige después de eliminar
            });
        </script>";
		$_SESSION['msg'] = "";
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
								<h1 class="mainTitle">Sectores del hospital</h1>
							</div>
							<ol class="breadcrumb">
								<li>
									<span>Admin</span>
								</li>
								<li class="active">
									<span>Add Doctor Specialization</span>
								</li>
							</ol>
						</div>
					</section>
					<!-- end: PAGE TITLE -->
					<!-- start: Body -->
					<div class="container-fluid container-fullw bg-white">
						<div class="row">
							<div class="col-md-12">

								<div class="row margin-top-30">
									<div class="col-lg-6 col-md-12">
										<div class="panel panel-white">
											<div class="panel-heading">
												<h5 class="panel-title">Añadir sector</h5>
											</div>
											<div class="panel-body">
												<p style="color:red;">
													<?php
													if (isset($_SESSION['msg'])) {
														echo htmlentities($_SESSION['msg']);
														$_SESSION['msg'] = ""; 
													} else {
														echo ""; 
													}
													?>
												</p>

												<form role="form" name="dcotorspcl" method="post">
													<div class="form-group">
														<label for="exampleInputEmail1">
															Sector
														</label>
														<input type="text" name="doctorspecilization" class="form-control" placeholder="Ingresa nombre del sector">
													</div>

													<button type="submit" name="submit" class="btn btn-o btn-primary">
														Guardar
													</button>
												</form>
											</div>
										</div>
									</div>

								</div>
							</div>
							<div class="col-lg-12 col-md-12">
								<div class="panel panel-white">
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">
								<h5 class="over-title margin-bottom-15">Listado <span class="text-bold">de sectores del hospital</span></h5>

								<table class="table table-hover" id="sample-table-1">
									<thead>
										<tr>
											<th class="center">#</th>
											<th>Specialization</th>
											<th class="hidden-xs">Creation Date</th>
											<th>Updation Date</th>
											<th>Action</th>

										</tr>
									</thead>
									<tbody>
										<?php
										$sql = mysqli_query($con, "select * from doctorSpecilization");
										$cnt = 1;
										while ($row = mysqli_fetch_array($sql)) {
										?>

											<tr>
												<td class="center"><?php echo $cnt; ?>.</td>
												<td class="hidden-xs"><?php echo $row['specilization']; ?></td>
												<td><?php echo $row['creationDate']; ?></td>
												<td><?php echo $row['updationDate']; ?>
												</td>

												<td>
													<div class="visible-md visible-lg hidden-sm hidden-xs">
														<a href="edit-doctor-specialization.php?id=<?php echo $row['id']; ?>" class="btn btn-transparent btn-xs" tooltip-placement="top" tooltip="Edit"><i class="fa fa-pencil"></i></a>

														<a href="doctor-specilization.php?id=<?php echo $row['id'] ?>&del=delete" onClick="return confirm('Are you sure you want to delete?')" class="btn btn-transparent btn-xs tooltips" tooltip-placement="top" tooltip="Remove"><i class="fa fa-times fa fa-white"></i></a>
													</div>
													<div class="visible-xs visible-sm hidden-md hidden-lg">
														<div class="btn-group" dropdown is-open="status.isopen">
															<button type="button" class="btn btn-primary btn-o btn-sm dropdown-toggle" dropdown-toggle>
																<i class="fa fa-cog"></i>&nbsp;<span class="caret"></span>
															</button>
															<ul class="dropdown-menu pull-right dropdown-light" role="menu">
																<li>
																	<a href="#">
																		Edit
																	</a>
																</li>
																<li>
																	<a href="#">
																		Share
																	</a>
																</li>
																<li>
																	<a href="#">
																		Remove
																	</a>
																</li>
															</ul>
														</div>
													</div>
												</td>
											</tr>

										<?php
											$cnt = $cnt + 1;
										} ?>
									</tbody>
								</table>
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
	</script>
	<!-- end: JavaScript Event Handlers for this page -->
	<!-- end: CLIP-TWO JAVASCRIPTS -->
</body>

</html>