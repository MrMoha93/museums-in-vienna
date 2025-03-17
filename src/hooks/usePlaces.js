import { useEffect, useState } from "react";
import { getPlaces } from "../services/PlaceService";

export function usePlaces(limit) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces(limit).then(setPlaces);
  }, [limit]);

  return places;
}
