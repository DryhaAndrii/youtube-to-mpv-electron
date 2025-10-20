const { spawn } = require("child_process");
const path = require("path");

/**
 * Searches for YouTube videos using yt-dlp
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of results (default: 10)
 * @param {string} ytDlpPath - Path to yt-dlp executable
 * @returns {Promise<Array>} Array of video objects
 */
async function searchYouTubeVideos(query, maxResults = 10, ytDlpPath) {
  return new Promise((resolve, reject) => {

    const args = [
      '--dump-json',
      '--flat-playlist',
      `--playlist-end=${maxResults}`,
      `ytsearch${maxResults}:${query}`
    ];

    console.log('[Search] Searching for:', query);
    console.log('[Search] Command:', ytDlpPath, args.join(' '));

    const child = spawn(ytDlpPath, args, { 
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
      encoding: 'utf8'
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // Add timeout
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error('Search timeout - yt-dlp took too long to respond'));
    }, 30000); // 30 seconds timeout

    child.on('close', (code) => {
      clearTimeout(timeout);
      
      if (code !== 0) {
        console.error('[Search] Error code:', code);
        console.error('[Search] Error output:', errorOutput);
        reject(new Error(`yt-dlp search failed with code ${code}. Please check your internet connection and try again.`));
        return;
      }

      try {
        // Parse JSON lines output
        const lines = output.trim().split('\n').filter(line => line.trim());
        console.log(`[Search] Raw output lines: ${lines.length}`);
        
        const videos = lines.map(line => {
          try {
            const data = JSON.parse(line);
            const thumbnailUrl = data.thumbnail 
              || (Array.isArray(data.thumbnails) && data.thumbnails.length > 0 
                    ? (data.thumbnails[data.thumbnails.length - 1].url || data.thumbnails[0].url)
                    : null);
            return {
              id: data.id,
              title: data.title,
              duration: data.duration,
              view_count: data.view_count,
              uploader: data.uploader,
              thumbnail: thumbnailUrl,
              url: data.webpage_url,
              description: data.description || ''
            };
          } catch (parseError) {
            console.warn('[Search] Failed to parse line:', line.substring(0, 100) + '...');
            return null;
          }
        }).filter(video => video !== null);

        console.log(`[Search] Successfully parsed ${videos.length} videos`);
        resolve(videos);
      } catch (parseError) {
        console.error('[Search] Parse error:', parseError);
        reject(new Error('Failed to parse search results'));
      }
    });

    child.on('error', (error) => {
      console.error('[Search] Spawn error:', error);
      reject(error);
    });
  });
}

module.exports = { searchYouTubeVideos };
