const { response } = require("express");
const express = require("express");
const router = express.Router();
const Program = require('../models/program');

// POST a new program
router.post('/', (req, res) => {
  const body = req.body;

  if (body.title === undefined || body.title === '' || body.days === undefined) {
      return res.status(400).json({error: 'some data is missing'});
  }

  const program = new Program({
    title: body.title,
    description: body.description,
    days: body.days,
    deletable: body.deletable || true
  });

  program
    .save()
    .then(savedProgram => {
      res.json(savedProgram)
    });
});

// GET all the programs
router.get('/', (req, res) => {
  Program
    .find({}, {__v: 0})
    .then((programs) => {
      res.json(programs);
    });
});

// GET a single program by id
router.get('/:id', (req, res) => {
  Program
    .findById(req.params.id, {__v: 0})
    .then((program) => {
      res.json(program);
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({ error: 'id does not exist' });
    });
});

router.delete('/delete/:id', (req, res) => {
  Program
    .findByIdAndDelete(req.params.id)
    .then((program) => {
      res.send(`Program titled ${program.title} has been deleted`);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json({ message: error.message });
    });
});

module.exports = router;