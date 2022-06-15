const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require("dotenv/config");

const api = process.env.API_URL;

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//http://localhost:3000/api/v1/products
app.get("/", (req, res) => {
  res.send("hello API!");
});

mongoose.connect('mongodb+srv://bakati:vHsyvTUwL9aE9BhV@cluster0.5muzak8.mongodb.net/?retryWrites=true&w=majority')

app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
