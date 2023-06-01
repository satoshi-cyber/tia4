type Position = { lat: number; lng: number };

const toRad = (number: number) => {
  return (number * Math.PI) / 180;
};

const distance = (position1: Position, position2: Position) => {
  const lat1 = position1.lat;
  const lat2 = position2.lat;
  const lng1 = position1.lng;
  const lng2 = position2.lng;
  const R = 6371000;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lng2 - lng1);
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const findNearestLocation = <T extends Position>(
  latLng: Position,
  locations: Array<T>
) => {
  let closestDistance = distance(latLng, locations[0]);
  let closest = locations[0];
  for (let i = 1; i < locations.length; i++) {
    const dis = distance(locations[i], latLng);
    if (dis < closestDistance) {
      closestDistance = dis;
      closest = locations[i];
    }
  }
  return {
    location: closest,
    distance: closestDistance,
  };
};
