<?php error_reporting(E_ALL);  // Mostrar todos los errores
ini_set('display_errors', 1);  // Mostrar los errores en la salida 
?>
<header class="navbar navbar-default navbar-static-top">
	<!-- start: NAVBAR HEADER -->
	<div class="navbar-header">
		<a href="#" class="sidebar-mobile-toggler pull-left hidden-md hidden-lg" class="btn btn-navbar sidebar-toggle" data-toggle-class="app-slide-off" data-toggle-target="#app" data-toggle-click-outside="#sidebar">
			<i class="ti-align-justify"></i>
		</a>
		<a class="navbar-brand" href="#">
			<h2 style="display: flex; align-items: center; margin-top: 20px;">Ingeniero</h2>
		</a>
		<a href="#" class="sidebar-toggler pull-right visible-md visible-lg" data-toggle-class="app-sidebar-closed" data-toggle-target="#app">
			<i class="ti-align-justify"></i>
		</a>
		<a class="pull-right menu-toggler visible-xs-block" id="menu-toggler" data-toggle="collapse" href=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span>
			<i class="ti-view-grid"></i>
		</a>
	</div>
	<!-- end: NAVBAR HEADER -->

	<!-- start: NAVBAR COLLAPSE -->
	<div class="navbar-collapse collapse">
		<ul class="nav navbar-right">

			<!-- Icono Bloc de notas -->
			<li class="dropdown notes-menu">
						<li class="notes-menu">
							<a href="bloc_notas.php">
								<i class="fa fa-edit"></i> <!-- Icono de bloc de notas -->
							</a>
						</li>
			</li>

			<!-- Icono de Notificaciones -->
			<li class="dropdown notifications-menu">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
					<i class="fa fa-bell"></i>
					<span class="label label-danger" id="notificaciones-count">0</span>
				</a>
				<ul class="dropdown-menu">
					<li class="header">Tienes <span id="num-notificaciones">0</span> notificaciones</li>
					<li>
						<!-- Lista de notificaciones -->
						<ul class="menu" id="notificaciones-lista">
							<li>No hay notificaciones pendientes.</li>
						</ul>
					</li>
				</ul>
			</li>

			<!-- Perfil del usuario -->
			<li class="dropdown current-user">
				<a href class="dropdown-toggle" data-toggle="dropdown">
					<?php
					$query = mysqli_query($con, "select username from admin where id='" . $_SESSION['id'] . "'");
					while ($row = mysqli_fetch_array($query)) {
						$username = $row['username'];
						$nameParts = explode(" ", $username);
						$initials = "";
						foreach ($nameParts as $part) {
							$initials .= strtoupper($part[0]);
						}
						echo "<div class='user-icon'>$initials</div>";
					}
					?>
				</a>
				<ul class="dropdown-menu dropdown-dark">
					<li><a href="edit-profile.php">Mi Perfil</a></li>
					<li><a href="change-password.php">Cambiar contraseña</a></li>
					<li><a href="logout.php">Cerrar sesión</a></li>
				</ul>
			</li>
		</ul>

		<script>
			function cargarNotificaciones() {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'fetch_alertas.php', true);
				xhr.onload = function() {
					if (this.status === 200) {
						var notificaciones = JSON.parse(this.responseText);
						var notificacionesLista = document.getElementById('notificaciones-lista');
						var notificacionesCount = document.getElementById('notificaciones-count');
						var numNotificaciones = document.getElementById('num-notificaciones');

						notificacionesLista.innerHTML = ''; // Limpiar la lista

						if (notificaciones.length > 0) {
							notificacionesCount.textContent = notificaciones.length;
							numNotificaciones.textContent = notificaciones.length;
							notificaciones.forEach(function(notificacion) {
								var li = document.createElement('li');
								li.textContent = notificacion;
								notificacionesLista.appendChild(li);
							});
						} else {
							notificacionesCount.textContent = '0';
							numNotificaciones.textContent = '0';
							notificacionesLista.innerHTML = '<li>No hay notificaciones pendientes.</li>';
						}
					}
				};
				xhr.send();
			}

			// Llamar a la función cada 60 segundos
			setInterval(cargarNotificaciones, 60000);

			// Cargar notificaciones al inicio
			cargarNotificaciones();
		</script>

		<!-- start: estilos -->
		<style>
			.user-icon {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-color: #3498db;
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				font-weight: bold;
			}

			.notifications-menu .dropdown-menu {
				width: 300px;
				padding: 10px;
			}

			.label-danger {
				background-color: #e74c3c;
				color: white;
				padding: 3px 7px;
				border-radius: 50%;
			}

			.notes-menu .dropdown-menu {
				width: 300px;
				/* Ajusta según sea necesario */
				padding: 10px;
			}

			#nota-textarea {
				width: 100%;
				resize: none;
				/* Evitar que el usuario cambie el tamaño del textarea */
			}

			#notas-lista li {
				margin: 5px 0;
				/* Espaciado entre las notas */
			}

			/*.fa-pencil-alt,
			.fa-pencil {
				font-size: 24px;
				/* Aumentar el tamaño del icono
				color: #000;
				/* Cambiar el color a negro 
			}*/
		</style>
		<!-- end: estilos -->
	</div>
	<!-- end: NAVBAR COLLAPSE -->
</header>