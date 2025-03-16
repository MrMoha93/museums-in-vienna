import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
import * as museumData from "./data/museum.json";
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
          key={museum.properties.ID}
          latitude={museum.geometry.coordinates[1]}
          longitude={museum.geometry.coordinates[0]}
        >
          <button className="marker-btn">
            <FontAwesomeIcon icon={faLandmark} size="2x" />
          </button>
        </Marker>
      ))}
    </Map>
  );
}
