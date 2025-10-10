const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  playVideo: (url) => ipcRenderer.invoke("play-video", url),
});
