import "./Input.scss";

export default function Input({ 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  onKeyPress,
  autoFocus = false,
  className = ""
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      autoFocus={autoFocus}
      className={`input ${className}`}
    />
  );
}

