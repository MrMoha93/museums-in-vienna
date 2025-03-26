import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const totalFavorites = favorites.length;
  const [filterFavoriteMuseums, setFilterFavoriteMuseums] = useState(false);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updated);

    const tip = sessionStorage.getItem("tip");

    if (!tip && !favorites.includes(id) && updated.length === 1) {
      toast.info(
        "Tip: To unfavorite a museum, click the star again in the popup. To filter favorite museums, click the star box.",
        { autoClose: 15000 }
      );

      sessionStorage.setItem("tip", "true");
    }
  }

  function isFavored(id) {
    return favorites.includes(id);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavored,
        filterFavoriteMuseums,
        setFilterFavoriteMuseums,
        totalFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavoriteContext() {
  return useContext(FavoriteContext);
}
