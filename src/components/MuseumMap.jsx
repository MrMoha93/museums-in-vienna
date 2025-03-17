import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { useMuseums } from "../hooks/useMuseums";
import MuseumPopup from "./MuseumPopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";
import useCluster from "../hooks/useCluster";
import ClusterMarker from "./ClusterMarker";

const MuseumMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 48.2083537,
    longitude: 16.3725042,
    width: "100vw",
    height: "100vh",
    zoom: 14,
  });

  const museums = useMuseums();
  const [selectedMuseum, setSelectedMuseum] = useState(null);
  const { clusters, supercluster } = useCluster(museums, viewport.zoom);
  const handleSelectMuseum = (museum) => {
    setSelectedMuseum(museum);
  };
  useEscapeKey(() => setSelectedMuseum(null));

  return (
    <Map
      initialViewState={viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
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
            key={cluster.properties.museum.id}
            longitude={longitude}
            latitude={latitude}
          >
            <MarkerButton
              museum={cluster.properties.museum}
              onSelect={(e) => {
                e.preventDefault();
                handleSelectMuseum(cluster.properties.museum);
              }}
            />
          </Marker>
        );
      })}

      {selectedMuseum && (
        <MuseumPopup
          selectedMuseum={selectedMuseum}
          onClose={() => setSelectedMuseum(null)}
        />
      )}
    </Map>
  );
};

export default MuseumMap;
