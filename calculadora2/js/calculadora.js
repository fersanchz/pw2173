//constantes de electron
const {BrowserWindow}=require('electron').remote //el navegador
const app = require('electron').app //la aplicacion
const path = require('path') //ruta del sistema de archivos
const url=require('url') //ruta de la url
//otra ventana
let ventanaCalculadoraCientifica;

function calculadoraCientifica(){
	ventanaCalculadoraCientifica = new BrowserWindow({width:380,height:380}); // crea la nueva ventana
	ventanaCalculadoraCientifica.loadURL(url.format({ //carga la url
		pathname: path.join(__dirname,'calccientifica.html'),
		protocol: 'file',
		slashes: true
	}))
	ventanaCalculadoraCientifica.webContents.openDevTools(); // habilita la opcion de depuracion del navegador
	ventanaCalculadoraCientifica.show(); // abre la ventana
}

// variable global
var operador="";
function numeros(num){
	if(operador==""){//operando1
		//document engloba todo
		var valorInicial=document.calculadora.operando1.value; 
		if(valorInicial=="0"){
			document.calculadora.operando1.value=""; 
		}
		document.calculadora.operando1.value=document.calculadora.operando1.value+num;//el simbolo de suma concatenara los valores de num con los del operando1
	}else{//operando2
		//document engloba todo
		var valorInicial=document.calculadora.operando2.value; 
		if(valorInicial=="0"){
			document.calculadora.operando2.value=""; 
		}
		document.calculadora.operando2.value=document.calculadora.operando2.value+num;//el simbolo de suma concatenara los valores de num con los del operando1
	}
}
function operadores(ope){
	operador=ope;
}
function igual(){
	var valor1=document.calculadora.operando1.value;
	var valor2=document.calculadora.operando2.value;

// el eval toma un string con una operacion matematica y lo resuelve
	document.calculadora.resultado.value = eval(valor1+operador+valor2);
}

function borrar(){
	operador="";
	document.calculadora.operando1.value=0;
	document.calculadora.operando2.value=0;
	document.calculadora.resultado.value=0;
}