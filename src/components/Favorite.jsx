export default function Favorite({ isFavored, onFavor }) {
  let classes = "clickable fa-star fa-";
  classes += isFavored ? "solid" : "regular";

  return <i className={classes} onClick={onFavor} />;
}
