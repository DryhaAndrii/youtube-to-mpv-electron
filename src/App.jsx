import { useState } from "react";
import Header from "./components/Header";
import UrlInputField from "./components/UrlInputField";
import QualitySelector from "./components/QualitySelector";
import PlayButton from "./components/PlayButton";
import Hint from "./components/Hint";
import "./App.scss";

export default function App() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("720p");

  const handlePlay = async () => {
    if (!url) return alert("Please enter a YouTube video URL");
    
    try {
      await window.electronAPI.playVideo(url, quality);
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
        
        <QualitySelector
          quality={quality}
          onChange={(e) => setQuality(e.target.value)}
        />
        
        <PlayButton onClick={handlePlay} />
        
        <Hint />
      </div>
    </div>
  );
}
