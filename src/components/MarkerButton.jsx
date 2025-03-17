import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const MarkerButton = ({ place, onSelect }) => {
  const isCluster = place.cluster;

  return (
    <button className="marker-btn" onClick={(e) => onSelect(e, place)}>
      {isCluster ? (
        <FontAwesomeIcon icon={faLayerGroup} size="2x" />
      ) : (
        <FontAwesomeIcon icon={faLandmark} size="2x" />
      )}
    </button>
  );
};

export default MarkerButton;
