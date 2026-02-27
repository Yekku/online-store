const express = require('express')
const path = require('path')
const { create } = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')

const app = express()
const hbs = create({
  defaultLayout: 'main',
  extname: 'hbs'
})
const PORT = process.env.PORT || 3000

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Not Found',
    message: 'Page not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('error', {
    title: 'Error',
    message: 'Something went wrong'
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
