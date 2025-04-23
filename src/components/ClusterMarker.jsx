import "../css/markers.css";
import React from "react";
import { Marker } from "react-map-gl/mapbox";

export default function ClusterMarker({ cluster }) {
  const [longitude, latitude] = cluster.geometry.coordinates;
  const { point_count: pointCount } = cluster.properties;

  return (
    <Marker longitude={longitude} latitude={latitude}>
      <div className="cluster-marker">{pointCount}</div>
    </Marker>
  );
}
