import React, { useEffect, useState, useRef, useCallback } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { usePlaces } from "../hooks/usePlaces";
import { toast } from "react-toastify";
import { useFavoriteContext } from "../context/FavoriteContext";
import { throttle } from "lodash";
import PlacePopup from "./PlacePopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";
import useCluster from "../hooks/useCluster";
import ClusterMarker from "./ClusterMarker";
import SearchBox from "./SearchBox";

const MAPBOX_STYLE = "mapbox://styles/mrmoha93/cm8atl45u00g301s38xt54b7g";
const INITIAL_VIEWPORT = {
  latitude: 48.2083537,
  longitude: 16.3725042,
  width: "100vw",
  height: "100vh",
  zoom: 13,
};

export default function PlaceMap() {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const places = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [is3D, setIs3D] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    favorites,
    filterFavoriteMuseums,
    setFilterFavoriteMuseums,
    totalFavorites,
  } = useFavoriteContext();

  const mapRef = useRef();

  const handleMove = useCallback(
    throttle((evt) => {
      setViewport(evt.viewState);
    }, 50),
    []
  );

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
    setSearchTerm("");

    mapRef.current?.flyTo({
      center: [place.lon, place.lat],
      zoom: 16,
      pitch: is3D ? 40 : 0,
      bearing: is3D ? 100 : 0,
      duration: 1000,
      essential: true,
    });
  };

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.easeTo({
      pitch: is3D ? 30 : 0,
      bearing: is3D ? 0 : 0,
      duration: 500,
    });
  }, [is3D]);

  useEffect(() => {
    if (filterFavoriteMuseums && favorites.length === 0) {
      setFilterFavoriteMuseums(false);
    }
  }, [favorites, filterFavoriteMuseums]);

  useEffect(() => {
    if (places.length > 0) {
      setIsLoading(false);
    }
  }, [places]);

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

  const toggle3D = () => {
    setIs3D((prev) => !prev);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
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
            onToggle3D={toggle3D}
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
        ref={mapRef}
        viewState={viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        mapStyle={MAPBOX_STYLE}
        onMove={handleMove}
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
