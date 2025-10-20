import { useState } from "react";
import "./Tabs.scss";

export default function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = children.map((child, index) => ({
    id: index,
    label: child.props.label,
    content: child.props.children
  }));

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tabs-content">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}

export function Tab({ children }) {
  return children;
}
