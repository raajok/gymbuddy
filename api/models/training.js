const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  day: String,
  date: String,
  movements: [{
    name: String,
    sets: [{
      weight: String,
      amountOfReps: String
    }]
  }]
});

module.exports = mongoose.model('Training', trainingSchema);