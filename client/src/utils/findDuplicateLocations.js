const findDuplicateLocations = (objects) => {
  const locations = new Array();

  objects.forEach((object) => {
    const location = locations.find(
      (location) =>
        location.longitude === object.longitude &&
        location.latitude === object.latitude
    );

    if (location) {
      location.objects.push(object);
    } else {
      const newLocation = {
        longitude: object.longitude,
        latitude: object.latitude,
        objects: [object],
      };

      locations.push(newLocation);
    }
  });

  return locations;
};

export default findDuplicateLocations;
