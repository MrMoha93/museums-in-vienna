import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

const MarkerButton = ({ museum, onSelect }) => (
  <button className="marker-btn" onClick={(e) => onSelect(e, museum)}>
    <FontAwesomeIcon icon={faLandmark} size="2x" />
  </button>
);

export default MarkerButton;
