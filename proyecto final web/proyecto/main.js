const app=require('electron').app;
const BrowserWindow=require('electron').BrowserWindow;
const path = require('path'); //Muestra la ruta del archivo
const url = require('url'); //Carga una página
//Constantes para PDF
const electron = require('electron');
//Sistema de archivos
const fs = require('fs');
//Acceso al sistema operativo
const os = require('os');
//Para declarar una función remota
const ipc = electron.ipcMain;
//Acceso a la terminal-línea de comandos
const shell = electron.shell;
// ECMASCRIPT = 6
let PantallaPrincipal;
//Objeto global para compartir datos
//entre pantallas 
global.infoUsuarios = {
	usuario: '',
	usuariovalida: '',
	periodoactual: '',
	materia: '',
	grupo: ''
}

function muestraPantallaPrincipal(){
	PantallaPrincipal = new BrowserWindow({width:520,height:425});
	PantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'),
		protocol: 'file',
		slashes: true
	}))
	//PantallaPrincipal.webContents.openDevTools();
	PantallaPrincipal.show();
}
//Evento para PDF (declaración) 
ipc.on('print-to-pdf',function(event){
	const pdfPath=path.join(os.tmpdir(),'print.pdf')
	const win=BrowserWindow.fromWebContents(event.sender)
	win.webContents.printToPDF({},function(error,data){
		if(error) throw error
		fs.writeFile(pdfPath,data,function(error){
			if(error){
				throw error
			}
			shell.openExternal('file://'+pdfPath)
			win.close()
		})
	})
});

app.on('ready',muestraPantallaPrincipal)