<?php

	include 'conexion.php';
	include 'utileria.php';
	function guardaAlumno(){
		$ncontrol=GetSQLValueString($_POST["ncontrol"],"text"); //GetSQLValueString limpia la variable para evitar contenido malicioso
		$nombre=GetSQLValueString($_POST["nombre"],"text"); //GetSQLValueString limpia la variable para evitar contenido malicioso
		$carrera=GetSQLValueString($_POST["carrera"],"int"); //GetSQLValueString limpia la variable para evitar contenido malicioso
		$clave=GetSQLValueString($_POST["clave"],"text"); //GetSQLValueString limpia la variable para evitar contenido malicioso
		$conexion=conectaBD();
		
	}
	$opc=$_POST["opc"];
	switch ($opc) {
		case 'altaalumno':
			guardaAlumno();
			break;
		default:
			# code ...
			break;
	}
?>