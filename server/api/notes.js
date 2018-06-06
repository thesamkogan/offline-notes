const router = require('express').Router()
const { Note } = require('../db/models')
const HttpError = require('../utils/HttpError');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.session.passport.user
      }
    });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// router.get('/notes', (req, res, next) => {
//   console.log('ID, ', req.session.passport.user);
//   Note.findAll({
//     // where: {
//     //   userId: req.session.passport.user
//     // }
//   })
//     .then(note => res.json(note))
//     .catch(next)
// })

// router.post('/notes/add', (req, res, next) => {
//   Note.create(req.body)
// })

// router.delete('/notes/delete', (req, res, next) => {
//   Note.destroy(req.body)
// })
