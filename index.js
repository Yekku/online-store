const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')

const app = express()
const hbs = exhbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})
const PORT = process.env.PORT || 3000

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})