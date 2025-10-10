import Select from "../../ui/Select/Select";
import "./QualitySelector.scss";

const DEFAULT_QUALITY_OPTIONS = [
  { value: "Best", label: "Best Available" },
  { value: "1080p", label: "1080p" },
  { value: "720p", label: "720p" },
  { value: "480p", label: "480p" },
  { value: "360p", label: "360p" },
  { value: "Audio", label: "Audio Only" },
];

export default function QualitySelector({ quality, onChange, options, disabled }) {
  const qualityOptions = options && options.length > 0 ? options : DEFAULT_QUALITY_OPTIONS;
  
  return (
    <div className="form-group">
      <label htmlFor="quality">Quality</label>
      <Select
        id="quality"
        value={quality}
        onChange={onChange}
        options={qualityOptions}
        disabled={disabled}
      />
    </div>
  );
}

