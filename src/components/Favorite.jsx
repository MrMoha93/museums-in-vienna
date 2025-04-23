import "../css/favorite.css";

export default function Favorite({ isFavored, onFavor }) {
  let classes = "clickable fa-star fa-";
  classes += isFavored ? "solid favored" : "regular";

  return <i className={classes} onClick={onFavor} />;
}
