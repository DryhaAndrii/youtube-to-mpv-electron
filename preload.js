const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  playVideo: (url, quality) => ipcRenderer.invoke("play-video", url, quality),
});
