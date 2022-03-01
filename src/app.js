const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const path = require('path')

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')
const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Manas Purohit'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather',
    author: 'Manas Purohit'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather',
    author: 'Manas Purohit',
    helpText: 'This is some helpful text.'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Weather',
    author: 'Manas Purohit',
    errorMessage: 'Help article not found!'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide address'
    })
  }
  geoCode(req.query.address, (err, { latitude, longitude, place } = {}) => {
    if(err) {
      return res.send({error: err})
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({error: err})
      }
      res.send({ place, forecastData })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Weather',
    author: 'Manas Purohit',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up!')
})