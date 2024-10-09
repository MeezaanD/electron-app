const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { handleDiskSpace } = require('./components/diskSpace');
const { handleListFiles } = require('./components/listFiles');  // Import the new component

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	win.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	handleDiskSpace(ipcMain);  // Register disk space event
	handleListFiles(ipcMain);  // Register list files event
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
