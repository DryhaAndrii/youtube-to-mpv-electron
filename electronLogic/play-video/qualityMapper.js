/**
 * Maps quality label to yt-dlp format string
 * @param {string} quality - Quality label (360p, 480p, 720p, 720p60, 1080p, 1080p60, etc.)
 * @returns {string} yt-dlp format string
 */
function mapQualityToFormat(quality) {
  // Handle special cases
  if (quality === "Best") return "best";
  if (quality === "Audio") return "bestaudio";
  
  // Parse quality string (e.g., "720p60" -> height: 720, fps: 60)
  const match = quality.match(/^(\d+)p(\d+)?$/);
  if (!match) return "best"; // Fallback
  
  const height = match[1];
  const fps = match[2];
  
  if (fps) {
    // If FPS is specified, request exact height and FPS
    return `best[height<=${height}][fps<=${fps}]`;
  } else {
    // If no FPS specified, just request height (will get best available FPS)
    return `best[height<=${height}]`;
  }
}

module.exports = { mapQualityToFormat };

