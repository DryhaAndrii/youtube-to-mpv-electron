import { useState, useEffect } from "react";
import "./Tabs.scss";

export default function Tabs({ children, defaultTab = 0, activeTab, onTabChange }) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab);
  
  // Use external activeTab if provided, otherwise use internal state
  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;
  
  const handleTabChange = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  // Update internal state when external activeTab changes
  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);

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
            className={`tab-button ${currentActiveTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tabs-content">
        {tabs[currentActiveTab]?.content}
      </div>
    </div>
  );
}

export function Tab({ children }) {
  return children;
}
