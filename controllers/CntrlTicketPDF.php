<?php
$brd=0;
require_once('../tcpdf/tcpdf.php');

// create new PDF document
$pdf = new TCPDF("P", "mm",'A4', true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Aeroalpes');
$pdf->SetTitle('Ticket');
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
$pdf->SetAutoPageBreak(false, 0);

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

//7$pdf->SetAlpha(.3); //los borders no aparecen despues de una imagen ,esto transparenta todo incluyedo la imagen

$pdf->Image("../views/img/ticketP1.png", 0, 0,210);

// ----------------------------pax-----------------------------

$pdf->SetFont('courier', 'B', 12);

$pdf->MultiCell(170,"", $idVuelo, $brd, 'L', 0, 0, 30, 62);
$pdf->MultiCell(170,"", $modal, $brd, 'L', 0, 0, 30, 69);

$pdf->MultiCell(5,"", $cantAdult, $brd, 'L', 0, 0, 72, 95);
$pdf->MultiCell(5,"", $cantKid, $brd, 'L', 0, 0, 72, 100);
$pdf->MultiCell(5,"", $cantBaby, $brd, 'L', 0, 0, 72, 105);

$pdf->MultiCell(20,"", $_SESSION['priceA'], $brd, 'L', 0, 0, 112, 95);
$pdf->MultiCell(20,"", $_SESSION['priceK'], $brd, 'L', 0, 0, 112, 100);
$pdf->MultiCell(20,"", $_SESSION['priceB'], $brd, 'L', 0, 0, 112, 105);

$pdf->MultiCell(20,"", $_SESSION['totalPrice'], $brd, 'L', 0, 0, 180, 110);

$pdf->MultiCell(20,"", $_SESSION['totalPrice'], $brd, 'L', 0, 0, 180, 153);

// ----------------------------details-----------------------------

$pdf->MultiCell(50,"", $info[0]['origen'], $brd, 'L', 0, 0, 55,190);
$pdf->MultiCell(50,"", $info[0]['destino'], $brd, 'L', 0, 0, 55,196);
$pdf->MultiCell(50,"", $info[0]['fecha'], $brd, 'L', 0, 0, 55,202);
$pdf->MultiCell(50,"", $info[0]['horaSalida'], $brd, 'L', 0, 0, 55,208);
$pdf->MultiCell(50,"", $info[0]['horaLlegada'], $brd, 'L', 0, 0, 55,214);
$pdf->MultiCell(50,"", $info[0]['modelo'], $brd, 'L', 0, 0, 55,220);

unset($info);
//---------------------------------------------new page-------------------------------------------------
//------------------------------------------------------------------------------------------------------

$pdf->AddPage();

//$pdf->SetAlpha(.3);
$pdf->Image("../views/img/ticketP2.png", 0, 0,210);

// ----------------------------pax-----------------------------
$pdf->MultiCell(130,"", $tname, $brd, 'L', 0, 0, 70, 22);
$pdf->MultiCell(130,"", $tlast, $brd, 'L', 0, 0, 70, 28);
$pdf->MultiCell(110,"", $tnac, $brd, 'L', 0, 0, 90, 34);
$pdf->MultiCell(130,"", $_POST['tel'], $brd, 'L', 0, 0, 70, 40);


// ----------------------------adult-----------------------------
$pdf->SetXY(PDF_MARGIN_LEFT,55);
foreach ($arrAdul as $adult) {
	$diff = abs(strtotime(date('Y-m-d')) - strtotime($adult[2]));
	$years = floor($diff / (365*60*60*24));
	$infoPax = $adult[0]." |Asiento:".$adult[1]." |Edad:".$years." |BOLETO:".$adult[3];
	$pdf->Cell(150, 0, $infoPax, $brd,1);
}
unset($arrAdul); 
// ----------------------------kid-----------------------------
$pdf->SetXY(PDF_MARGIN_LEFT,102);
foreach ($arrKid as $kid) {
	$diff = abs(strtotime(date('Y-m-d')) - strtotime($kid[2]));
	$years = floor($diff / (365*60*60*24));
	$infoPax = $kid[0]." |Asiento: ".$kid[1]." |Edad: ".$years." |BOLETO: ".$kid[3];
	$pdf->Cell(150, 0, $infoPax, $brd,1);
}
unset($arrKid); 
// ----------------------------baby-----------------------------
$pdf->SetXY(PDF_MARGIN_LEFT,126);
foreach ($arrBaby as $baby) {
	$diff = abs(strtotime(date('Y-m-d')) - strtotime($baby[2]));
	$years = floor($diff / (365*60*60*24));
	$infoPax = $baby[0]."|Asiento: ".$baby[1]." |Edad: ".$years." |BOLETO:".$baby[3];
	$pdf->Cell(150, 0, $infoPax, $brd,1);
}
unset($arrBaby); 
// ----------------------------pay-----------------------------
$pdf->MultiCell(130,"", $_POST["tipoCC"], $brd, 'L', 0, 0, 70, 156);
$pdf->MultiCell(130,"", $_POST["CC"], $brd, 'L', 0, 0, 70, 162);
$pdf->MultiCell(130,"", $_POST["payDate"], $brd, 'L', 0, 0, 70, 168);


// move pointer to last page
$pdf->lastPage();

// ---------------------------------------------------------
//Close and output PDF document
$pdf->Output($_SERVER['DOCUMENT_ROOT'].'/tcpdf/pdf/ticket/'.$_SESSION['idTitular'].'.pdf', 'F');

?>