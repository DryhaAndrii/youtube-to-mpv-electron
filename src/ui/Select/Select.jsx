import "./Select.scss";

export default function Select({
  id,
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`select ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

