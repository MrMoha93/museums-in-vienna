import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { getMuseums } from "../services/museumService";
import MuseumPopup from "./MuseumPopup";
import MarkerButton from "./MarkerButton";
import useEscapeKey from "../hooks/useEscapeKey";

const MuseumMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 48.2083537,
    longitude: 16.3725042,
    width: "100vw",
    height: "100vh",
    zoom: 14,
  });

  const [museums, setMuseums] = useState([]);
  const [selectedMuseum, setSelectedMuseum] = useState(null);

  useEscapeKey(() => setSelectedMuseum(null));

  useEffect(() => {
    getMuseums(10).then(setMuseums);
  }, []);

  const handleSelectMuseum = (e, museum) => {
    e.preventDefault();
    setSelectedMuseum(museum);
  };

  return (
    <Map
      {...viewport}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {museums.map((museum) => (
        <Marker key={museum.id} latitude={museum.lat} longitude={museum.lon}>
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
