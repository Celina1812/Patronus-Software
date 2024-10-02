<?php
// Incluir el archivo de configuración para la conexión a la base de datos
require_once('include/config.php');

// Consultar el número de solicitudes pendientes
$sqlContador = "SELECT COUNT(*) as totalPendientes FROM appointment WHERE estado = 'pendiente'";
$resultadoContador = mysqli_query($con, $sqlContador);
$solicitudesPendientes = 0;

if ($resultadoContador) {
	$rowContador = mysqli_fetch_assoc($resultadoContador);
	$solicitudesPendientes = $rowContador['totalPendientes'];
}
?>

<div class="sidebar app-aside" id="sidebar">
	<div class="sidebar-container perfect-scrollbar">

		<nav>

			<!-- start: MAIN NAVIGATION MENU -->
			<div class="navbar-title">
				<span>Menú principal</span>
			</div>
			<ul class="main-navigation-menu">
				<li>
					<a href="dashboard.php">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-home"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Dashboard </span>
							</div>
						</div>
					</a>
				</li>

				<li>
					<a href="doctor-specilization.php">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-location-pin"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Sectores </span>
							</div>
						</div>
					</a>
				</li>


				<li>
					<a href="appointment-history.php">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-pin-alt"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Triaje de solicitudes </span>
								<?php if ($solicitudesPendientes > 0): ?>
									<span class="badge badge-danger"><?php echo $solicitudesPendientes; ?></span>
								<?php endif; ?>
							</div>
						</div>
					</a>
				</li>

				<li>
					<a href="javascript:void(0)">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-files"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Mis ordenes de servicio </span><i class="icon-arrow"></i>
							</div>
						</div>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="add-doctor.php">
								<span class="title"> Ordenes aceptadas</span>
							</a>
						</li>
						<li>
							<a href="Manage-doctors.php">
								<span class="title"> Ordenes completadas </span>
							</a>
						</li>
					</ul>
				</li>

				<li>
					<a href="javascript:void(0)">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-briefcase"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Equipos </span><i class="icon-arrow"></i>
							</div>
						</div>
					</a>
					<ul class="sub-menu">

						<li>
							<a href="manage-users.php">
								<span class="title"> Registrar Equipos </span>
							</a>
						</li>
						<li>
							<a href="equipo.php">
								<span class="title"> Escanear QR </span>
							</a>
						</li>

					</ul>
				</li>
				<li>
					<a href="javascript:void(0)">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-write"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Mantenimiento preventivo</span><i class="icon-arrow"></i>
							</div>
						</div>
					</a>
					<ul class="sub-menu">

						<li>
							<a href="manage-patient.php">
								<span class="title">Detalles del mantenimiento</span>
							</a>
						</li>

					</ul>
				</li>

				<li>
					<a href="javascript:void(0)">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-agenda"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Planes de mantenimiento </span><i class="icon-arrow"></i>
							</div>
						</div>
					</a>
					<ul class="sub-menu">

						<li>
							<a href="unread-queries.php">
								<span class="title"> Agregar plan de mantenimiento </span>
							</a>
						</li>

						<li>
							<a href="read-query.php">
								<span class="title"> Historial de planes </span>
							</a>
						</li>

					</ul>
				</li>



				<li>
					<a href="user-logs.php">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-archive"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Inventario de productos </span>
							</div>
						</div>
					</a>
				</li>
				<li>
					<a href="javascript:void(0)">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-calendar"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Calendario </span><i class="icon-arrow"></i>
							</div>
						</div>
					</a>
					<ul class="sub-menu">

						<li>
							<a href="between-dates-reports.php">
								<span class="title">Fecha mantenimientos </span>
							</a>
						</li>



					</ul>

				<li>
					<a href="bloc_notas.php">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-pencil-alt"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Bloc de notas </span>
							</div>
						</div>
					</a>
				</li>
				</li>

				<li>
					<a href="patient-search.php">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-search"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Búsqueda equipos </span>
							</div>
						</div>
					</a>
				</li>
				</li>
				<li>
					<a href="javascript:void(0)">
						<div class="item-content">
							<div class="item-media">
								<i class="ti-truck"></i>
							</div>
							<div class="item-inner">
								<span class="title"> Servicio externo </span><i class="icon-arrow"></i>
							</div>
						</div>
					</a>
					<ul class="sub-menu">
						<li>
							<a href="os_correctiva.php">
								<span class="title"> Crear orden a servicio externo </span>
							</a>
						</li>
						<li>
							<a href="trabajo_servicioext.php">
								<span class="title"> Ordenes completadas </span>
							</a>
						</li>
						<li>
							<a href="transporte.php">
								<span class="title"> Transporte de equipos </span>
							</a>
						</li>

					</ul>
				</li>

			</ul>
			<!-- end: CORE FEATURES -->

		</nav>
	</div>
</div>