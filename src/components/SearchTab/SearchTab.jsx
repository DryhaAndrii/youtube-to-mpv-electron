import { useState } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";
import VideoCard from "./VideoCard/VideoCard";
import { useToast } from "../../ui/Toast";
import "./SearchTab.scss";

export default function SearchTab({ onSwitchToDirectPlay }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const { showSuccess, showError, showWarning } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      showWarning("Please enter a search query");
      return;
    }

    setIsSearching(true);
    setCurrentQuery(searchQuery);
    setVideos([]);
    setHasMoreResults(false);

    try {
      const results = await window.electronAPI.searchVideos(searchQuery, 10);
      setVideos(results);
      setHasMoreResults(results.length === 10);
      
      if (results.length > 0) {
        showSuccess(`Found ${results.length} videos for "${searchQuery}"`);
      } else {
        showWarning("No videos found for this query");
      }
    } catch (error) {
      console.error("Search error:", error);
      const errorMessage = error.message.includes('timeout') 
        ? "Search timeout. Please check your internet connection and try again."
        : error.message.includes('yt-dlp') 
        ? "Search service unavailable. Please try again later."
        : "Failed to search videos. Please try again.";
      showError(errorMessage);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLoadMore = async () => {
    if (!currentQuery || isLoadingMore) return;

    setIsLoadingMore(true);
    const currentCount = videos.length;

    try {
      const results = await window.electronAPI.searchVideos(currentQuery, currentCount + 10);
      setVideos(results);
      setHasMoreResults(results.length > currentCount);
      
      if (results.length > currentCount) {
        showSuccess(`Loaded ${results.length - currentCount} more videos`);
      } else {
        showWarning("No more videos available");
        setHasMoreResults(false);
      }
    } catch (error) {
      console.error("Load more error:", error);
      const errorMessage = error.message.includes('timeout') 
        ? "Load timeout. Please check your internet connection and try again."
        : error.message.includes('yt-dlp') 
        ? "Search service unavailable. Please try again later."
        : "Failed to load more videos";
      showError(errorMessage);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleVideoClick = async (video) => {
    try {
      // Copy URL to clipboard
      await navigator.clipboard.writeText(video.url);
      showSuccess(`Video URL copied! Switching to Direct Play...`);
      
      // Switch to Direct Play tab with the video URL
      if (onSwitchToDirectPlay) {
        onSwitchToDirectPlay(video.url);
      }
    } catch (error) {
      console.error('Failed to copy URL:', error);
      showError('Failed to copy video URL');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-tab">
      <div className="search-header">
        <h2>Search YouTube Videos</h2>
        <p>Enter a search query to find videos</p>
      </div>

      <div className="search-form">
        <Input
          type="text"
          placeholder="Enter search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="search-results">
        {isSearching && (
          <Loader 
            message="Searching for videos..."
            size="medium"
          />
        )}
        
        {!isSearching && videos.length > 0 && (
          <div className="videos-grid">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} onVideoClick={handleVideoClick} />
            ))}
          </div>
        )}
        
        {!isSearching && videos.length === 0 && currentQuery && (
          <div className="no-results">
            <p>No videos found for "{currentQuery}"</p>
            <p className="hint">Try a different search term</p>
          </div>
        )}
        
        {!isSearching && !currentQuery && (
          <div className="placeholder">
            <p className="placeholder-text">Search results will appear here...</p>
            <p className="hint">Enter a search query above to find YouTube videos</p>
          </div>
        )}
        
        {hasMoreResults && !isSearching && (
          <div className="load-more-container">
            {isLoadingMore ? (
              <Loader 
                message="Loading more videos..."
                size="small"
              />
            ) : (
              <Button onClick={handleLoadMore} disabled={isLoadingMore}>
                Load More
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}