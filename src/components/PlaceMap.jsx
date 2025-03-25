import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { usePlaces } from "../hooks/usePlaces";
import { toast } from "react-toastify";
import { useFavoriteContext } from "../context/FavoriteContext";
import PlacePopup from "./PlacePopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";
import useCluster from "../hooks/useCluster";
import ClusterMarker from "./ClusterMarker";
import SearchBox from "./SearchBox";

const MAPBOX_STYLE = "mapbox://styles/mrmoha93/cm8erl55o00v401qrgcd82s9o";
const INITIAL_VIEWPORT = {
  latitude: 48.2083537,
  longitude: 16.3725042,
  width: "100vw",
  height: "100vh",
  zoom: 14,
};

export default function PlaceMap() {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const places = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const {
    favorites,
    filterFavoriteMuseums,
    setFilterFavoriteMuseums,
    totalFavorites,
  } = useFavoriteContext();

  const visiblePlaces = filterFavoriteMuseums
    ? places.filter((place) => favorites.includes(place.id))
    : places;

  const { clusters, supercluster } = useCluster(visiblePlaces, viewport.zoom);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = visiblePlaces
    .filter((place) =>
      place.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setViewport((prev) => ({
      ...prev,
      latitude: place.lat,
      longitude: place.lon,
      zoom: 15,
    }));
    setSearchTerm("");
  };

  useEffect(() => {
    if (filterFavoriteMuseums && favorites.length === 0) {
      setFilterFavoriteMuseums(false);
    }
  }, [favorites, filterFavoriteMuseums]);

  const handleClickMarker = (e, place) => {
    e.preventDefault();
    setSelectedPlace(place);
  };

  const handleFavoriteToggle = () => {
    const currentFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (!filterFavoriteMuseums && currentFavorites.length === 0) {
      toast.error("You haven't saved any museums as favorites.");
      return;
    }

    setFilterFavoriteMuseums((prev) => !prev);
  };

  useEscapeKey(() => setSelectedPlace(null));

  function isAnyFavorite() {
    return favorites.length > 0;
  }

  return (
    <div className="map-container">
      <div className="top-bar">
        <div className="search-star-wrapper">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            results={filteredResults}
            onSelect={handleSelectPlace}
          />
          <div className="star-box" onClick={handleFavoriteToggle}>
            <i
              className={
                isAnyFavorite() ? "fa-solid fa-star" : "fa-regular fa-star"
              }
            />
            {totalFavorites > 0 && (
              <span className="favorite-badge">{totalFavorites}</span>
            )}
          </div>
        </div>
      </div>
      <Map
        viewState={viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        mapStyle={MAPBOX_STYLE}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${cluster.id}`}
                cluster={cluster}
                supercluster={supercluster}
                viewport={viewport}
                setViewport={setViewport}
              />
            );
          }
          return (
            <Marker
              key={cluster.properties.place.id}
              longitude={longitude}
              latitude={latitude}
            >
              <MarkerButton
                place={cluster.properties.place}
                onSelect={(e, place) => handleClickMarker(e, place)}
              />
            </Marker>
          );
        })}
        {selectedPlace && (
          <PlacePopup
            selectedPlace={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </Map>
    </div>
  );
}
