const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 980,
    minHeight: 680,
    show: false,
    backgroundColor: '#172334',
    fullscreenable: true,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    title: 'Летние истории',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  ipcMain.removeHandler('game:toggle-fullscreen');
  ipcMain.removeHandler('game:set-window-size');
  ipcMain.removeHandler('game:quit');
  ipcMain.handle('game:toggle-fullscreen', () => { win.setFullScreen(!win.isFullScreen()); return win.isFullScreen(); });
  ipcMain.handle('game:quit', () => { app.quit(); return true; });
  ipcMain.handle('game:set-window-size', (_event, size) => {
    const allowed = { '1280x720':[1280,720], '1440x900':[1440,900], '1600x900':[1600,900], '1920x1080':[1920,1080] };
    if (allowed[size] && !win.isFullScreen()) { win.setSize(...allowed[size]); win.center(); return true; }
    return false;
  });
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') { event.preventDefault(); win.setFullScreen(!win.isFullScreen()); }
    if (input.type === 'keyDown' && input.key === 'Escape' && win.isFullScreen()) win.setFullScreen(false);
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(() => {
  app.setAppUserModelId('ru.letnieistorii.game');
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
