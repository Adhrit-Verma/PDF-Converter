// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true, // For simple projects; consider preload scripts for production
      contextIsolation: false
    }
  });
  
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Handle file open dialogs (multiple file selection)
ipcMain.handle('open-file-dialog', async (event, filters) => {
  return await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: filters
  });
});

// Handle folder selection dialogs (for output path)
ipcMain.handle('open-folder-dialog', async () => {
  return await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
