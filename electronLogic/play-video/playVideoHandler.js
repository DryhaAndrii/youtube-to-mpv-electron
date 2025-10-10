const { spawn } = require("child_process");
const { mapQualityToFormat } = require("./qualityMapper");

/**
 * Creates and returns the play-video IPC handler
 * @param {string} mpvPath - Path to mpv.exe
 * @returns {Function} IPC handler function
 */
function createPlayVideoHandler(mpvPath) {
  return async (event, url, quality = "720p") => {
    const format = mapQualityToFormat(quality);
    const args = [`--ytdl-format=${format}`, url];

    const child = spawn(mpvPath, args, { detached: true, stdio: "ignore" });
    child.unref();

    return true;
  };
}

module.exports = { createPlayVideoHandler };

