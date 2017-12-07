var iniciaMenu = function(){
	var alta=function(){
		$("#alta").show("slow"); //muestra los textos, para retrasar la aparicion de los textos se usa slow
	}
	var altaAlumno=function(){
		var ncontro=$("#txtNcontrol").val();
		var nombre=$("#txtNombre").val();
		var carrera=$("#txtCarrera").val();
		var clave=$("#txtClave").val();
		var parametros="opc=altaalumno"+
						"&ncontrol="+ncontrol+
						"&nombre="+nombre+
						"&carrera="+carrera+
						"&clave="+clave+
						"&id="+Math.random(); //id para eliminar el cache
		$.ajax({
			url: "php/altaalumno.php",
			datatype: 'json', //retorno
			type: "POST", //lo que enviamos
			data: parametros,
			success: function(data){
				if(data.respuesta==true){ //es igual a poner data.respuesta==true
					alert("Alumno de alta");
				}else{
					alert("No se puede dar de alta");
				}
			},
			error: function(a,b,c){
				alert("No se pudo conectar al server");
			}

		});
	}
	var teclaNcontrol=function(tecla){
		if(tecla.which==13){ // 13 = enter
			var ncontrol=$("#txtNControl")-val();
			var parametro="opc=buscaNcontrol"+
							"&ncontrol="+ncontrol+
							"&id="+Math.random();
			$.ajax({
				url: "php/buscancontrol.php",
				datatype: 'json', //retorno
				type: "POST", //lo que enviamos
				data: parametros,
				success: function(data){
					if(data.respuesta==true){ //es igual a poner data.respuesta==true
						$("#txtNombre").val(data.nombre);
						$("#txtCarrera").val(data.carrera);
						$("#txtClave").val(data.clave);
					}else{
						$("#txtNombre").focus();
					}
				},
				error: function(a,b,c){
					alert("No se pudo conectar al server");
				}

			});
		}
	}
	$("#txtNControl").on("keypress",teclaNcontrol);
	$("#btnAlta").on("click",alta);
	$("#btnAltaAlumno").on("click",altaAlumno);
}

$(document).ready(iniciaMenu);