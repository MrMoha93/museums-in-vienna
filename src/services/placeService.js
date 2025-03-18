import axios from "axios";

const API_URL = "https://overpass-api.de/api/interpreter";

export async function getPlaces() {
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
      housenumber: element.tags["addr:housenumber"],
      postcode: element.tags["addr:postcode"],
      description: element.tags["description:en"],
      opening_hours: element.tags.opening_hours,
      lat: element.lat,
      lon: element.lon,
    }))
    .filter(
      (place) =>
        place.address &&
        place.address.length > 1 &&
        !isNaN(place.lat) &&
        !isNaN(place.lon)
    );
}
