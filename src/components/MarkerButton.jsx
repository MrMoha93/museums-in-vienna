export default function MarkerButton({ place, onSelect }) {
  return (
    <button className="marker-btn" onClick={(e) => onSelect(e, place)}>
      <img src="/images/museum.png" alt="museum" className="marker-img" />
    </button>
  );
}
