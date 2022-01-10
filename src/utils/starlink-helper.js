export const handleStarlinksData = (starlinks, office) => {
  const filteredData = filterNullValues(starlinks);

  return findClosestStarlink(filteredData, office);
};

export const filterNullValues = (starlinks) => {
  let data = starlinks.flat().filter((starlink) => {
    return starlink.longitude != null && starlink.latitude != null;
  });

  return data;
};

const findClosestStarlink = (starlinks, { latitude, longitude }) => {
  let min = Number.MAX_VALUE;

  let index = 0;

  starlinks.forEach((starlink, i) => {
    let distance = haversineFormula(
      starlink.latitude,
      starlink.longitude,
      latitude,
      longitude
    );

    if (distance < min) {
      min = distance;
      index = i;
    }
  });

  return [starlinks[index], min];
};

export const haversineFormula = (lat1, lon1, lat2, lon2) => {
  var earthRadius = 6371;
  var latitudeDistance = degreesToRadians(lat2 - lat1);
  var longitudeDistance = degreesToRadians(lon2 - lon1);

  var a =
    Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(longitudeDistance / 2) *
      Math.sin(longitudeDistance / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distance = earthRadius * c;

  return distance;
};

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
