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
let PantallaAlumnos;
var usuario=require('electron').remote.getGlobal('infoUsuarios').usuario;
var usuariovalida=require('electron').remote.getGlobal('infoUsuarios').usuariovalida;
var periodoactual=require('electron').remote.getGlobal('infoUsuarios').periodoactual;
var materia="";
var grupo="";

function datos(clavemateria,grupo,usuario,materia,horalunes,horamartes,horamiercoles,horajueves,horaviernes)
{
	this.clavemateria    = clavemateria;
	this.grupo    = grupo;
	this.usuario      = usuario;
	this.materia = materia;
	this.horalunes = horalunes;
	this.horamartes = horamartes;
	this.horamiercoles = horamiercoles;
	this.horajueves = horajueves;
	this.horaviernes = horaviernes;
}

var grupos;
function inicia()
{
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario='+usuario+'&usuariovalida='+usuariovalida+'&periodoactual='+periodoactual,
	  dataType: 'json',
	  success: function(data) {
	  	var clavemateria = "";
	  	var grupo = "";
	  	var usuario = "";
	  	var materia = "";
	  	var horalunes = "";
	  	var horamartes = "";
	  	var horamiercoles = "";
	  	var horajueves = "";
	  	var horaviernes = "";
	  	var nGrupos=data.grupos[0].cantidad;
	  	grupos = new Array(nGrupos);
	  	for(var i=1;i<=nGrupos;i++)
	  	{
		  	 clavemateria = data.grupos[i].clavemateria;
		  	 grupo = data.grupos[i].grupo;
		  	 usuario = data.grupos[i].usuario;
		  	 materia = data.grupos[i].materia;
		  	 horalunes = data.grupos[i].horalunes;
		  	 horamartes = data.grupos[i].horamartes;
		  	 horamiercoles = data.grupos[i].horamiercoles;
		  	 horajueves = data.grupos[i].horajueves;
		  	 horaviernes = data.grupos[i].horaviernes;
		  	 var nGrupo=i-1;
	  		resultado="<li>"+clavemateria+" - "+materia+", GRUPO: "+grupo+"<button id='"+nGrupo+"'>Lista</button></li>";
	  		$("#lstGrupos").append(resultado);
	  		grupos[nGrupo] = new datos(clavemateria,grupo,usuario,materia,horalunes,horamartes,horamiercoles,horajueves,horaviernes);
	  	}	  	
	  }
	});
}

function botonLista(){
	require('electron').remote.getGlobal('infoUsuarios').usuario=usuario;
	require('electron').remote.getGlobal('infoUsuarios').usuariovalida=usuariovalida;
	require('electron').remote.getGlobal('infoUsuarios').periodoactual=periodoactual;
	require('electron').remote.getGlobal('infoUsuarios').materia=grupos[this.id].clavemateria;
	require('electron').remote.getGlobal('infoUsuarios').grupo=grupos[this.id].grupo;
	PantallaAlumnos = new BrowserWindow({width:720,height:425});
	PantallaAlumnos.loadURL(url.format({
		pathname: path.join(__dirname,'listaalumnos.html'),
		protocol: 'file',
		slashes: true
	}))
	// PantallaAlumnos.webContents.openDevTools();
	PantallaAlumnos.show();
}

$("body").on("click","li > button",botonLista);
inicia();