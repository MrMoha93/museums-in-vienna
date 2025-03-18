import { useEffect, useState } from "react";
import { getPlaces } from "../services/placeService";

export function usePlaces() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then(setPlaces);
  }, []);

  return places;
}
