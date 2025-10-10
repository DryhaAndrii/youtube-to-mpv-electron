import Button from "../../ui/Button/Button";
import "./PlayButton.scss";

export default function PlayButton({ onClick, disabled = false }) {
  return (
    <div className="actions">
      <Button variant="primary" onClick={onClick} disabled={disabled}>
        ▶ Play
      </Button>
    </div>
  );
}

