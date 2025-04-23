import "../css/search-box.css";

export default function ThreeDButton({ onClick, is3D }) {
  return (
    <button className="ThreeD-icon-btn" onClick={onClick}>
      <span className="ThreeD-badge">{is3D ? "2D" : "3D"}</span>
      <i className="fa-brands fa-unity" />
    </button>
  );
}
