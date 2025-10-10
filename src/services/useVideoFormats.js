import { useState, useEffect } from "react";

/**
 * Custom hook for fetching available video formats from YouTube
 * @param {string} url - YouTube video URL
 * @returns {Object} { availableQualities, isFetchingFormats, selectedQuality, setSelectedQuality }
 */
export function useVideoFormats(url) {
  const [availableQualities, setAvailableQualities] = useState([]);
  const [isFetchingFormats, setIsFetchingFormats] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("Best");

  // Debounce URL changes to avoid too many requests
  useEffect(() => {
    if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
      setAvailableQualities([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsFetchingFormats(true);
      try {
        const formats = await window.electronAPI.fetchFormats(url);
        setAvailableQualities(formats);
        
        // Auto-select best available quality if current selection is not available
        if (formats.length > 0) {
          const currentQualityExists = formats.some(f => f.value === selectedQuality);
          if (!currentQualityExists) {
            setSelectedQuality(formats[0].value); // Select first (best) quality
          }
        }
      } catch (error) {
        console.error("Failed to fetch formats:", error);
        setAvailableQualities([]);
      } finally {
        setIsFetchingFormats(false);
      }
    }, 1000); // Wait 1 second after user stops typing

    return () => clearTimeout(timer);
  }, [url, selectedQuality]);

  return {
    availableQualities,
    isFetchingFormats,
    selectedQuality,
    setSelectedQuality,
  };
}

