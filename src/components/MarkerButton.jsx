import "../css/markers.css";

export default function MarkerButton({ place, onSelect }) {
  return (
    <button
      className="marker-btn"
      onClick={(e) => onSelect(e, place)}
      title={place.name}
    >
      <img src="/images/museum.png" alt="museum" className="marker-img" />
    </button>
  );
}
