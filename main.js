const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

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

function createWindow() {
  const iconPath = isDev
    ? path.join(__dirname, "public", "ikonka.png")
    : path.join(__dirname, "dist", "ikonka.png");

  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }
}

ipcMain.handle("play-video", (event, url) => {
  const child = spawn(mpvPath, [url], { detached: true, stdio: "ignore" });
  child.unref();
  return true;
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
