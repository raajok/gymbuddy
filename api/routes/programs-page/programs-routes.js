const express = require("express");
const router = express.Router();
const Program = require('../../models/program');

router.post('/', (req, res) => {
  const body = req.body;

  if (body.title === undefined || body.days === undefined) {
      return res.status(400).json({error: 'data missing'});
  }

  const program = new Program({
    title: body.title,
    description: body.description,
    days: body.days,
    deletable: body.deletable || false
  });

  program
    .save()
    .then(savedProgram => {
      res.json(savedProgram)
    });
});

module.exports = router;