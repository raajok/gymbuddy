const { response } = require("express");
const express = require("express");
const router = express.Router();
const Training = require('../models/training');

// POST a new training session
router.post('/', (req, res) => {
  const body = req.body;

  if (body.day == undefined || body.date == undefined || body.movements[0] == undefined) {
    return res.status(400).json({ error: 'some data is missing' });
  }

  const training = new Training({
    program: body.program,
    day: body.day,
    date: body.date,
    movements: body.movements
  });

  training
    .save()
    .then(savedTraining => {
      res.json(savedTraining);
    });
});

// GET all the training sessions
router.get('/', (req, res) => {
  Training
    .find({}, {__v: 0})
    .then((trainings) => {
      res.json(trainings);
    });
});

module.exports = router;