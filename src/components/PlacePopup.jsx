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
        <h2>{selectedPlace.name}</h2>
        <p className="popup-heading">Description:</p>
        <p className="popup-text">{selectedPlace.description || "Unknown"}</p>
        <p className="popup-heading">Address:</p>
        <p className="popup-text">
          {selectedPlace.address || "Unknown"} <br />
          {selectedPlace.housenumber || ""} <br />
          {selectedPlace.postcode || ""}
        </p>
        <p className="popup-heading">Opening Hours:</p>
        <p className="popup-text">{selectedPlace.opening_hours || "Unknown"}</p>
      </div>
    </Popup>
  );
};

export default PlacePopup;
