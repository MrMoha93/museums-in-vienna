import { Popup } from "react-map-gl/mapbox";

const MuseumPopup = ({ selectedMuseum, onClose }) => {
  if (!selectedMuseum) return null;

  return (
    <Popup
      latitude={selectedMuseum.lat}
      longitude={selectedMuseum.lon}
      onClose={onClose}
      closeOnClick={false}
    >
      <div>
        <h1>{selectedMuseum.name}</h1>
        <p className="popup-text">{selectedMuseum.description}</p>
        <p className="popup-text">{selectedMuseum.address}</p>
      </div>
    </Popup>
  );
};

export default MuseumPopup;
