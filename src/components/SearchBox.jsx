import { useState } from "react";

export default function SearchBox({ value, onChange, results, onSelect }) {
  const [showDropdown, setShowDropdown] = useState(true);

  const handleSelect = (result) => {
    onSelect(result);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setShowDropdown(true);
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-box-container"
        value={value}
        onChange={handleInputChange}
        placeholder="Search museums..."
        style={{ outline: "0px solid #000", outlineOffset: "0" }}
      />
      {value && results.length > 0 && showDropdown && (
        <ul className="dropdown-list">
          {results.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSelect(result)}
              className="dropdown-item"
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
