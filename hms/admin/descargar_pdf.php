<?php
// Incluye la librería TCPDF
require_once($_SERVER['DOCUMENT_ROOT'] . '/hospital/hospital/tcpdf/tcpdf.php');

// Recibe los datos del equipo
$codigo_equipo = $_POST['codigo_equipo'] ?? ''; // TAG del equipo
$qr_url = $_POST['qr_url'] ?? '';  // URL del código QR

// Verifica que se hayan enviado los datos necesarios
if (empty($codigo_equipo) || empty($qr_url)) {
    die('Faltan datos necesarios para generar el PDF.');
}

// Conectar a la base de datos
include('include/config.php');

// Usa consultas preparadas para evitar inyecciones SQL
$query = "SELECT e.equipo, e.modelo, e.numero_serie, pm.fecha_programada 
          FROM equipos e
          LEFT JOIN planes_mantenimiento pm ON e.codigo_equipo = pm.equipo_id
          WHERE e.codigo_equipo = ?";
$stmt = $con->prepare($query);
$stmt->bind_param("s", $codigo_equipo);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nombre_equipo = $row['equipo'];
    $numero_serie = $row['numero_serie'];
    $fecha_proximo_mantenimiento = $row['fecha_programada'] ?? 'No disponible';
} else {
    die('Equipo no encontrado en la base de datos.');
}

// Función para generar el PDF
function generarPDF($codigo_equipo, $qr_url, $nombre_equipo, $numero_serie, $fecha_proximo_mantenimiento)
{
    // Crear un nuevo documento PDF con dimensiones personalizadas (55 x 32 mm)
    $pdf = new TCPDF('L', PDF_UNIT, array(32, 55)); // 'L' para orientación horizontal

    // Configuración inicial del PDF
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Patronus');
    $pdf->SetTitle('Etiqueta de Equipo Médico');

    // Eliminar márgenes para maximizar el uso del espacio
    $pdf->SetMargins(0, 0, 0, true);
    $pdf->SetAutoPageBreak(false, 0);

    // Deshabilitar cabecera y pie de página que podrían generar líneas
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);

    // Añadir una página con las dimensiones definidas
    $pdf->AddPage();

    // ---- Sección izquierda ----

    // Descripción del equipo (Código del equipo, por ejemplo PS-34)
    $pdf->SetFont('helvetica', 'B', 10);
    $pdf->SetXY(1, 7); // Ajuste de posición para centrarlo
    $pdf->Cell(0, 0, strtoupper($nombre_equipo), 0, 1, 'L'); // Texto en mayúsculas

    // Información del TAG y SN (se muestran debajo del código del equipo)
    $pdf->SetFont('helvetica', '', 8);
    $pdf->SetXY(5, 14); // Ajuste del TAG
    $pdf->Cell(0, 0, 'TAG: ' . $codigo_equipo, 0, 1, 'L');

    $pdf->SetXY(5, 18); // Ajuste del SN
    $pdf->Cell(0, 0, 'SN: ' . $numero_serie, 0, 1, 'L');

    // ---- Sección derecha ----

    // Código QR (verificar que la URL sea válida)
    if (filter_var($qr_url, FILTER_VALIDATE_URL)) {
        $pdf->Image($qr_url, 35, 5, 15, 15, 'PNG'); // Ajuste del QR (x, y, width, height)
    } else {
        die('URL del código QR no es válida.');
    }

    // Línea vertical (ajustada)
    $pdf->SetLineWidth(0.3); // Ajuste del grosor de la línea
    $pdf->Line(32, 5, 32, 24); // Línea vertical

    // Eliminar o comentar cualquier línea horizontal para evitar errores:
    $pdf->Line(5, 24, 50, 24); // Línea horizontal eliminada

    // Texto inferior derecha: "PATRONUS SOFTWARE"
    $pdf->SetFont('helvetica', '', 6);
    $pdf->SetXY(37, 26); // Ajuste para que esté alineado con la esquina inferior derecha
    $pdf->Cell(0, 0, 'PATRONUS', 0, 1, 'L');
    $pdf->SetXY(37, 29);
    $pdf->Cell(0, 0, 'SOFTWARE', 0, 1, 'L');

    // Salida del PDF (el PDF se enviará al navegador para descargar)
    $pdf->Output('etiqueta_equipo_' . $codigo_equipo . '.pdf', 'D');
}

// Llamada a la función para generar el PDF
generarPDF($codigo_equipo, $qr_url, $nombre_equipo, $numero_serie, $fecha_proximo_mantenimiento);
?>