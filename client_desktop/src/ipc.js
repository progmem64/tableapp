const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;


/**
 * Setup ipc module for specified browserWindow.
 * @name setupIpc
 * @function
 * @param {BrowserWindow} browserWindow 
 */
module.exports = (browserWindow) => {

    let lastBounds = null;

    ipc.on('resizeWindow', (event, { width, height }) => {
        lastBounds = browserWindow.getBounds();
        browserWindow.setSize(width, height);
    });


    ipc.on('restoreLastWindowSize', (event, data) => {
        browserWindow.setSize(lastBounds.width, lastBounds.height);
    });


    ipc.on('setWindowAlwaysOnTop', (event, alwaysOnTop) => {
        if (alwaysOnTop) {
            if (app.dock) // macOS
                app.dock.hide();
            browserWindow.setAlwaysOnTop(true, 'floating', 99999);
            browserWindow.setVisibleOnAllWorkspaces(true);
            browserWindow.setFullScreenable(false);
            if (app.dock) // macOS
                app.dock.show();
        } else {
            browserWindow.setAlwaysOnTop(false, 'normal');
            browserWindow.setVisibleOnAllWorkspaces(false);
            browserWindow.setFullScreenable(true);
        }
    });
}
