import "./Loader.scss";

export default function Loader({ message = "Loading...", size = "medium" }) {
  return (
    <div className={`loader-container loader-${size}`}>
      <div className="loader-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && (
        <div className="loader-message">
          {message}
        </div>
      )}
    </div>
  );
}
