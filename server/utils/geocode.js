const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Obtains coordinates for first result mathcing the provided address or an empty array if not match found.
 * @param {String} street
 * @param {String} city
 * @param {String} state
 * @param {String} zip
 * @returns {Array} Array containing [longitude, latitude]
 */
const getGeocodeFromAddress = async (street, city, state, zip = '') => {

  const urlEncoodedAddress = encodeURIComponent(`${street}, ${city}, ${state} ${zip}`);

  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlEncoodedAddress}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

  const response = await fetch(endpoint);

  if (response.ok) {
    const data = await response.json();
    if (data.features.length === 0) {
      // no results found
      return [];
    }
    return data.features[0].geometry.coordinates;
  }
};

/**
 * Iterates through the provided data and adds latitute and longitude coordinates
 * Currently uses city and state only.
 * @param {Array} data Array of objects containing street, city and state attributes
 */
const geoCodeInitialData = async (data) => {
  const geocodesPromises = data.map(city => getGeocodeFromAddress('', city.city, city.state));

  const coordinates = await Promise.all(geocodesPromises);

  await Promise.all(data.map((city, i) => {
    const [longitude, latitude] = coordinates[i];
    fetch(`http://localhost:3001/chapters/${city.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...city,
        latitude,
        longitude,
      })
    });
  }));

};

module.exports = getGeocodeFromAddress;
