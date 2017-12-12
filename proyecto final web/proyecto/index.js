
const {BrowserWindow}=require('electron').remote
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');

function datos(nombre,genero,foto,direccion,telefono)
{
	this.nombre    = nombre;
	this.genero    = genero;
	this.foto      = foto;
	this.direccion = direccion;
	this.telefono  = telefono;
}

var usuario = "";
var clave   = "";
var usuariovalida="";
var periodoactual="";
function entrar()
{
	usuario = $("#txtUsuario").val();
	clave   = $("#txtClave").val();
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario='+usuario+'&clave='+clave,
	  dataType: 'json',
	  success: function(data) {
	  	if(data.respuesta == true){
	 		alert("Bienvenido!");
	 		require('electron').remote.getGlobal('infoUsuarios').usuario=usuario;
	 		require('electron').remote.getGlobal('infoUsuarios').usuariovalida=data.usuariovalida;
	 		require('electron').remote.getGlobal('infoUsuarios').periodoactual=data.periodoactual;
	 		$("main").load("grupos.html");
	 	}else{
	 		alert("Usuario y/o clave incorrectos");
	 	}	  	
	  }
	});
}

function botonEntrar(){
	entrar();
}

$("#btnEntrar").on("click",botonEntrar);