const { Schema, model } = require('mongoose')

const courseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  description: { type: String, default: '' },
})

const CourseModel = model('Course', courseSchema)

function toPlain(doc) {
  if (!doc) return null
  const obj = doc.toObject()
  obj.id = obj._id.toString()
  delete obj._id
  delete obj.__v
  return obj
}

class Course {
  constructor(title, price, img, description) {
    this._doc = new CourseModel({ title, price, img, description })
  }

  async save() {
    await this._doc.save()
  }

  toJSON() {
    return toPlain(this._doc)
  }

  static async getAll() {
    const courses = await CourseModel.find()
    return courses.map(toPlain)
  }

  static async getById(id) {
    const course = await CourseModel.findById(id)
    return toPlain(course)
  }

  static async update(course) {
    const { id, ...data } = course
    const result = await CourseModel.findByIdAndUpdate(id, data, { new: true })
    if (!result) {
      throw new Error('Course not found')
    }
  }
}

module.exports = Course
module.exports.CourseModel = CourseModel
