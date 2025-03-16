import { useEffect, useState } from "react";
import { getMuseums } from "../services/museumService";

export function useMuseums(limit) {
  const [museums, setMuseums] = useState([]);

  useEffect(() => {
    getMuseums(limit).then(setMuseums);
  }, [limit]);

  return museums;
}
