import "../css/search-box.css";
import { useState } from "react";
import ThreeDButton from "./3DButton";

export default function SearchBox({
  value,
  onChange,
  results,
  onSelect,
  onToggle3D,
  is3D,
}) {
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
      <div className="search-input-wrapper">
        <input
          className="search-box-container"
          value={value}
          onChange={handleInputChange}
          placeholder="Search museums..."
          style={{ outline: "0px solid #000", outlineOffset: "0" }}
        />
        <ThreeDButton onClick={onToggle3D} is3D={is3D} />
      </div>
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
