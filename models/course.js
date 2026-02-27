const crypto = require('crypto')
const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, '..', 'data', 'courses.json')

class Course {
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img
    this.id = crypto.randomUUID()
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    }
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJSON())
    await fs.writeFile(filePath, JSON.stringify(courses, null, 2))
  }

  static async getAll() {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  }

  static async getById(id) {
    const courses = await Course.getAll()
    return courses.find(c => c.id === id)
  }

  static async update(course) {
    const courses = await Course.getAll()
    const idx = courses.findIndex(c => c.id === course.id)
    if (idx === -1) {
      throw new Error('Course not found')
    }
    courses[idx] = course
    await fs.writeFile(filePath, JSON.stringify(courses, null, 2))
  }
}

module.exports = Course
