// constantes
//const app=require('electron').app; //acceso a la app
//const BrowserWindow=require('electron').BrowserWindow; //acceso al sistema de pantallas de cualquier sistema operativo
const {app,BrowserWindow}=require('electron');  // es la misma instruccion de arriba pero en una
const path=require('path'); //optiene la ruta del archivo
const url=require('url'); //optiene la pagina

//Constantes para PDF
const electron=require('electron');
const fs=require('fs');//sistema de archivos de la computadora
//acceso al sistema operativo
const os=require('os');
//Para declarar una funcion remota
const ipc=electron.ipcMain;
//Acceso a la terminal-linea de comandos
const shell=electron.shell;

//ECMASCRIPT = 6
let PantallaPrincipal; //let es una constante que tendra el valor mas adelante, pero cuando lo tenga ya no se podra cambiar

//Objeto global para compartir datos entre pantallas
global.infoUsuarios={
	nombre: '',
	genero: '',
	foto: '',
	direccion: '',
	telefono: ''
}

function muestraPantallaPrincipal(){
	PantallaPrincipal =new BrowserWindow({width:320,height:475}); //los parametros multiples llevan llaves

	PantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'), // join concatena cadenas
		protocol: 'file', // tipo de archivo
		slashes: true //si lleva las diagonales normales
	}))//cargar una pagina en la pantalla
	//PantallaPrincipal.webContents.openDevTools(); // habilita la opcion de depuracion del navegador
	PantallaPrincipal.show(); //muestra la pantalla
}

//evento para PDF (declaracion)
ipc.on('print-to-pdf',function(event){
	const pdfPath=path.join(os.tmpdir(),'print.pdf')  //a la ruta la une con una carpeta temporal y el nombre del archivo
	const win=BrowserWindow.fromWebContents(event.sender) //obtenemos el contenido de la ventana
	win.webContents.printToPDF({},function(error,data){
		if(error) throw error
		fs.writeFile(pdfPath,data,function(error){
			if(error){ //cuando el error es mayor que cero
				throw error // detiene el programa
			}
			shell.openExternal('file://'+pdfPath)
			win.close() //cierra la ventana
		})  //escribimos en el sistema de archivos el PDF
	})
});

app.on('ready',muestraPantallaPrincipal) //encender la aplicacion, y cuando este listo usa la funcion muestraPantallaPrincipal

