// jquery y el signo de pesos $, significan lo mismo

var inicia= function(){
	var nuevo=function(){
		// JSON = JavaScript Object Notation
		$.ajax({
			  url: 'https://randomuser.me/api/',
			  dataType: 'json',
			  success: function(data) {
			  	//alert(data.results[0].name.first+" "+data.results[0].name.last);
			    //console.log(data);
			    $("#nombre").html("<h1>"+data.results[0].name.title+". "+
			    				  data.results[0].name.first+" "+
			    				  data.results[0].name.last+"<h1>")//.html sirve para incrustar testo o codigo dentro del html. con .append se agrega el texto al final
			    $("#foto").attr("src",data.results[0].picture.large);//con .attr cambias el contenido del atributo
			    $("#direccion").html("Direccion: "+data.results[0].location.city)
			  }
		});
	}
	$("#btnNuevo").on("click",nuevo); // .on es para encender un evento, con .off se apaga el evento
	//alert("Lista la pagina");
}

//iniciamos JQuery cuando la pagina esta lista, ejecuta la funcion inicia
$(document).ready(inicia);