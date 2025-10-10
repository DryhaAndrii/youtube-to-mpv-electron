import Select from "../../ui/Select/Select";
import "./QualitySelector.scss";

const QUALITY_OPTIONS = [
  { value: "360p", label: "360p" },
  { value: "480p", label: "480p" },
  { value: "720p", label: "720p" },
  { value: "1080p", label: "1080p" },
  { value: "Best", label: "Best" },
  { value: "Audio", label: "Audio Only" },
];

export default function QualitySelector({ quality, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="quality">Quality</label>
      <Select
        id="quality"
        value={quality}
        onChange={onChange}
        options={QUALITY_OPTIONS}
      />
    </div>
  );
}

