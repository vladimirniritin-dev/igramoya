const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  toggleFullscreen: () => ipcRenderer.invoke('game:toggle-fullscreen'),
  setWindowSize: (size) => ipcRenderer.invoke('game:set-window-size', size),
  quitGame: () => ipcRenderer.invoke('game:quit')
});
