const path = require('path')
const fs = require('fs/promises')

const filePath = path.join(__dirname, '..', 'data', 'card.json')

class Card {
  static async add(course) {
    const card = await Card.fetch()
    const idx = card.courses.findIndex(c => c.id === course.id)
    const candidate = card.courses[idx]

    if (candidate) {
      candidate.count++
      card.courses[idx] = candidate
    } else {
      course.count = 1
      card.courses.push(course)
    }

    card.price = Card.calculatePrice(card.courses)

    await fs.writeFile(filePath, JSON.stringify(card, null, 2))
  }

  static async fetch() {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  }

  static async remove(id) {
    const card = await Card.fetch()
    const idx = card.courses.findIndex(c => c.id === id)

    if (idx === -1) {
      return card
    }

    const course = card.courses[idx]

    if (course.count === 1) {
      card.courses = card.courses.filter(c => c.id !== id)
    } else {
      card.courses[idx].count--
    }

    card.price = Card.calculatePrice(card.courses)

    await fs.writeFile(filePath, JSON.stringify(card, null, 2))
    return card
  }

  static calculatePrice(courses) {
    return +courses.reduce((acc, c) => acc + c.price * c.count, 0).toFixed(2)
  }
}

module.exports = Card
