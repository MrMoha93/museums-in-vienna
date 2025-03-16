import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
import museumData from "./data/museum.json";

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 48.2083537,
    longitude: 16.3725042,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });

  const [selectedMuseum, setSelectedMuseum] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedMuseum(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Map
      {...viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => {
        setViewport(evt.viewState);
      }}
    >
      {museumData.features.map((museum) => (
        <Marker
          key={museum.properties.id}
          latitude={museum.geometry.coordinates[1]}
          longitude={museum.geometry.coordinates[0]}
        >
          <button
            className="marker-btn"
            onClick={(e) => {
              e.preventDefault();
              console.log("Museum selected:", museum);
              setSelectedMuseum(museum);
            }}
          >
            <FontAwesomeIcon icon={faLandmark} size="2x" />
          </button>
        </Marker>
      ))}

      {selectedMuseum ? (
        <Popup
          key={selectedMuseum.properties.id}
          latitude={selectedMuseum.geometry.coordinates[1]}
          longitude={selectedMuseum.geometry.coordinates[0]}
          onClose={() => setSelectedMuseum(null)}
          closeOnClick={false}
        >
          <div>
            <h1>{selectedMuseum.properties.name}</h1>
            <p className="popup-text">
              {selectedMuseum.properties.description}
            </p>
            <p className="popup-text">{selectedMuseum.properties.address}</p>
          </div>
        </Popup>
      ) : null}
    </Map>
  );
}
