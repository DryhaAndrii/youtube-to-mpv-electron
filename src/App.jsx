import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import UrlInputField from "./components/UrlInputField/UrlInputField";
import QualitySelector from "./components/QualitySelector/QualitySelector";
import PlayButton from "./components/PlayButton/PlayButton";
import Hint from "./components/Hint/Hint";
import { useVideoFormats } from "./services/useVideoFormats";
import "./App.scss";

export default function App() {
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
    <div className="app-container">
      <div className="content">
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
          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "12px", color: "#888" }}>
            Checking available qualities...
          </div>
        )}
      </div>
    </div>
  );
}
