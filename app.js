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
  const search = req.query.search?.trim();
  const matchedRestaurants = search ? restaurants.filter((restaurant) =>
    Object.values(restaurant).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    })
  ) : restaurants;

  res.render('index', { restaurants: matchedRestaurants, search });
});

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((y) => y.id.toString() === id)
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
