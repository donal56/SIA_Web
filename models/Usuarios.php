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
	
	public function exitSession()
	{
		$_SESSION['loggedin'] = false;
		$_SESSION['username'] = null;
		
		return true;
	}
}
?>