import { useMemo, useRef } from "react";
import Supercluster from "supercluster";

const useCluster = (places, zoom) => {
  const supercluster = useRef(new Supercluster({ radius: 50, maxZoom: 16 }));

  const clusters = useMemo(() => {
    if (!places.length) return [];

    if (zoom > 13) {
      return places.map((place) => ({
        type: "Feature",
        properties: { cluster: false, place },
        geometry: { type: "Point", coordinates: [place.lon, place.lat] },
      }));
    }

    supercluster.current.load(
      places.map((place) => ({
        type: "Feature",
        properties: { cluster: false, place },
        geometry: { type: "Point", coordinates: [place.lon, place.lat] },
      }))
    );

    return supercluster.current.getClusters([-180, -85, 180, 85], zoom);
  }, [places, zoom]);

  return { clusters, supercluster };
};

export default useCluster;
