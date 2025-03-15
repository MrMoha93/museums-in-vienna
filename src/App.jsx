import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import Map from "react-map-gl/mapbox";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 48.2083537,
    longitude: 16.3725042,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  return (
    <Map
      {...viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => {
        setViewport(evt.viewState);
      }}
    />
  );
}
