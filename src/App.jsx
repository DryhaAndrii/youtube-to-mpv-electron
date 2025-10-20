import { useState } from "react";
import Tabs, { Tab } from "./components/Tabs/Tabs";
import DirectVideoPlayTab from "./components/DirectVideoPlayTab/DirectVideoPlayTab";
import SearchTab from "./components/SearchTab/SearchTab";
import { ToastProvider } from "./ui/Toast";
import "./App.scss";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [directPlayUrl, setDirectPlayUrl] = useState("https://www.youtube.com/watch?v=gHWFSxa5r6I");

  const handleSwitchToDirectPlay = (url) => {
    setDirectPlayUrl(url);
    setActiveTab(0); // Switch to Direct Play tab
  };

  return (
    <ToastProvider>
      <div className="app-container">
        <div className="content">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
            <Tab label="Direct Play">
              <DirectVideoPlayTab initialUrl={directPlayUrl} />
            </Tab>
            <Tab label="Search">
              <SearchTab onSwitchToDirectPlay={handleSwitchToDirectPlay} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </ToastProvider>
  );
}
