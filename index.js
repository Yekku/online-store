const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')

const app = express()
const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    isHome: true
  })
})
app.get('/courses', (req, res) => {
  res.render('courses', {
    title: 'Courses',
    isCourses: true
  })
})
app.get('/add', (req, res) => {
  res.render('add', {
    title: 'Add New Course',
    isAdd: true
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})