<?php
require_once('../tcpdf/tcpdf.php');
//barcodes
$id= $info[0]['idBoleto'];
require_once("../controllers/CntrlBarcode.php");
// create new PDF document
$pdf = new TCPDF("L", "px",'A3', true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Aeroalpes');
$pdf->SetTitle('Pase de abordar');
$pdf->SetSubject('Grupo alpes');
$pdf->SetKeywords('Aeroalpes, PDF, sia, pass, board');

// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(1);

// ---------------------------------------------------------

// add a page
$pdf->AddPage();

//uso de celdas por capas, las capas superiores se sobrepondran a las inferiores,
//tener en cuenta el orden de dibujado y la trasparencia
//pagina muy buena explica los metodos---https://www.rubydoc.info/gems/rfpdf/1.17.1/TCPDF
//-------------------------------------metodos----------------------------------
// MultiCell($w, $h, $txt, $border=0, $align='J', $fill=0, $ln=1, $x='', $y='',
//$reseth=true, $stretch=0, $ishtml=false, $autopadding=true, $maxh=0) tiene mas paremtros

// writeHTMLCell($w, $h, $x, $y, $html='', $border=0, $ln=0, $fill=0,
//$reseth=true, $align='', $autopadding=true)
//Nota: usa doble comillas!!! , tcpdf no detecta las simples en strings compuestos


// ---------------------------------------------------------
//headerCell
// set font
$pdf->SetFont('helvetica', 'B', 22);
$pdf->SetFillColor(143, 205, 255);
$txt = 'Pase para abordar';
$pdf->MultiCell(602, 48, $txt, 0, 'C', 1, 0, 10, 10, true, 0, false, true, 40, 'M');

// ---------------------------------------------------------
//headerCell2
$pdf->SetFont('times', '', 18);
$pdf->SetFillColor(143, 205, 255);
$txt = 'Disfrute su vuelo';
$pdf->MultiCell(276, 48, $txt, 0, 'C', 1, 0, 612, 10, false,0,true);

// ---------------------------------------------------------
//footerCell
$pdf->SetFillColor(143, 205, 255);
$txt = '';
$pdf->MultiCell(878, 26, $txt, 0, 'J', 1, 0, 10, 351, false,0,false,false,26);

// ---------------------------------------------------------
//mainCell
$txt = '';
$pdf->MultiCell(878, 367, $txt, 1, 'J', 0, 0, 10, 10, false,0,true);

// ---------------------------------------------------------
//mainCell2
//lineas punteadas
$pdf->SetLineStyle(array('width' => 1, 'cap' => 'butt', 'join' => 'miter', 'dash' => 7, 'color' => array(0, 0, 0)));
$txt = '';
$pdf->MultiCell(276, 367, $txt, "L", 'J', 0, 0, 612, 10, false,0,true);

// ---------------------------------------------------------
//imgicon
$txt = '<img src="../views/img/logo1.png" style="width: 120px" alt="" />';
$pdf->MultiCell(120,46, $txt, 0, 'J', 0, 1, 10, 11, false,0,true);

//barImgHorizontal
$pdf->Image($hfile, 460, 270, 120, 60);

//barImgVertical
$pdf->Image($vfile, 820, 260, 50, 80);

// ----------------------------information-----------------------------
$pdf->SetLineStyle(array('width' => .1, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(228, 243, 255)));
$pdf->SetFont('courier', '', 12);
$pdf->setCellPaddings(0, 0, 0, 0);

$txt = "Nombre del pasajero\n".$info[0]['pasajero'];
$pdf->MultiCell(140,40, $txt, 1, 'L', 0, 0, 30, 90, true);
$pdf->MultiCell(140,40, $txt, 1, 'L', 0, 0, 632, 90, true);

$txt = "Origen\n".$info[0]['origen'];
$pdf->MultiCell(130,40, $txt, 1, 'L', 0, 0, 30, 150, true);
$pdf->MultiCell(110,40, $txt, 1, 'L', 0, 0, 632, 150, true);

$txt = "Destino\n".$info[0]['destino'];
$pdf->MultiCell(130,40, $txt, 1, 'L', 0, 0, 30, 210, true);
$pdf->MultiCell(110,40, $txt, 1, 'L', 0, 0, 760, 150, true);

$txt = "Clase\n".$info[0]['clase'];
$pdf->MultiCell(130,40, $txt, 1, 'L', 0, 0, 30, 270, true);
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 632, 260, true);

// ----------------------------information-----------------------------

$txt = "Boleto\n".$info[0]['idBoleto'];
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 220, 90, true);
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 780, 90, true);

$txt = "Vuelo\n".$info[0]['idVuelo'];
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 220, 150, true);
$pdf->MultiCell(70,40, $txt, 1, 'L', 0, 0, 632, 210, true);

$txt = "Asiento\n".$info[0]['noAsiento'];
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 220, 270, true);
$pdf->MultiCell(70,40, $txt, 1, 'L', 0, 0, 712, 260, true);

// ----------------------------information-----------------------------

$txt = "Fecha\n".$info[0]['fecha'];
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 340, 150, true);
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 712, 210, true);

$txt = "Precio\n".$info[0]['precio'];
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 340, 270, true);
$pdf->MultiCell(70,40, $txt, 1, 'L', 0, 0, 632, 310, true);
// ----------------------------information-----------------------------

$txt = "Hora\n".$info[0]['horaSalida'];
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 460, 150, true);
$pdf->MultiCell(80,40, $txt, 1, 'L', 0, 0, 792, 210, true);


// move pointer to last page
$pdf->lastPage();

// ---------------------------------------------------------
//Close and output PDF document
$pdf->Output($_SERVER['DOCUMENT_ROOT'].'/tcpdf/pdf/'.$_GET["numBoleto"].'.pdf', 'I');

?>