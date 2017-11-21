const {BrowserWindow}=require('electron').remote
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery'); // $ significa jquery


//arreglo para guardar los datos de los usuarios
var usuarios=new Array(20);

//funcion para guardar como objetos(pero es una funcion, no una clase)
function datos(nombre,genero,foto,direccion,telefono){
	this.nombre		=	nombre;
	this.genero		=	genero;
	this.foto		=	foto;
	this.direccion	=	direccion;
	this.telefono	=	telefono;
}

function inicia(){
	$.ajax({
			  url: 'https://randomuser.me/api/?results=20',
			  dataType: 'json',
			  success: function(data) {
			  	var resultado="";
			  	var nombre="";
			  	var foto="";
			  	var direccion="";
			  	var genero="";
			  	var telefono="";
				for(var i=0;i<20;i++){
			  		nombre=data.results[i].name.title+". "+data.results[i].name.first+" "+data.results[i].name.last;
			  	 	genero=data.results[i].gender;
			  		foto=data.results[i].picture.medium;
			  	 	direccion=data.results[i].location.street;
			  	 	telefono=data.results[i].phone;
			  		resultado="<li><img src="+foto+">"+nombre+"<button id='"+i+"'>Detalle</button></li>";
			  		$("#lstUsuarios").append(resultado);
			  		usuarios[i]=new datos(nombre,genero,foto,direccion,telefono); // se crea un objeto de cada usuario para guardarlo en el arreglo usuarios
				 }
			  }
		});
}
funtion botonDetalle{
	alert(usuarios[this.id].nombre);
	alert(usuarios[this.id].genero);
	alert(usuarios[this.id].foto);
}

$("body").on("click","li>button",botonDetalle); // li>button activa todos los elementos button dentro del li (nota:esto es para usar elementos en tiempo de ejecucion)
//nota: no se puede asignar eventos a elementos creados en tiempo de ejecucion de la siguiente forma
//$("#0").on("click",botonDetalle); nota; no funcioona asi
inicia();