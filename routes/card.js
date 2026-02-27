const { Router } = require('express');
const Course = require('../models/course');
const Card = require('../models/card');
const router = Router();

router.post('/add', async (req, res) => {
  try {
    const course = await Course.getById(req.body.id);
    if (!course) {
      return res.status(404).redirect('/courses');
    }
    await Card.add(course);
    res.redirect('/card');
  } catch (e) {
    console.error('Error adding to card:', e);
    res.status(500).render('error', { title: 'Error', message: 'Failed to add to card' });
  }
});

router.get('/', async (req, res) => {
  try {
    const card = await Card.fetch();
    res.render('card', {
      title: 'Card',
      isCard: true,
      courses: card.courses,
      price: card.price
    });
  } catch (e) {
    console.error('Error fetching card:', e);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load card' });
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const card = await Card.remove(req.params.id);
    res.status(200).json(card);
  } catch (e) {
    console.error('Error removing from card:', e);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

module.exports = router;
