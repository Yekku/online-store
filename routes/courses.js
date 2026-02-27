const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.getAll();
    res.render('courses', {
      title: 'Courses',
      isCourses: true,
      courses
    });
  } catch (e) {
    console.error('Error fetching courses:', e);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load courses' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.getById(req.params.id);
    if (!course) {
      return res.status(404).render('error', { title: 'Not Found', message: 'Course not found' });
    }
    res.render('course', {
      layout: 'empty',
      title: `Course ${course.title}`,
      course
    });
  } catch (e) {
    console.error('Error fetching course:', e);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load course' });
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { id, title, price, img } = req.body;

    if (!id || !title || !price || !img) {
      return res.status(400).redirect('/courses');
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).redirect(`/courses/${id}/edit?allow=true`);
    }

    await Course.update({ id, title: title.trim(), price: parsedPrice, img: img.trim() });
    res.redirect(`/courses/${id}`);
  } catch (e) {
    console.error('Error updating course:', e);
    res.status(500).render('error', { title: 'Error', message: 'Failed to update course' });
  }
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }
  try {
    const course = await Course.getById(req.params.id);
    if (!course) {
      return res.status(404).render('error', { title: 'Not Found', message: 'Course not found' });
    }
    res.render('edit-course', {
      title: `Edit ${course.title}`,
      course
    });
  } catch (e) {
    console.error('Error loading edit page:', e);
    res.status(500).render('error', { title: 'Error', message: 'Failed to load edit page' });
  }
});

module.exports = router;
