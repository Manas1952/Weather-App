const request = require('postman-request')

const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFuYXMwMDEiLCJhIjoiY2wwMHcwaDkwMDEzMjNkcDd2bDZjdXM0NiJ9.NmDUK8xS4MzXA7TLMOQXfQ&limit=1'
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Connectivity error', undefined)
    } else if (body.features.length === 0) {
      callback('Could not find your location', undefined)
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name
      }
      callback(undefined, data)
    }
  })
}

module.exports = geoCode