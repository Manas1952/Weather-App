const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=a3a090540c3ad9b32078ab77381c1619&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Connectivity error', undefined)
    } else if (body.error) {
      callback('Could not find your location', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions + '. ' + 'It is currently ' + body.current.temperature + ' and it feels like ' + body.current.feelslike + '.')
    }
  })
}
// 23.0162011,72.5091623
module.exports = forecast