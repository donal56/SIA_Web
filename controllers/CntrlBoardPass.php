<?php
require_once('../tcpdf/tcpdf.php');
//barcodes
$id= $info[0]['idBoleto'];
require_once("../controllers/CntrlBarcode.php");
// create new PDF document
$pdf = new TCPDF("L", "px",'A4', true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Aeroalpes');
$pdf->SetTitle('Board Pass');
$pdf->SetSubject('Alpes Group');
$pdf->SetKeywords('Aeroalpes, PDF, SIA, pass, board');

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

//uso de celdas por capas, las capas superiores se sobrepondran a las inferiores,
//tener en cuenta el orden de dibujado y la trasparencia
//pagina muy buena explica los metodos---https://www.rubydoc.info/gems/rfpdf/1.17.1/TCPDF
//-------------------------------------metodos----------------------------------
// MultiCell($w, $h, $txt, $border=0, $align='J', $fill=0, $ln=1, $x='', $y='',
//$reseth=true, $stretch=0, $ishtml=false, $autopadding=true, $maxh=0) tiene mas paremtros

// writeHTMLCell($w, $h, $x, $y, $html='', $border=0, $ln=0, $fill=0,
//$reseth=true, $align='', $autopadding=true)
//Nota: usa doble comillas!!! , tcpdf no detecta las simples en strings compuestos

// ---------------------------------------------------------------------------------------------
// add a page
$pdf->AddPage();
//template img
//$pdf->SetAlpha(1); //los borders no aparecen despues de una imagen ,esto transparenta todo incluyedo la imagen

$pdf->Image("../views/img/boardPassTemplate.jpg", 60, 60, 638.5, 239);
//barImgVertical
$pdf->Image($vfile, 410, 127.5, 65, 140);
//barImgHorizontal
$pdf->Image($hfile, 591.25, 240, 90, 40);


// ----------------------------information-----------------------------
$pdf->setCellPaddings(5, 0, 0, 0);

$pdf->SetFont('courier', 'I', 11);

$pdf->MultiCell(315,30, $info[0]['pasajero'], 0, 'L', 0, 0, 85, 120, true,1,false,false,30,'M');
$pdf->MultiCell(155,30, $info[0]['origen'], 0, 'L', 0, 0, 85, 180, true,1,false,false,30,'M');
$pdf->MultiCell(155,30, $info[0]['destino'], 0, 'L', 0, 0, 246, 180, true,1,false,false,30,'M');
$pdf->MultiCell(75,30, $info[0]['fecha'], 0, 'L', 0, 0, 85, 247, true,1,false,false,30,'M');
$pdf->MultiCell(75,30, $info[0]['horaSalida'], 0, 'L', 0, 0, 165,247, true,1,false,false,30,'M');
$pdf->MultiCell(65,30, $info[0]['idVuelo'], 0, 'L', 0, 0, 252, 247, true,1,false,false,30,'M');
$pdf->MultiCell(65,30, $info[0]['noAsiento'], 0, 'L', 0, 0, 325, 247, true,1,false,false,30,'M');

$pdf->SetFont('courier', 'I', 8);

$pdf->MultiCell(175,20, $info[0]['pasajero'], 0, 'L', 0, 0, 500, 84, true,1,false,false,20,'M');
$pdf->MultiCell(80,20, $info[0]['origen'], 0, 'C', 0, 0, 500, 127, true,1,false,false,20,'M');
$pdf->MultiCell(80,20, $info[0]['destino'], 0, 'C', 0, 0, 588, 127, true,1,false,false,20,'M');
$pdf->MultiCell(80,20, $info[0]['fecha'], 0, 'C', 0, 0, 500, 167, true,1,false,false,20,'M');
$pdf->MultiCell(80,20, $info[0]['horaSalida'], 0, 'C', 0, 0, 588, 167, true,1,false,false,20,'M');
$pdf->MultiCell(80,20, $info[0]['idVuelo'], 0, 'C', 0, 0, 500, 207, true,1,false,false,20,'M');
$pdf->MultiCell(80,20, $info[0]['noAsiento'], 0, 'C', 0, 0, 588, 207, true,1,false,false,20,'M');

// ----------------------------barcodes ID-----------------------------
$pdf->SetFont('courier', 'B', 6);

$pdf->SetXY(475, 273,true);//from cell
$pdf->StartTransform();
$pdf->Rotate(90);
$pdf->Cell(150,10,$info[0]['idBoleto'],0,0,'C',0,'');
$pdf->StopTransform();

$pdf->MultiCell(100,50, $info[0]['idBoleto'], 0, 'C', 0, 0, 588, 237, true,1,false,false,50,'B');

// move pointer to last page
$pdf->lastPage();

// ---------------------------------------------------------
//Close and output PDF document
$pdf->Output($_SERVER['DOCUMENT_ROOT'].'/tcpdf/pdf/'.$_REQUEST["numBoleto"].'.pdf', 'F');

?>