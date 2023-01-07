const { BrowserWindow, ipcMain } = require('electron');
const downloadFile = require('./downloadFile');
const printer = require('printer');
const appConfig = require('electron-settings');
const mainWindowID = appConfig.get('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;

ipcMain.on('download-file',(event, downloadUrl) => {
    downloadFile(downloadUrl).then(()=>{
        console.log('Download complete')
        mainWindow.webContents.send('download-complete');
    }).catch((err)=>{
        mainWindow.webContents.send('download-error',err);
    });
  });
ipcMain.on('getPrinters',(event)=>{
    let printers =printer.getPrinters();
    console.log(printers[0].name)
    console.log(printer.getPrinterDriverOptions(printers[0].name));
 mainWindow.webContents.send('printers',printers);
})

ipcMain.on('print',(event,details)=>{
    dir = desktopDir+'/printFiles';
     printer.printFile({filename:dir+'/'+details.filename,
     printer:details.printerName,
     docname:details.filename,
     options:{},
     success:()=>{console.log('printing')
            mainWindow.webContents.send('status','printing');
    },
     error: (err)=>{console.log('ERROR: '+err)
     mainWindow.webContents.send('error','printing');
    }
    })
})