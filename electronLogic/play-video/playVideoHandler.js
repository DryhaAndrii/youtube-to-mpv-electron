const { spawn } = require("child_process");
const { mapQualityToFormat } = require("./qualityMapper");

// Store for tracking active MPV processes
const activeMpvProcesses = new Set();

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
      const args = [`--ytdl-format=${format}`, url];

      const child = spawn(mpvPath, args, { detached: true, stdio: "ignore" });
      
      // Track this MPV process
      activeMpvProcesses.add(child.pid);
      
      // Send event to renderer that MPV started
      event.sender.send('mpv-status-changed', { isPlaying: true });
      
      // Handle process exit
      child.on('exit', (code, signal) => {
        console.log(`[PlayVideo] MPV process ${child.pid} exited with code ${code}, signal ${signal}`);
        activeMpvProcesses.delete(child.pid);
        
        // Determine exit reason
        let exitReason = 'closed';
        if (code !== 0) {
          exitReason = 'error';
        } else if (signal) {
          exitReason = 'interrupted';
        }
        
        // Send event to renderer that MPV stopped with reason
        event.sender.send('mpv-status-changed', { 
          isPlaying: false, 
          exitCode: code, 
          exitSignal: signal,
          exitReason: exitReason
        });
      });

      child.unref();

      console.log("[PlayVideo] MPV launched successfully");
      return { success: true };
    } catch (error) {
      console.error("[PlayVideo] Error:", error);
      throw error;
    }
  };
}

/**
 * Creates and returns a handler to check MPV status
 * @returns {Function} IPC handler function
 */
function createGetMpvStatusHandler() {
  return async () => {
    return { isPlaying: activeMpvProcesses.size > 0 };
  };
}

module.exports = { createPlayVideoHandler, createGetMpvStatusHandler };
