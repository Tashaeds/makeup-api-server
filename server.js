"use strict";

const PORT = process.env.PORT;
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.get("/", homeHandler);

function homeHandler(req, resp) {
  res.status(200).send("working");
}
// connect my node
mongoose.connect("mongodb://127.0.0.1:27017/makeUp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Collection:Schema and model
//Schema:determine the shape of our data ||blueprint of template for our collection
//Schema is a class in the mongoose packge
const makeUpSchema = new mongoose.Schema({
  makeUpName: String,
  makeUpBrand: String,
  makeUpPrice: String,
  makeUpImageUrl: String,
  makeUpDescriptionProperties: String,
});

//schema: drawing phase
//model: creation phase

//model takes 2 parameters
const makeUpModel = mongoose.model("face", makeUpSchema);
