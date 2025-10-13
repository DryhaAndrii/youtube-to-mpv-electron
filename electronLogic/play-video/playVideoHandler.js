const { spawn } = require("child_process");
const { mapQualityToFormat } = require("./qualityMapper");

/**
 * Creates and returns the play-video IPC handler
 * @param {string} mpvPath - Path to mpv.exe
 * @param {string} ytDlpPath - Path to yt-dlp.exe (not used, kept for compatibility)
 * @returns {Function} IPC handler function
 */
function createPlayVideoHandler(mpvPath, ytDlpPath) {
  return async (event, url, quality = "Best") => {
    try {
      console.log("[PlayVideo] Launching MPV for:", { url, quality });
      
      const format = mapQualityToFormat(quality);
      
      // Let MPV use yt-dlp internally - this is more reliable
      // MPV will handle HLS streams and segmented video properly
      const args = [
        `--ytdl-format=${format}`,
        url
      ];

      const child = spawn(mpvPath, args, { detached: true, stdio: "ignore" });
      child.unref();

      console.log("[PlayVideo] MPV launched successfully");
      return { success: true };
    } catch (error) {
      console.error("[PlayVideo] Error:", error);
      throw error;
    }
  };
}

module.exports = { createPlayVideoHandler };

