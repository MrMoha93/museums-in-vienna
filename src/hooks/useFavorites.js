import { useEffect, useState } from "react";

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function setFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export default function useFavorites(id) {
  const [isFavored, setIsFavored] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavored(favorites.includes(id));
  }, [id]);

  function toggleFavorite() {
    const favorites = getFavorites();
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    setIsFavored(updated.includes(id));
  }

  return { isFavored, toggleFavorite };
}
