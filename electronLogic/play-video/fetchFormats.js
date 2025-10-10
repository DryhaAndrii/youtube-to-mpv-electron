const { execFile } = require("child_process");
const { promisify } = require("util");
const path = require("path");

const execFileAsync = promisify(execFile);

/**
 * Fetches available video formats from YouTube using yt-dlp
 * @param {string} url - YouTube video URL
 * @param {string} ytDlpPath - Path to yt-dlp.exe
 * @returns {Promise<Array>} Array of available quality options
 */
async function fetchAvailableFormats(url, ytDlpPath) {
  try {
    // Use yt-dlp to get available formats in JSON format
    const { stdout } = await execFileAsync(ytDlpPath, [
      "-J", // Output JSON
      "--no-warnings",
      url
    ], {
      timeout: 10000, // 10 second timeout
      maxBuffer: 5 * 1024 * 1024 // 5MB buffer
    });

    const data = JSON.parse(stdout);
    const formats = data.formats || [];

    // Extract unique height+fps combinations
    const qualityMap = new Map(); // key: "1080p60", value: { height, fps, count }
    
    formats.forEach(format => {
      const height = format.height;
      const fps = format.fps || 30; // Default to 30fps if not specified
      const hasVideo = format.vcodec && format.vcodec !== "none";
      
      if (height && hasVideo) {
        let qualityLabel = "";
        if (height >= 2160) qualityLabel = "2160p";
        else if (height >= 1440) qualityLabel = "1440p";
        else if (height >= 1080) qualityLabel = "1080p";
        else if (height >= 720) qualityLabel = "720p";
        else if (height >= 480) qualityLabel = "480p";
        else if (height >= 360) qualityLabel = "360p";
        else if (height >= 240) qualityLabel = "240p";
        
        if (qualityLabel) {
          // Determine FPS suffix (only show if 60fps or higher)
          const fpsLabel = fps >= 60 ? `${qualityLabel}60` : qualityLabel;
          
          if (!qualityMap.has(fpsLabel)) {
            qualityMap.set(fpsLabel, { height, fps, label: fpsLabel });
          }
        }
      }
    });

    // Check if audio-only is available
    const hasAudioOnly = formats.some(f => f.acodec !== "none" && f.vcodec === "none");
    
    // Sort qualities by height and fps
    const sortedQualities = Array.from(qualityMap.values()).sort((a, b) => {
      if (a.height !== b.height) return b.height - a.height; // Higher resolution first
      return b.fps - a.fps; // Higher FPS first
    });
    
    // Build result array
    const result = [];
    if (sortedQualities.length > 0) {
      result.push({ value: "Best", label: "Best Available" });
      sortedQualities.forEach(q => {
        result.push({ value: q.label, label: q.label });
      });
    }
    
    if (hasAudioOnly) {
      result.push({ value: "Audio", label: "Audio Only" });
    }

    return result;
  } catch (error) {
    console.error("[FetchFormats] Error:", error.message);
    throw new Error("Failed to fetch video formats. Check if the URL is valid and yt-dlp is working.");
  }
}

module.exports = { fetchAvailableFormats };

