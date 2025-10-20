import { useState, useEffect, useRef } from "react";
import Header from "./Header/Header";
import UrlInputField from "./UrlInputField/UrlInputField";
import QualitySelector from "./QualitySelector/QualitySelector";
import PlayButton from "./PlayButton/PlayButton";
import Hint from "./Hint/Hint";
import Loader from "../../ui/Loader/Loader";
import { useVideoFormats } from "../../services/useVideoFormats";
import "./DirectVideoPlayTab.scss";

export default function DirectVideoPlayTab() {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=gHWFSxa5r6I");
  const [isPlaying, setIsPlaying] = useState(false);
  const [mpvStatusMessage, setMpvStatusMessage] = useState("");
  const [mpvMessageType, setMpvMessageType] = useState("success");
  const isPlayingRef = useRef(false);
  
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
      isPlayingRef.current = status.isPlaying;
    });

    // Listen for MPV status changes
    window.electronAPI.onMpvStatusChange((status) => {
      const wasPlaying = isPlayingRef.current;
      setIsPlaying(status.isPlaying);
      isPlayingRef.current = status.isPlaying;
      
      // Show status messages
      if (status.isPlaying && !wasPlaying) {
        setMpvStatusMessage("MPV player started successfully!");
        setMpvMessageType("success");
        // Clear message after 3 seconds
        setTimeout(() => setMpvStatusMessage(""), 3000);
      } else if (!status.isPlaying && wasPlaying) {
        // Determine the appropriate message based on exit reason
        let message = "MPV player has been closed.";
        let messageType = "success";
        
        if (status.exitReason === 'error') {
          message = "MPV player failed to play the video. Please check the URL or try a different quality.";
          messageType = "error";
        } else if (status.exitReason === 'interrupted') {
          message = "MPV player was interrupted.";
          messageType = "warning";
        } else {
          message = "MPV player has been closed.";
          messageType = "success";
        }
        
        setMpvStatusMessage(message);
        setMpvMessageType(messageType);
        // Clear message after 5 seconds for error messages (longer display time)
        const clearTime = status.exitReason === 'error' ? 5000 : 3000;
        setTimeout(() => setMpvStatusMessage(""), clearTime);
      }
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
        <Loader 
          message="Checking available qualities..."
          size="small"
        />
      )}
      
      {mpvStatusMessage && (
        <div className={`mpv-status-message ${mpvMessageType}`}>
          {mpvStatusMessage}
        </div>
      )}
    </div>
  );
}
