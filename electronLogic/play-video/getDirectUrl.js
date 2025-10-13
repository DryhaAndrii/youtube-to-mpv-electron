const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

/**
 * Gets direct video and audio URLs from YouTube using yt-dlp
 * @param {string} url - YouTube video URL
 * @param {string} quality - Quality format string
 * @param {string} ytDlpPath - Path to yt-dlp.exe
 * @returns {Promise<Array<string>>} Array of direct URLs [video, audio] or [combined]
 */
async function getDirectUrl(url, quality, ytDlpPath) {
  try {
    // Get URLs for both video and audio streams
    // YouTube separates video and audio for qualities above 360p
    const { stdout } = await execFileAsync(ytDlpPath, [
      "-f", quality,
      "--get-url",
      "--no-warnings",
      url
    ], {
      timeout: 15000, // 15 second timeout
      maxBuffer: 5 * 1024 * 1024 // 5MB buffer
    });

    const urls = stdout.trim().split("\n").filter(u => u.startsWith("http"));
    
    if (urls.length === 0) {
      throw new Error("Failed to get valid video URLs");
    }

    console.log(`[GetDirectUrl] Successfully got ${urls.length} URL(s)`);
    return urls;
  } catch (error) {
    console.error("[GetDirectUrl] Error:", error.message);
    throw new Error(`Failed to get video URL: ${error.message}`);
  }
}

module.exports = { getDirectUrl };

