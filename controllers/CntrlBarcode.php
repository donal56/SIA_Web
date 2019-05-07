<?php	
	$vfile = "../views/img/barcodes/".$id."v.jpg"; 
	$hfile = "../views/img/barcodes/".$id."h.jpg";

	$bar = imagecreatefromstring(file_get_contents('http://'.$_SERVER['HTTP_HOST'].'/models/Barcode.php?id='.$id));//read the created file from stream
	if(imagejpeg($bar,$hfile)){ //write it
		//rotate barcode
		$rotate = imagerotate(imagecreatefromjpeg($hfile), 90, 0);
		imagejpeg($rotate,$vfile);
			
		imagedestroy($bar);
		imagedestroy($rotate);
	}else{
		echo '<span class= "trn">error</span>';
	}

?>