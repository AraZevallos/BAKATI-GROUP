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

mongoose.connect(process.env.CONNECTION_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'eshop'
})
.then(()=>{
  console.log('Database Connection is ready...')
})
.catch((err)=>{
  console.log(err);
})

app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
