require('dotenv').config()
const mongoose = require('mongoose')
const { CourseModel } = require('./models/course')
const { CardModel } = require('./models/card')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:secret@localhost:27017/online-store?authSource=admin'

const courses = [
  {
    title: 'Angular 8',
    price: 450,
    img: 'https://angular.io/assets/images/logos/angular/angular.svg',
    description: 'Learn Angular 8 from scratch. Build reactive single-page applications with TypeScript, components, services, and RxJS.',
  },
  {
    title: 'Vue JS',
    price: 550,
    img: 'https://cdn.jsdelivr.net/gh/vuejs/art@master/logo.png',
    description: 'Master Vue.js and its ecosystem. Covers Vue Router, Vuex state management, Composition API, and building modern web apps.',
  },
  {
    title: 'NestJs',
    price: 600,
    img: 'https://nestjs.com/img/logo-small.svg',
    description: 'Build scalable server-side applications with NestJS. Learn modules, controllers, providers, middleware, and database integration.',
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    await CourseModel.deleteMany({})
    await CardModel.deleteMany({})

    const inserted = await CourseModel.insertMany(courses)
    console.log(`Seeded ${inserted.length} courses`)

    await CardModel.create({ courses: [], price: 0 })
    console.log('Created empty card')

    await mongoose.disconnect()
    console.log('Seed complete')
  } catch (e) {
    console.error('Seed failed:', e.message)
    process.exit(1)
  }
}

seed()
