/* jshint node: true */
/*jshint esversion: 6 */
const {app, BrowserWindow, Menu, TouchBar, protocol, ipcMain, dialog} = require('electron');
const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar;
const path = require('path');
const url = require('url');
const {autoUpdater} = require("electron-updater");
const log = require('electron-log'); // ~/Library/Logs/<app name>/log.log
const isDev = require('electron-is-dev');
require('./auto-update.js');

const Store = require('electron-store');
const el_store = new Store();

const awsProfiles = require('get-aws-profiles');

//----------------------------------------------------------------------------------------------------------------------
//          LOLCATJS!
//
const lolcatjs = require('lolcatjs');
lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;
lolcatjs.fromString('I can has Cheezburger?');

//----------------------------------------------------------------------------------------------------------------------
//          Figlet!
//
const figlet = require('figlet');
figlet('LOG - GAGE ! !', (err, data)=>{console.log(data);});

// AWS.config.region = 'us-east-1';
// var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});

// AWS.config.credentials = credentials;
// var lambda = new AWS.Lambda();
// var params = {};

//----------------------------------------------------------------------------------------------------------------------
//          Get AWS profiles list
//
ipcMain.on('getAWSProfiles', (event, arg) => {
    event.returnValue = awsProfiles.get();
});

//----------------------------------------------------------------------------------------------------------------------
//          Get AWS profile Credentials
//
ipcMain.on('getAWSProfile', (event, profileName) => {
    event.returnValue = awsProfiles.getProfile(profileName)
});

//----------------------------------------------------------------------------------------------------------------------
//          IPC
//
// Listen for async message from renderer process
ipcMain.on('async', (event, arg) => {
    // Print 1
    lolcatjs.fromString(arg);
    // Reply on async message from renderer process
    event.sender.send('async-reply', 2);
});

// Listen for sync message from renderer process
ipcMain.on('sync', (event, arg) => {
    // Print 3
    lolcatjs.fromString(arg);
    // Send value synchronously back to renderer process
    event.returnValue = {test:'test', blah:'blahblah'};
    // Send async message to renderer process
    win.webContents.send('ping', 5);
});

//----------------------------------------------------------------------------------------------------------------------
//          Persistence mechanism
//
function diskPersist(key, value){ // key accept dot-notation so is nestable
    el_store.set(key, value);
    el_store.set('unicorn', '🦄');
    lolcatjs.fromString(el_store.get('unicorn'));
}

//----------------------------------------------------------------------------------------------------------------------
//          Logging
//
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//----------------------------------------------------------------------------------------------------------------------
//          TouchBar
//

const touchbarBtn = new TouchBarButton({
    label: '🏁 ' + app.getName() + '! ',
    backgroundColor: '#cccccc',
})
const touchbarLabel = new TouchBarLabel()
touchbarLabel.label = 'Welcome to ' + app.getName() + ' 🤖 ⓒ mim.Armand - (v.' + app.getVersion() + ')';
const touchBar = new TouchBar([
    new TouchBarSpacer({size: 'large'}),
    touchbarBtn,
    new TouchBarSpacer({size: 'small'}),
    touchbarLabel,
])


//----------------------------------------------------------------------------------------------------------------------
//          MENU
//
let template = [];
if (process.platform === 'darwin') {
    // OS X
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: 'About ' + name,
                role: 'about'
            },
            {
                label: 'Check for updates',
                click(){
                    checkForUpdates();
                }
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() { app.quit(); }
            },
        ]
    });
}

function checkForUpdates(){
    dialog.showMessageBox({"type": "info", "title":"Updates", "message":"Checking for updates..", "detail":"We'll " +
        "check for updates and notify you once there is one available.\n\nThank you."});
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    app.dock.setBadge('Hi!👋')
    // const menu = Menu.buildFromTemplate(template); //todo: uncomment these two lines and add copy/paste to the application menu ( https://github.com/electron/electron/issues/4107 )
    // Menu.setApplicationMenu(menu);

    // Create the browser window.
    win = new BrowserWindow({
        width: 1800
        ,height: 900
        ,frame: false
        ,webPreferences: {webSecurity: false} // uncomment if trouble with CORS!
    });
    win.setTouchBar(touchBar)

    // and load the index.html of the app.
    win.loadURL(url.format({
        // pathname: path.join(__dirname, 'client/build/index.html'),
        // protocol: 'file:',
        pathname: (isDev ? '//localhost:3000' : `//${path.join(__dirname, 'client/build/index.html')}`),
        protocol: (isDev ? 'http:' : 'file:'),
        slashes: true
    }));

    // Open the DevTools.
    if(isDev) win.webContents.openDevTools({mode: "detach"});
    lolcatjs.fromString('=====================================');
    // lambda.listFunctions(params, function(err, data) {
    //     lolcatjs.fromString('-----------------');
    //     if (err) lolcatjs.fromString(err, err.stack); // an error occurred
    //     else     lolcatjs.fromString(data);           // successful response
    //     lolcatjs.fromString('-----------------');
    //     /*
    //     data = {
    //      Functions: [
    //      ],
    //      NextMarker: ""
    //     }
    //     */
    // });
    lolcatjs.fromString('=====================================');

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
    createWindow();
}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.