"use strict";

const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.get("/", homeHandler);
app.get("/product", getMakeUpHandler);
app.post("/product", addMakeUpHandler);
app.put("/product/:id", updateProductHandler);
app.delete("/product/:id", deleteProductHandler);

function homeHandler(req, res) {
  res.status(200).send("working");
}

async function getMakeUpHandler(req, res) {
  let allMakeup = await makeUpModel.find({}); //array: get all makeup
  res.send(allMakeup);
}

// localhost:3001/cat >> POST
async function addMakeUpHandler(req, res) {
  console.log(req.body);
  //   const makeUpName = req.body.makeUpName2;
  //   const makeUpBrand = req.body.makeUpBrand2;
  //   const makeUpPrice = req.body.makeUpPrice2;
  const { makeUpBrand, makeUpName, makeUpPrice } = req.body;
  let newMakeUp = await makeUpModel.create({
    makeUpBrand,
    makeUpName,
    makeUpPrice,
  });
  res.send(newMakeUp);

  // let allMakeUp = await makeUpModel.find({});
  // res.send(allMakeUp);
}

async function updateProductHandler(req, res) {
  console.log(req.params);
  console.log(req.body);
  const { makeUpBrand, makeUpName, makeUpPrice } = req.body;
  const { id } = req.params;
  const udpatedProduct = await makeUpModel.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      makeUpBrand,
      makeUpName,
      makeUpPrice,
    }
  );
  let allMakeUp = await makeUpModel.find({});
  res.send(allMakeUp);
}

async function deleteProductHandler(req, res) {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;
  const deleteproduct = await makeUpModel.findByIdAndDelete({
    _id: id,
  });
  let allMakeUp = await makeUpModel.find({});
  res.send(allMakeUp);
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
  makeUpPrice: Number,
});

//schema: drawing phase
//model: creation phase

//model takes 2 parameters
const makeUpModel = mongoose.model("face", makeUpSchema); // collection called faces

//seed our database
function seedMakeUpCollection() {
  const lippy = new makeUpModel({
    makeUpName: "lippy",
    makeUpBrand: "loreal",
    makeUpPrice: 5,
  });
  const lipgloss = new makeUpModel({
    makeUpName: "lipgloss",
    makeUpBrand: "loreal",
    makeUpPrice: 5,
  });
  const eyeshawdow = new makeUpModel({
    makeUpName: "eyeshawdow",
    makeUpBrand: "maybelline",
    makeUpPrice: 6,
  });

  const mascara = new makeUpModel({
    makeUpName: "mascara",
    makeUpBrand: "glam",
    makeUpPrice: 5,
  });

  lippy.save();
  lipgloss.save();
  mascara.save();
  eyeshawdow.save();
}
//seedMakeUpCollection();
