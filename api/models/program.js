const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: String,
  description: String,
  days: [{
    movements: [{
      name: String,
      amountOfSets: String,
      amountOfReps: String
    }]
  }],
  deletable: Boolean
});

module.exports = mongoose.model('Program', programSchema);