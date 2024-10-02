<?php
include_once('hms/include/config.php');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$alertSuccess = false;  // Indicador para mostrar la alerta de éxito

if (isset($_POST['submit'])) {
	// Validar datos del formulario
	$name = trim($_POST['fullname']);
	$email = trim($_POST['emailid']);
	$mobileno = trim($_POST['mobileno']);
	$dscrption = trim($_POST['description']);

	$errors = [];

	// Validar el nombre (no vacío y al menos 3 caracteres)
	if (empty($name) || strlen($name) < 3) {
		$errors[] = "El nombre debe tener al menos 3 caracteres.";
	}

	// Validar el email
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$errors[] = "El email ingresado no es válido.";
	}

	// Validar el número de teléfono (solo dígitos y longitud mínima)
	if (!preg_match("/^[0-9]{10}$/", $mobileno)) {
		$errors[] = "El número de teléfono debe tener 10 dígitos.";
	}

	// Validar descripción (no vacío)
	if (empty($dscrption)) {
		$errors[] = "La descripción no puede estar vacía.";
	}

	// Si hay errores, mostrarlos
	if (!empty($errors)) {
		$errorMessages = implode("\n", $errors);
		echo "<script>
                Swal.fire({
                    icon: 'error',
                    title: 'Errores en el formulario',
                    text: '$errorMessages',
                    showConfirmButton: true,
                    confirmButtonText: 'Ok'
                });
            </script>";
	} else {
		// Si no hay errores, proceder a insertar los datos en la base de datos
		$stmt = $con->prepare("INSERT INTO tblcontactus (fullname, email, contactno, message) VALUES (?, ?, ?, ?)");

		if ($stmt) {
			// Enlazar los parámetros y ejecutar la consulta
			$stmt->bind_param("ssss", $name, $email, $mobileno, $dscrption);

			if ($stmt->execute()) {
				// Marcar éxito para mostrar la alerta
				$alertSuccess = true;
			} else {
				// Mostrar error de consulta
				echo "Error: " . $stmt->error;
			}
		}
	}
}
?>

<!DOCTYPE HTML>
<html>

<head>
	<title>Patronus | Contacta con nosotros</title>
	<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
	<link href="https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap" rel="stylesheet">
	<link rel="icon" type="image/png" href="images/Patronus.png">
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<style>
	body {
		font-family: 'New Amsterdam', serif;
		margin: 0;
		padding: 0;
		background-color: #f4f4f4;
		color: #333;
	}

	.header {
		background-color: #333;
		padding: 20px 0;
	}

	.header .wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo a {
		font-size: 24px;
		color: #fff;
		text-decoration: none;
		font-weight: 500;
	}

	.contact {
		padding: 50px 0;
		background-color: #fff;
	}

	.section {
		display: flex;
		justify-content: center;
	}

	.contact-form {
		background-color: #fff;
		/* Cambia el fondo a blanco */
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		/* Mejora el contraste */
		max-width: 600px;
		width: 100%;
		border: 1px solid #ccc;
		/* Añade un borde ligero */
	}

	.contact-form h2 {
		font-size: 28px;
		margin-bottom: 20px;
		color: #333;
		/* Asegura un buen contraste en el texto */
		text-align: center;
	}

	.contact-form div {
		margin-bottom: 20px;
	}

	.contact-form label {
		font-size: 14px;
		color: #666;
		/* Más oscuro para mejor legibilidad */
	}

	.contact-form input[type="text"],
	.contact-form input[type="email"],
	.contact-form textarea {
		width: 100%;
		padding: 10px;
		margin-top: 5px;
		border: 1px solid #999;
		/* Bordes más oscuros */
		border-radius: 5px;
		font-size: 16px;
		color: #333;
		background-color: #f9f9f9;
		/* Fondo claro para los inputs */
	}

	.contact-form input[type="submit"] {
		width: 100%;
		padding: 12px;
		background-color: #333;
		color: #fff;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.contact-form input[type="submit"]:hover {
		background-color: #555;
	}

	textarea {
		height: 100px;
		resize: none;
		background-color: #f9f9f9;
		/* Fondo claro para mejor visibilidad */
	}

	.footer {
		background-color: #333;
		padding: 20px 0;
		color: #fff;
		text-align: center;
		margin-top: 50px;
	}

	.footer a {
		color: #1e90ff;
		text-decoration: none;
	}

	.footer a:hover {
		text-decoration: underline;
	}
</style>


<body>

	<!--start-header-->
	<div class="header">
		<div class="wrap">
			<div class="logo">
				<a href="index.html">Patronus Software</a>
			</div>
		</div>
	</div>

	<!--start-contact-section-->
	<div class="contact">
		<div class="wrap">
			<div class="section">
				<div class="contact-form">
					<h2>Contacta con nosotros</h2>
					<form name="contactus" method="post" action="contact.php">
						<div>
							<span><label>NOMBRE</label></span>
							<span><input type="text" name="fullname" required="true"></span>
						</div>
						<div>
							<span><label>E-MAIL</label></span>
							<span><input type="email" name="emailid" required="true"></span>
						</div>
						<div>
							<span><label>TELÉFONO</label></span>
							<span><input type="text" name="mobileno" required="true"></span>
						</div>
						<div>
							<span><label>Descripción</label></span>
							<span><textarea name="description" required="true"></textarea></span>
						</div>
						<div>
							<span><input type="submit" name="submit" value="Enviar mensaje"></span>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script>
		document.addEventListener('DOMContentLoaded', function() {
			<?php if ($alertSuccess): ?>
				Swal.fire({
					icon: 'success',
					title: '¡Enviado!',
					text: 'Tu mensaje ha sido enviado correctamente.',
					showConfirmButton: true,
					confirmButtonText: 'Ok'
				}).then(function() {
					window.location = 'contact.php';
				});
			<?php endif; ?>
		});
	</script>

	<!--start-footer-->
	<div class="footer">
		<div class="wrap">
			<div class="footer-left">
				<p>&copy; 2024 Patronus Software</p>
			</div>
		</div>
	</div>

</body>

</html>