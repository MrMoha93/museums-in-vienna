import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import MuseumPopup from "./MuseumPopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";
import { useMuseums } from "../hooks/useMuseums";
import useCluster from "../hooks/useCluster";

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

  useEscapeKey(() => setSelectedMuseum(null));

  const handleSelectMuseum = (museum) => {
    setSelectedMuseum(museum);
  };

  const { clusters, supercluster } = useCluster(museums, viewport.zoom);

  return (
    <Map
      initialViewState={viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <button
                className="cluster-btn"
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.current.getClusterExpansionZoom(cluster.id),
                    16
                  );
                  setViewport({
                    ...viewport,
                    zoom: expansionZoom,
                    latitude,
                    longitude,
                  });
                }}
              >
                {pointCount}
              </button>
            </Marker>
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
