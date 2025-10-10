import "./Select.scss";

export default function Select({
  id,
  value,
  onChange,
  options = [],
  className = "",
  disabled = false,
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`select ${className}`}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

