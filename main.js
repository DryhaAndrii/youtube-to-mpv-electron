const { app, ipcMain } = require("electron");
const path = require("path");
const { createPlayVideoHandler, createGetMpvStatusHandler, fetchAvailableFormats } = require("./electronLogic/play-video");
const { searchYouTubeVideos } = require("./electronLogic/play-video/searchHandler");
const { createWindow } = require("./electronLogic/window");

// Disable GPU hardware acceleration to mitigate GPU process crashes on some systems
app.disableHardwareAcceleration();
// Force ANGLE backend to D3D11 for better compatibility on Windows
app.commandLine.appendSwitch("use-angle", "d3d11");
// Disable sandbox for better Windows 7 compatibility
app.commandLine.appendSwitch("no-sandbox");
// Disable GPU sandbox (helps on older Windows versions)
app.commandLine.appendSwitch("disable-gpu-sandbox");

// In dev mode (React dev server)
const isDev = !app.isPackaged;
const mpvPath = isDev
  ? path.join(__dirname, "bin", "mpv.exe") // bin folder at project root
  : path.join(process.resourcesPath, "bin", "mpv.exe"); // for packaged app

const ytDlpPath = isDev
  ? path.join(__dirname, "bin", "yt-dlp.exe")
  : path.join(process.resourcesPath, "bin", "yt-dlp.exe");

// Register IPC handlers
ipcMain.handle("play-video", createPlayVideoHandler(mpvPath, ytDlpPath));
ipcMain.handle("get-mpv-status", createGetMpvStatusHandler());
ipcMain.handle("fetch-formats", async (event, url) => {
  return await fetchAvailableFormats(url, ytDlpPath);
});
ipcMain.handle("search-videos", async (event, query, maxResults = 10) => {
  return await searchYouTubeVideos(query, maxResults, ytDlpPath);
});

app.whenReady().then(() => createWindow(isDev));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
