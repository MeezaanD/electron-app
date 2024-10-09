const { exec } = require('child_process');

function handleDiskSpace(ipcMain) {
	ipcMain.on('check-disk-space', (event) => {
		exec('df -h --output=avail / | tail -n 1', (error, stdout, stderr) => {
			if (error) {
				event.reply('disk-space-result', 'Error checking disk space.');
				return;
			}
			event.reply('disk-space-result', `Remaining space: ${stdout.trim()}`);
		});
	});
}

module.exports = { handleDiskSpace };
