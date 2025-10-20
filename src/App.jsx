import Tabs, { Tab } from "./components/Tabs/Tabs";
import DirectVideoPlayTab from "./components/DirectVideoPlayTab/DirectVideoPlayTab";
import SearchTab from "./components/SearchTab/SearchTab";
import { ToastProvider } from "./ui/Toast";
import "./App.scss";

export default function App() {
  return (
    <ToastProvider>
      <div className="app-container">
        <div className="content">
          <Tabs defaultTab={0}>
            <Tab label="Direct Play">
              <DirectVideoPlayTab />
            </Tab>
            <Tab label="Search">
              <SearchTab />
            </Tab>
          </Tabs>
        </div>
      </div>
    </ToastProvider>
  );
}
