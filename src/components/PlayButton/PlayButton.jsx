import Button from "../../ui/Button/Button";
import "./PlayButton.scss";

export default function PlayButton({ onClick, disabled = false, isPlaying = false }) {
  const buttonText = isPlaying ? "Playing in MPV..." : "▶ Play";
  
  return (
    <div className="actions">
      <Button variant="primary" onClick={onClick} disabled={disabled}>
        {buttonText}
      </Button>
    </div>
  );
}

