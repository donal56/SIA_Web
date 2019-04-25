<?php
class Connection
{
	private $connect;
	public function getConnect()
	{
		$this -> connect = new mysqli("64.62.211.134",
							  "sia2019",
							  "intellideskSIA", 
							  "sia2019_db");
	}
	
	public function getStatement($que)
	{
		$this->getConnect(); 
		$this->connect -> query("SET NAMES utf8");   
		$result = $this->connect -> query($que);
		$this -> connect ->close();
	
		return $result;
	}		
}
?>