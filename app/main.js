'use strict';

var app = require('app'),
    BrowserWindow = require('browser-window'),
    env = require('./module/environment/env_config'),
    devHelper = require('./module/environment/dev_helper'),
    windowStateKeeper = require('./module/environment/window_state'),
    mainWindow = null,
    mainWindowState = windowStateKeeper('main', {
        width: 1000,
        height: 600
    });


app.on('ready', function () {
   mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        show:false,
        frame:true
    });

   if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }
   mainWindow.loadUrl('file://' + __dirname + '/index.html');
    if (env.name === 'development') {
        devHelper.setDevMenu();
        mainWindow.openDevTools();
    }
    mainWindow.webContents.on('did-finish-load', function() {
            mainWindow.show();
    });
    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});
