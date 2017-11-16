// constantes
const app=require('electron').app; //acceso a la app
const BrowserWindow=require('electron').BrowserWindow; //acceso al sistema de pantallas de cualquier sistema operativo
const path=require('path'); //optiene la ruta del archivo
const url=require('url'); //optiene la pagina

//ECMASCRIPT = 6
let PantallaPrincipal; //let es una constante que tendra el valor mas adelante, pero cuando lo tenga ya no se podra cambiar

function muestraPantallaPrincipal(){
	PantallaPrincipal =new BrowserWindow({width:320,height:475}); //los parametros multiples llevan llaves

	PantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'), // join concatena cadenas
		protocol: 'file', // tipo de archivo
		slashes: true //si lleva las diagonales normales
	}))//cargar una pagina en la pantalla
	PantallaPrincipal.webContents.openDevTools(); // habilita la opcion de depuracion del navegador
	PantallaPrincipal.show(); //muestra la pantalla
}

app.on('ready',muestraPantallaPrincipal) //encender la aplicacion, y cuando este listo usa la funcion muestraPantallaPrincipal
