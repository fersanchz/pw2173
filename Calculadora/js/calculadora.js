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