const { BrowserWindow } = require("electron");
const path = require("path");

/**
 * Creates and configures the main application window
 * @param {boolean} isDev - Whether the app is in development mode
 * @returns {BrowserWindow} The created window instance
 */
function createWindow(isDev) {
  const iconPath = isDev
    ? path.join(__dirname, "..", "..", "public", "ikonka.png")
    : path.join(__dirname, "..", "..", "dist", "ikonka.png");

  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "..", "..", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "..", "..", "dist", "index.html"));
  }

  return win;
}

module.exports = { createWindow };

