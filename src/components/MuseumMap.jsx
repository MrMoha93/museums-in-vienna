import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import MuseumPopup from "./MuseumPopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";
import { useMuseums } from "../hooks/useMuseums";
import Supercluster from "supercluster";
import { useRef, useMemo } from "react";

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

  const mapRef = useRef(null);
  const supercluster = useRef(new Supercluster({ radius: 50, maxZoom: 16 }));

  const handleSelectMuseum = (museum) => {
    setSelectedMuseum(museum);
  };

  const clusters = useMemo(() => {
    if (!museums.length) return [];

    supercluster.current.load(
      museums.map((museum) => ({
        type: "Feature",
        properties: { cluster: false, museum },
        geometry: { type: "Point", coordinates: [museum.lon, museum.lat] },
      }))
    );

    return supercluster.current.getClusters(
      [16.18, 48.1, 16.58, 48.32],
      viewport.zoom
    );
  }, [museums, viewport.zoom]);

  return (
    <Map
      ref={mapRef}
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
