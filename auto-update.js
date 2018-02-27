// == == == == == == == == == == == == == == == == <Update Window> == == == == == == == == == == == == == == == == == ==
const {autoUpdater} = require("electron-updater");
const {app} = require('electron');
const log = require('electron-log'); // ~/Library/Logs/<app name>/log.log

function sendStatusToWindow(text) {
    console.log('AUTOUPDATER: ', text)
    log.info(text);
}
autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded:', info);
});
app.on('ready', function()  {
    sendStatusToWindow('checkForUpdates()');
    autoUpdater.checkForUpdates();
});

{/*== == == == == == == == == == == == == == == == </Update Window> == == == == == == == == == == == == == == == == == ==*/}