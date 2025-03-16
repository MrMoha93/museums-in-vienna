import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import MuseumPopup from "./MuseumPopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";
import museumData from "../data/museum.json";

const MuseumMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 48.2083537,
    longitude: 16.3725042,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });

  const [selectedMuseum, setSelectedMuseum] = useState(null);

  useEscapeKey(() => setSelectedMuseum(null));

  const handleSelectMuseum = (e, museum) => {
    e.preventDefault();
    console.log("Museum selected:", museum);
    setSelectedMuseum(museum);
  };

  return (
    <Map
      {...viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {museumData.features.map((museum) => (
        <Marker
          key={museum.properties.id}
          latitude={museum.geometry.coordinates[1]}
          longitude={museum.geometry.coordinates[0]}
        >
          <MarkerButton museum={museum} onSelect={handleSelectMuseum} />
        </Marker>
      ))}

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
