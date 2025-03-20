import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { usePlaces } from "../hooks/usePlaces";
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

const PlaceMap = () => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const places = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { clusters, supercluster } = useCluster(places, viewport.zoom);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredResults = places
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

  const handleClickMarker = (e, place) => {
    e.preventDefault();
    setSelectedPlace(place);
  };

  useEscapeKey(() => setSelectedPlace(null));

  return (
    <div className="map-container">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        results={filteredResults}
        onSelect={handleSelectPlace}
      />

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
};

export default PlaceMap;
