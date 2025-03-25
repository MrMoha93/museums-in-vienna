import { Popup } from "react-map-gl/mapbox";
import { useFavoriteContext } from "../context/FavoriteContext";
import Favorite from "./Favorite";

export default function PlacePopup({ selectedPlace, onClose }) {
  const { isFavored, toggleFavorite } = useFavoriteContext();

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
        <Favorite
          isFavored={isFavored(selectedPlace.id)}
          onFavor={() => toggleFavorite(selectedPlace.id)}
        />
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
