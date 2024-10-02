<?php
session_start();
include('include/config.php');
include('include/checklogin.php');
check_login();

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    $query = "SELECT titulo, fecha_programada, periodicidad, inspeccion_visual, funcionamiento, alarmas, bateria,materiales_necesarios, identificacion 
              FROM planes_mantenimiento 
              WHERE id = $id";

    $result = mysqli_query($con, $query);
    $data = mysqli_fetch_assoc($result);

    if (!$data) {
        die('No se encontraron datos para el ID proporcionado.');
    }
} else {
    die('ID de plan de mantenimiento no válido.');
}

require_once($_SERVER['DOCUMENT_ROOT'] . '/hospital/hospital/tcpdf/tcpdf.php');

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Patronus Software');
$pdf->SetTitle('Instrucciones de Ejecución de Procedimiento Técnico');
$pdf->SetSubject('Mantenimiento Mensual');
$pdf->SetKeywords('Mantenimiento, Procedimiento, Técnico');

$logo = $_SERVER['DOCUMENT_ROOT'] . '/hospital/hospital/images/ps-logo.png'; 
if (file_exists($logo)) {
    $pdf->Image($logo, 15, 10, 60, 20, 'PNG', '', 'T', false, 300, '', false, false, 0, false, false, false);

} else {
    die('El archivo de logo no se encuentra: ' . $logo);
}

$pdf->SetHeaderData('', 0, 'Patronus Software', 'Instrucciones de Ejecución de Procedimiento Técnico', [0, 64, 255], [0, 64, 128]);
$pdf->setFooterData([0, 64, 0], [0, 64, 128]);

$pdf->setHeaderFont([PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN]);
$pdf->setFooterFont([PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA]);

$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

$pdf->AddPage();

$pdf->SetFont('helvetica', '', 12);

$html = '
<h2 style="font-size: 24px; font-weight: bold; color: #007BFF; text-align: center; text-decoration: underline; font-family: Arial, sans-serif;">Plan de Mantenimiento</h2>
<p><strong>Título:</strong> ' . htmlspecialchars($data['titulo']) . '</p>
<p><strong>Fecha Programada:</strong> ' . htmlspecialchars($data['fecha_programada']) . '</p>
<p><strong>Periodicidad:</strong> ' . htmlspecialchars($data['periodicidad']) . '</p>
<p><strong>Inspección Visual:</strong> ' . htmlspecialchars($data['inspeccion_visual']) . '</p>
<p><strong>Funcionamiento:</strong> ' . htmlspecialchars($data['funcionamiento']) . '</p>
<p><strong>Alarmas:</strong> ' . htmlspecialchars($data['alarmas']) . '</p>
<p><strong>Batería:</strong> ' . htmlspecialchars($data['bateria']) . '</p>
<p><strong>Materiales necesarios:</strong> ' . htmlspecialchars($data['materiales_necesarios']) . '</p>
<p><strong>Identificación:</strong> ' . htmlspecialchars($data['identificacion']) . '</p>
';

$pdf->writeHTML($html, true, false, true, false, '');

$pdf->Output("Plan_Mantenimiento_" . htmlspecialchars($data['titulo']) . ".pdf", 'I');
?>