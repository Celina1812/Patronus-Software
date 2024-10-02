<?php
$id_solicitud = $_GET['id'];
?>

<form action="guardar_descripcion_trabajo.php" method="POST">
    <input type="hidden" name="id_solicitud" value="<?php echo $id_solicitud; ?>">
    <label for="descripcion">Descripción del trabajo realizado:</label>
    <textarea name="descripcion" rows="5" cols="40"></textarea>
    <input type="submit" value="Guardar">
</form>