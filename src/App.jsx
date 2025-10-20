import Tabs, { Tab } from "./components/Tabs/Tabs";
import DirectVideoPlayTab from "./components/DirectVideoPlayTab/DirectVideoPlayTab";
import SearchTab from "./components/SearchTab/SearchTab";
import "./App.scss";

export default function App() {
  return (
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
  );
}
