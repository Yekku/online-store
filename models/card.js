const path = require('path')
const fs = require('fs');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'card.json'
)

class Card {
  static async add(course) {
    const card = await Card.fetch();
    const idx = card.courses.findIndex(c => c.id === course.id);
    const condidate = card.courses[idx];
    if (condidate) {
      // Course already in card
      condidate.count++;
      card.courses[idx] = condidate;
    } else {
      // Course need add
      course.count = 1;
      card.courses.push(course);
    }
    card.price += +course.price;
    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(c => c.id === id);
    const course = card.courses[idx];

    if (course.count === 1) {
      // delete
      card.courses = card.courses.filter(c => c.id !== id);
    } else {
      // edit count
      card.courses[idx].count--;
    }

    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }
}
module.exports = Card 