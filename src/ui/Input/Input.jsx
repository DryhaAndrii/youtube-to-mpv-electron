import "./Input.scss";

export default function Input({ 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  onKeyPress,
  onFocus,
  onBlur,
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
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={autoFocus}
      className={`input ${className}`}
    />
  );
}

