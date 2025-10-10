import "./Button.scss";

export default function Button({ 
  children, 
  onClick, 
  variant = "default",
  className = "",
  disabled = false
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}

