import axios from "axios";

const API_URL = "https://overpass-api.de/api/interpreter";

export async function getMuseums(limit = 10) {
  const query = `
    [out:json][timeout:25];
    area(id:3600109166)->.searchArea;
    nwr["tourism"="museum"](area.searchArea);
    out geom;
  `;

  const res = await axios.get(`${API_URL}?data=${encodeURIComponent(query)}`);

  return res.data.elements
    .map((element) => ({
      id: element.id,
      name: element.tags.name,
      address: element.tags["addr:street"],
      description: element.tags["description:en"],
      lat: element.lat,
      lon: element.lon,
    }))
    .filter(
      (museum) =>
        museum.description &&
        museum.description.length >= 10 &&
        !isNaN(museum.lat) &&
        !isNaN(museum.lon)
    )
    .slice(0, limit);
}
