import "../css/search-box.css";

export default function ThreeDButton({ onClick }) {
  return (
    <button className="search-icon-btn" onClick={onClick}>
      <i className="fa-brands fa-unity" />
    </button>
  );
}
