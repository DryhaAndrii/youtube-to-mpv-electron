import Input from "../../../ui/Input/Input";
import "./UrlInputField.scss";

export default function UrlInputField({ url, onChange, onEnter }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="url">URL</label>
      <div className="input-group">
        <Input
          id="url"
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      </div>
    </div>
  );
}
