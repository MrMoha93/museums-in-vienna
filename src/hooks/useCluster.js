import { useMemo, useRef } from "react";
import Supercluster from "supercluster";

const useCluster = (museums, zoom) => {
  const supercluster = useRef(new Supercluster({ radius: 50, maxZoom: 16 }));

  const clusters = useMemo(() => {
    if (!museums.length) return [];

    if (zoom > 13) {
      return museums.map((museum) => ({
        type: "Feature",
        properties: { cluster: false, museum },
        geometry: { type: "Point", coordinates: [museum.lon, museum.lat] },
      }));
    }

    supercluster.current.load(
      museums.map((museum) => ({
        type: "Feature",
        properties: { cluster: false, museum },
        geometry: { type: "Point", coordinates: [museum.lon, museum.lat] },
      }))
    );

    return supercluster.current.getClusters([-180, -85, 180, 85], zoom);
  }, [museums, zoom]);

  return { clusters, supercluster };
};

export default useCluster;
