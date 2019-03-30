<?php
$time = microtime(true);

$conexion = mysqli_connect('ricky.heliohost.org', 'sia2019', 'intellideskSIA') or die('Error: ' . mysql_error());
echo 'Conexion exitosa';
mysqli_select_db($conexion, "sia2019_db") or die('No se pudo seleccionar la base de datos');

$con_time = microtime(true);

$query = 'SELECT * FROM Avion';
$resultado = mysqli_query($conexion, $query) or die('Consulta fallida: ' . mysqli_error($conexion));

$sel_time = microtime(true);

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

printf("Connect time: %f\nQuery time: %f\n",
       $con_time-$time,
       $sel_time-$con_time);
?>
