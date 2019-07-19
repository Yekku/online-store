const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')

const app = express()
const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
const PORT = process.env.PORT || 3000

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})