const fs = require('fs');
const path = require('path');
const os = require('os');  // Import os module to resolve home directory

function handleListFiles(ipcMain) {
	const devDirPath = path.join(os.homedir(), 'dev');  // Resolve to ~/dev

	ipcMain.on('list-files', (event) => {
		fs.readdir(devDirPath, (err, files) => {
			if (err) {
				event.reply('list-files-result', `Error reading directory: ${err.message}`);
				return;
			}

			// Send back the list of files/directories
			event.reply('list-files-result', files.length > 0 ? files.join('\n') : 'No files found.');
		});
	});
}

module.exports = { handleListFiles };
