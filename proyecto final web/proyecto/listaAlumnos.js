const {BrowserWindow}=require('electron').remote
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');
//Constantes para llamar al PDF
const ipc=require('electron').ipcRenderer
const botonPDF=document.getElementById('btnPDF')
//Activamos el evento click del botón btnPDF
botonPDF.addEventListener('click',function(event){
	botonPDF.style.display="none"
	ipc.send('print-to-pdf')
})
var usuario=require('electron').remote.getGlobal('infoUsuarios').usuario;
var usuariovalida=require('electron').remote.getGlobal('infoUsuarios').usuariovalida;
var periodoactual=require('electron').remote.getGlobal('infoUsuarios').periodoactual;
var materia=require('electron').remote.getGlobal('infoUsuarios').materia;
var grupo=require('electron').remote.getGlobal('infoUsuarios').grupo;

function datos(ncontrol,apellidopaterno,apellidomaterno,nombre)
{
	this.ncontrol    = ncontrol;
	this.apellidopaterno    = apellidopaterno;
	this.apellidomaterno      = apellidomaterno;
	this.nombre = nombre;
}

var alumnos;
function inicia()
{
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario='+usuario+'&usuariovalida='+usuariovalida+'&periodoactual='+periodoactual+'&materia='+materia+'&grupo='+grupo,
	  dataType: 'json',
	  success: function(data) {
	  	var ncontrol = "";
	  	var apellidopaterno = "";
	  	var apellidomaterno = "";
	  	var nombre = "";
	  	var nAlumnos=data.alumnos[0].cantidad;
	  	alumnos = new Array(nAlumnos);
	  	for(var i=1;i<=nAlumnos;i++)
	  	{
		  	 ncontrol = data.alumnos[i].ncontrol;
		  	 apellidopaterno = data.alumnos[i].apellidopaterno;
		  	 apellidomaterno = data.alumnos[i].apellidomaterno;
		  	 nombre = data.alumnos[i].nombre;
		  	 var nAlumno=i-1;
	  		resultado="<li>"+ncontrol+" - "+apellidopaterno+" "+apellidomaterno+" "+nombre+"<button id='A"+nAlumno+"'>Asistencia</button><button id='F"+nAlumno+"'>Falta</button></li>";
	  		$("#lstListaAlumnos").append(resultado);
	  		alumnos[nAlumno] = new datos(ncontrol,apellidopaterno,apellidomaterno,nombre);
	  	}	  	
	  }
	});
}

function botonAsistencia(){
	var id=this.id;
	var nId=id.substring(1);
	var tipoAsistencia=id.substring(0,1);
	var incidencia="";
	if(tipoAsistencia=="F"){
		incidencia=2;
	}else if(tipoAsistencia=="A"){
		incidencia=1;
	}
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/asignaincidencia.php?usuario='+usuario+'&usuariovalida='+usuariovalida+'&periodoactual='+periodoactual+'&materia='+materia+'&grupo='+grupo+'&ncontrol='+alumnos[nId].ncontrol+'&incidencia='+incidencia,
	  dataType: 'json',
	  success: function(data) {
	  	if(data.respuesta == true){
	  		if(tipoAsistencia=="F"){
				alert("El alumno "+alumnos[nId].apellidopaterno+" "+alumnos[nId].apellidomaterno+" "+alumnos[nId].nombre+" tiene falta!");
			}else if(tipoAsistencia=="A"){
				alert("El alumno "+alumnos[nId].apellidopaterno+" "+alumnos[nId].apellidomaterno+" "+alumnos[nId].nombre+" tiene asistencia!");
			}
	 	}else{
	 		alert("No se encontro al usuario");
	 	}	  	
	  }
	});
}

$("body").on("click","li > button",botonAsistencia);
inicia();