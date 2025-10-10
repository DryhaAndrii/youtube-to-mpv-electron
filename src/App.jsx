import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");

  const handlePlay = async () => {
    if (!url) return alert("Paste a YouTube video URL");
    try {
      await window.electronAPI.playVideo(url);
    } catch (e) {
      console.error(e);
      alert("Failed to launch the player. Check mpv.exe and PATH.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>YT → mpv</h2>
      <input
        style={{ width: "70%", padding: 8 }}
        placeholder="Paste a YouTube link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        style={{ marginLeft: 8, padding: "8px 12px" }}
        onClick={handlePlay}
      >
        ▶️ Play via mpv
      </button>
    </div>
  );
}
