<?php
session_start();
//error_reporting(0);
include('include/config.php');
include('include/checklogin.php');
check_login();

$msg = '';

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $updationDate = date('Y-m-d H:i:s');
    $address = $_POST['address'];
    $city = $_POST['city'];
    $gender = $_POST['gender'];

    $sql = mysqli_query($con, "UPDATE admin SET username='$username', password='$password', updationDate='$updationDate', address='$address', city='$city', gender='$gender' WHERE id='" . $_SESSION['id'] . "'");
    if ($sql) {
        $msg = "Su perfil se actualizó correctamente";
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
                                <h1 class="mainTitle">Mi cuenta | Editar perfil</h1>
                            </div>
                            <ol class="breadcrumb">
                                <li>
                                    <span>Mi cuenta </span>
                                </li>
                                <li class="active">
                                    <span>Editar perfil</span>
                                </li>
                            </ol>
                        </div>
                    </section>
                    <!-- end: PAGE TITLE -->
                    <!-- start: BASIC EXAMPLE -->
                    <div class="container-fluid container-fullw bg-white">
                        <div class="row">
                            <div class="col-md-12">
                                <h5 style="color: green; font-size:18px; ">
                                    <?php if ($msg) {
                                        echo htmlentities($msg);
                                    } ?> </h5>
                                <div class="row margin-top-30">
                                    <div class="col-lg-8 col-md-12">
                                        <div class="panel panel-white">
                                            <div class="panel-heading">
                                                <h5 class="panel-title">Editar perfil</h5>
                                            </div>
                                            <div class="panel-body">
                                                <?php if ($msg) {
                                                    echo htmlentities($msg);
                                                } ?>
                                                </h5>
                                                <div class="row margin-top-30">
                                                    <div class="col-lg-8 col-md-12">
                                                        <div class="panel panel-white">

                                                            <div class="panel-body">
                                                                <?php
                                                                // Cambio la consulta para obtener datos de la tabla 'admin'
                                                                $sql = mysqli_query($con, "SELECT * FROM admin WHERE id='" . $_SESSION['id'] . "'");
                                                                while ($data = mysqli_fetch_array($sql)) {
                                                                ?>
                                                                    <h4>Perfil de <?php echo htmlentities($data['username']); ?></h4>
                                                                    <p><b>Perfil creado el día: </b><?php echo htmlentities($data['updationDate']); ?></p>
                                                                    <hr />
                                                                    <form role="form" name="edit" method="post">

                                                                        <div class="form-group">
                                                                            <label for="username">Nombre de usuario</label>
                                                                            <input type="text" name="username" class="form-control" value="<?php echo htmlentities($data['username']); ?>">
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <label for="password">Contraseña</label>
                                                                            <input type="password" name="password" class="form-control" value="<?php echo htmlentities($data['password']); ?>">
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <label for="address">Contacto directo</label>
                                                                            <textarea name="address" class="form-control"><?php echo htmlentities($data['address']); ?></textarea>
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <label for="city">Sector</label>
                                                                            <input type="text" name="city" class="form-control" required="required" value="<?php echo htmlentities($data['city']); ?>">
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <label for="gender">Género</label>
                                                                            <select name="gender" class="form-control" required="required">
                                                                                <option value="" disabled selected>Seleccione género</option>
                                                                                <option value="male" <?php if ($data['gender'] == 'male') echo 'selected'; ?>>Masculino</option>
                                                                                <option value="female" <?php if ($data['gender'] == 'female') echo 'selected'; ?>>Femenino</option>
                                                                                <option value="other" <?php if ($data['gender'] == 'other') echo 'selected'; ?>>Otro</option>
                                                                            </select>
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <label for="fess">
                                                                                Contacto
                                                                            </label>
                                                                            <input type="email" name="uemail" class="form-control" readonly="readonly" value="<?php echo htmlentities($data['email']); ?>">
                                                                            <a href="change-emaild.php">Actualice su dirección de correo electrónico</a>
                                                                        </div>

                                                                        <button type="submit" name="submit" class="btn btn-o btn-primary">Guardar</button>
                                                                    </form>
                                                                <?php } ?>
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