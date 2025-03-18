import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

const MarkerButton = ({ place, onSelect }) => {
  return (
    <button className="marker-btn" onClick={(e) => onSelect(e, place)}>
      <FontAwesomeIcon icon={faLandmark} size="2x" />
    </button>
  );
};

export default MarkerButton;
