/**
 * Maps quality label to yt-dlp format string
 * @param {string} quality - Quality label (360p, 480p, 720p, 1080p, Best, Audio)
 * @returns {string} yt-dlp format string
 */
function mapQualityToFormat(quality) {
  switch (quality) {
    case "360p":
      return "best[height<=360]";
    case "480p":
      return "best[height<=480]";
    case "720p":
      return "best[height<=720]";
    case "1080p":
      return "best[height<=1080]";
    case "Best":
      return "best";
    case "Audio":
      return "bestaudio";
    default:
      return "best";
  }
}

module.exports = { mapQualityToFormat };

