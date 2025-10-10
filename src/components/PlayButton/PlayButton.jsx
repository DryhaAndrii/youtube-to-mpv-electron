import Button from "../../ui/Button/Button";
import "./PlayButton.scss";

export default function PlayButton({ onClick }) {
  return (
    <div className="actions">
      <Button variant="primary" onClick={onClick}>
        ▶ Play
      </Button>
    </div>
  );
}

