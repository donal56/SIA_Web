<?php

$conexion = mysqli_connect('db4free.net', 'intellidesk', 'aeroalpesSIA') or die('Error: ' . mysql_error());
echo 'Conexion exitosa';
mysqli_select_db($conexion, "sia_db") or die('No se pudo seleccionar la base de datos');

$query = 'SELECT * FROM Avion';
$resultado = mysqli_query($conexion, $query) or die('Consulta fallida: ' . mysqli_error($conexion));

echo "<table border= '2'\n";
while ($registro = mysqli_fetch_array($resultado, MYSQLI_ASSOC)) 
{
    echo "\t<tr>\n";
    foreach ($registro as $campo) 
	{
        echo "\t\t<td>$campo</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

mysqli_free_result($resultado);
mysqli_close($conexion);
?>
