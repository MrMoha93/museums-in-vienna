import { Popup } from "react-map-gl/mapbox";

const PlacePopup = ({ selectedPlace, onClose }) => {
  if (!selectedPlace || !selectedPlace.lat || !selectedPlace.lon) {
    return null;
  }

  return (
    <Popup
      latitude={selectedPlace.lat}
      longitude={selectedPlace.lon}
      onClose={onClose}
      closeOnClick={false}
    >
      <div>
        <h1>{selectedPlace.name}</h1>
        <p className="popup-text">{selectedPlace.description}</p>
        <p className="popup-text">
          <p className="popup-text">
            {selectedPlace.address || ""} <br />
            {selectedPlace.housenumber || ""} <br />
            {selectedPlace.postcode || ""}
          </p>
        </p>
        <p className="popup-text">{selectedPlace.opening_hours}</p>
      </div>
    </Popup>
  );
};

export default PlacePopup;
