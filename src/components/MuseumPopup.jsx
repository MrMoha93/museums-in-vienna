import { Popup } from "react-map-gl/mapbox";

const MuseumPopup = ({ selectedMuseum, onClose }) => (
  <Popup
    key={selectedMuseum.properties.id}
    latitude={selectedMuseum.geometry.coordinates[1]}
    longitude={selectedMuseum.geometry.coordinates[0]}
    onClose={onClose}
    closeOnClick={false}
  >
    <div>
      <h1>{selectedMuseum.properties.name}</h1>
      <p className="popup-text">{selectedMuseum.properties.description}</p>
      <p className="popup-text">{selectedMuseum.properties.address}</p>
    </div>
  </Popup>
);

export default MuseumPopup;
