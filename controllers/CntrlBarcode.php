<?php
if($_GET){
	$id = $_GET['id'];
}	
	$vfile = "../views/img/barcodes/".$id."v.jpg"; 
	$hfile = "../views/img/barcodes/".$id."h.jpg";

	$bar = imagecreatefromstring(file_get_contents('http://'.$_SERVER['HTTP_HOST'].'/models/Barcode.php?id='.$id));//read the created file from stream
	if(imagejpeg($bar,$hfile)){ //write it
		//rotate barcode
		$origin = imagecreatefromjpeg($hfile);
		$rotate = imagerotate($origin, 270, 0);
		imagejpeg($rotate,$vfile);
			
		imagedestroy($bar);
		imagedestroy($rotate);
	}else{
		echo 'error';
	}

?>