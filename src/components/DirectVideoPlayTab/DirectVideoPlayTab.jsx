import { useState, useEffect } from "react";
import Header from "./Header/Header";
import UrlInputField from "./UrlInputField/UrlInputField";
import QualitySelector from "./QualitySelector/QualitySelector";
import PlayButton from "./PlayButton/PlayButton";
import Hint from "./Hint/Hint";
import { useVideoFormats } from "../../services/useVideoFormats";
import "./DirectVideoPlayTab.scss";

export default function DirectVideoPlayTab() {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=gHWFSxa5r6I");
  const [isPlaying, setIsPlaying] = useState(false);
  
  const {
    availableQualities,
    isFetchingFormats,
    selectedQuality,
    setSelectedQuality,
  } = useVideoFormats(url);

  // Check initial MPV status and set up listeners
  useEffect(() => {
    // Check current status on mount
    window.electronAPI.getMpvStatus().then(status => {
      setIsPlaying(status.isPlaying);
    });

    // Listen for MPV status changes
    window.electronAPI.onMpvStatusChange((status) => {
      setIsPlaying(status.isPlaying);
    });

    // Cleanup listener on unmount
    return () => {
      window.electronAPI.removeMpvStatusListener();
    };
  }, []);

  const handlePlay = async () => {
    if (!url) return alert("Please enter a YouTube video URL");
    
    try {
      await window.electronAPI.playVideo(url, selectedQuality);
    } catch (e) {
      console.error(e);
      alert("Failed to launch the player. Check mpv.exe and yt-dlp.exe.");
    }
  };

  return (
    <div className="direct-video-play-tab">
      <Header />
      
      <UrlInputField
        url={url}
        onChange={(e) => setUrl(e.target.value)}
        onEnter={handlePlay}
      />
      
      {availableQualities.length > 0 && (
        <QualitySelector
          quality={selectedQuality}
          onChange={(e) => setSelectedQuality(e.target.value)}
          options={availableQualities}
          disabled={isFetchingFormats}
        />
      )}
      
      <PlayButton 
        onClick={handlePlay} 
        disabled={availableQualities.length === 0 || isPlaying} 
        isPlaying={isPlaying}
      />
      
      <Hint />
      
      {isFetchingFormats && (
        <div className="loading-indicator">
          Checking available qualities...
        </div>
      )}
    </div>
  );
}
