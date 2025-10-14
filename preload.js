const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  playVideo: (url, quality) => ipcRenderer.invoke("play-video", url, quality),
  fetchFormats: (url) => ipcRenderer.invoke("fetch-formats", url),
  getMpvStatus: () => ipcRenderer.invoke("get-mpv-status"),
  onMpvStatusChange: (callback) => {
    ipcRenderer.on("mpv-status-changed", (event, status) => callback(status));
  },
  removeMpvStatusListener: () => {
    ipcRenderer.removeAllListeners("mpv-status-changed");
  },
});
