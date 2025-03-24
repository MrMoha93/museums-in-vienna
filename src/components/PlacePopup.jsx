import { Popup } from "react-map-gl/mapbox";
import Favorite from "./Favorite";
import useFavorites from "../hooks/useFavorites";

export default function PlacePopup({ selectedPlace, onClose }) {
  const { isFavored, toggleFavorite } = useFavorites(selectedPlace.id);

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
        <h3>{selectedPlace.name}</h3>
        <Favorite isFavored={isFavored} onFavor={toggleFavorite} />
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
}
