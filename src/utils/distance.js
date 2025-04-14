export function calculateDistanceToCenter(placeLat, placeLon) {
  const centerLat = 48.2086;
  const centerLon = 16.3714;
  const earthRadius = 6371;

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  const latDifference = toRadians(centerLat - placeLat);
  const lonDifference = toRadians(centerLon - placeLon);

  const distancePart =
    Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
    Math.cos(toRadians(placeLat)) *
      Math.cos(toRadians(centerLat)) *
      Math.sin(lonDifference / 2) *
      Math.sin(lonDifference / 2);

  const angle =
    2 * Math.atan2(Math.sqrt(distancePart), Math.sqrt(1 - distancePart));
  const distance = earthRadius * angle;

  return distance.toFixed(1);
}
