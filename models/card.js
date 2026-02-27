const { Schema, model } = require('mongoose')

const cardItemSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  count: { type: Number, required: true, default: 1 },
}, { _id: false })

const cardSchema = new Schema({
  courses: [cardItemSchema],
  price: { type: Number, default: 0 },
})

const CardModel = model('Card', cardSchema)

class Card {
  static async _getOrCreate() {
    let card = await CardModel.findOne()
    if (!card) {
      card = await CardModel.create({ courses: [], price: 0 })
    }
    return card
  }

  static _formatCard(card) {
    const obj = card.toObject()
    obj.courses = obj.courses.map(c => ({
      id: c.courseId.toString(),
      title: c.title,
      price: c.price,
      img: c.img,
      count: c.count,
    }))
    delete obj._id
    delete obj.__v
    return obj
  }

  static async add(course) {
    const card = await Card._getOrCreate()
    const idx = card.courses.findIndex(
      c => c.courseId.toString() === course.id
    )

    if (idx !== -1) {
      card.courses[idx].count++
    } else {
      card.courses.push({
        courseId: course.id,
        title: course.title,
        price: course.price,
        img: course.img,
        count: 1,
      })
    }

    card.price = Card.calculatePrice(card.courses)
    await card.save()
  }

  static async fetch() {
    const card = await Card._getOrCreate()
    return Card._formatCard(card)
  }

  static async remove(id) {
    const card = await Card._getOrCreate()
    const idx = card.courses.findIndex(
      c => c.courseId.toString() === id
    )

    if (idx === -1) {
      return Card._formatCard(card)
    }

    if (card.courses[idx].count === 1) {
      card.courses.splice(idx, 1)
    } else {
      card.courses[idx].count--
    }

    card.price = Card.calculatePrice(card.courses)
    await card.save()
    return Card._formatCard(card)
  }

  static calculatePrice(courses) {
    return +courses.reduce((acc, c) => acc + c.price * c.count, 0).toFixed(2)
  }
}

module.exports = Card
module.exports.CardModel = CardModel
