<?php
	function conectaBD(){
		//servido,usuario,contraseña,bd
		$conexion=mysqli_connect("localhost","root","","pw2173");
		return $conexion;
	}
?>