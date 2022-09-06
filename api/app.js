require('dotenv').config();
var express = require('express');
var cors = require("cors");
var mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

var app = express();

app.use(cors());
app.use(express.json());

var testAPIRouter = require("./routes/testAPI");

// testing API connection
app.use("/testAPI", testAPIRouter);

app.listen(9000, () => {
  console.log(`Server started at ${9000}`);
});