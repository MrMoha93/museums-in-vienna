import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { usePlaces } from "../hooks/usePlaces";
import PlacePopup from "./PlacePopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";
import useCluster from "../hooks/useCluster";
import ClusterMarker from "./ClusterMarker";

const PlaceMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 48.2083537,
    longitude: 16.3725042,
    width: "100vw",
    height: "100vh",
    zoom: 14,
  });

  const places = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { clusters, supercluster } = useCluster(places, viewport.zoom);
  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
  };
  useEscapeKey(() => setSelectedPlace(null));

  return (
    <Map
      initialViewState={viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
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
              onSelect={(e) => {
                e.preventDefault();
                handleSelectPlace(cluster.properties.place);
              }}
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
  );
};

export default PlaceMap;
