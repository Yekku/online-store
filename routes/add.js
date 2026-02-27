const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add New Course',
    isAdd: true,
  });
});

router.post('/', async (req, res) => {
  try {
    const { title, price, img } = req.body;

    if (!title || !price || !img) {
      return res.status(400).redirect('/add');
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).redirect('/add');
    }

    const course = new Course(title.trim(), parsedPrice, img.trim());
    await course.save();
    res.redirect('/courses');
  } catch (e) {
    console.error('Error adding course:', e);
    res.status(500).render('error', { title: 'Error', message: 'Failed to add course' });
  }
});

module.exports = router;
