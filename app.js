const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')
const restaurants = require('./public/jsons/restaurant.json').results


app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('index', { restaurants: restaurants })
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  res.render('`introduction of restaurants:${id}`')
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
