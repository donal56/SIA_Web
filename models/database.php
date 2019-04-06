<?php
class  Connection{
	private $connect;
	public function getConnect(){
		$this -> connect = new mysqli("64.62.211.134",
							  "sia2019",
							  "intellideskSIA", 
							  "sia2019_db");
	}
	
	public function getStatement($query){
		$this->getConnect(); 
		$stm = $this->connect -> query($query);
		$this-> connect -> close();
	
		return $stm;
	
	}
		
}



?>