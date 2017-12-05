<?php
	include 'conexion.php'; // para poder usar las funciones de conexion.php(es para inclir todo el contenido del archivo), tambien es usando el require(es para usarlo cada vez que se usa)
	function validaEntrada(){
		$conexion=conectaBD();
		$respuesta=false;
		//estos vienen del archivo js
		$usuario=$_POST["usuario"];
		$clave=md5($_POST["clave"]); //convierte la clave en md5 para compararla con la clave de la bd que esta en md5
		$consulta="select ncontrol,nombre,clave from alumnos where ncontrol='".$usuario."' and clave='".$clave."' limit 1"; // en php se concatena con punto, limit es para que el select se detenga al encontrar 1
		//recordset = conjunto de registros
		$resConsulta=mysqli_query($conexion,$consulta); //devuelve los resultados de la consulta
		$nombre="";
		//cuantos registros trae el recordset
		if(mysqli_num_rows($resConsulta)>0){
			$respuesta=true;
			//en lugar de if podria se run while, pero como es solo un registro se uso el if
			if($registro=mysqli_fetch_array($resConsulta)){ //toma el primer regristro y lo convierte en un arreglo, para guardarlo en regristro
				//si entra aqui es porque si se obtuvo un registro en la variable registro
				$nombre= $registro["nombre"];
			}
        }
        $salida = array('respuesta' => $respuesta,
        				'Nombre' => $nombre); //es un array asociativo (utiliza como indice un nombre), regresa respuesta y nombre
        print json_decode($salida); // regresa el valor por json
	}
	$opc=$_POST["opc"];
	switch ($opc) {
		case 'valida':
			validaEntrada();
			break;
		
		default:
			# code...
			break;
	}
?>