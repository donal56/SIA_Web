<?php
class moUsuario
{
	public function matchAccount($email, $pass)
	{
		$connection = new Connection();
	
		$str = <<<LABEL
				SELECT idCliente FROM clientes WHERE email= '$email' AND contrasena= AES_ENCRYPT('$pass', 'sia2019');				
LABEL;
			$query = $connection->getStatement($str);

			if($query -> num_rows === 0)
			{
				$_SESSION['loggedin'] = false;
			}
			else
			{
				$_SESSION['loggedin'] = true;
				$_SESSION['username'] = $email;
			}

			$query -> free();
		return $_SESSION['loggedin']; 
	}
	
	public function resetPassword($correo)
	{
		$connection = new Connection();
	
		$str = "UPDATE usuarios SET contrasena= AES_ENCRYPT('" . randomString(15) . "', 'sia2019') WHERE email= '" . $email. "';";				

		return 0; 	
	}
	
	public function exitSession()
	{
		$_SESSION['loggedin'] = false;
		$_SESSION['username'] = null;
		
		return true;
	}
	
	public function randomString($len)
	{
		$randomString = null;
		
		if($len < 8)
		{	
			$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$size = strlen($characters);
			
			for ($i = 0; $i < $len; $i++) 
			{
				$randomString .= $characters[rand(0, $len - 1)];
			}
		}
		return preg_match('/\ba-zA-Z0-9\b/', $randomString);
	}
	
	public function registerAccount($email,$pass)
	{
		$connection = new Connection();

		$str = <<<LABEL
				INSERT INTO clientes (contrasena, email) 
				VALUES (AES_ENCRYPT('$pass', 'sia2019'),'$email')		
LABEL;
		return $connection->getStatement($str);
			
		
	}	
	
}
?>