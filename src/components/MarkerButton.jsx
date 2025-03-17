import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const MarkerButton = ({ museum, onSelect }) => {
  const isCluster = museum.cluster;

  return (
    <button className="marker-btn" onClick={(e) => onSelect(e, museum)}>
      {isCluster ? (
        <FontAwesomeIcon icon={faLayerGroup} size="2x" />
      ) : (
        <FontAwesomeIcon icon={faLandmark} size="2x" />
      )}
    </button>
  );
};

export default MarkerButton;
