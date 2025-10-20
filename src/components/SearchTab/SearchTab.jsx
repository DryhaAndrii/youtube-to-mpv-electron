import { useState } from "react";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import { useToast } from "../../ui/Toast";
import "./SearchTab.scss";

export default function SearchTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const { showSuccess, showError, showWarning } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showWarning("Please enter a search query");
      return;
    }

    showSuccess(`Searching for: "${searchQuery}"`);
    console.log("Searching for:", searchQuery);
    // TODO: Implement search functionality
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-tab">
      <div className="search-header">
        <h2>Search YouTube Videos</h2>
        <p>Enter a search query to find videos</p>
      </div>

      <div className="search-form">
        <Input
          type="text"
          placeholder="Enter search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
          Search
        </Button>
      </div>

      <div className="search-results">
        {/* TODO: Add search results here */}
        <p className="placeholder-text">Search results will appear here...</p>
      </div>
    </div>
  );
}
