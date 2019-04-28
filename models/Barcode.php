<?php
if($_GET){
	// Include the main TCPDF library (search for installation path).
	require_once('../tcpdf/tcpdf.php');
	require_once('../tcpdf/tcpdf_barcodes_1d.php');

	$barcodeobj = new TCPDFBarcode($_GET["id"], 'C128');

	// output the barcode as PNG image
	$barcodeobj->getBarcodePNG(3, 60, array(0,0,0));

}

?>