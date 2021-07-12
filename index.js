const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const productRouter = require('./products.router.js');
const cartRouter = require('./cart.router.js');

app.use(cors());
app.use("/products",productRouter);
app.use("/cart",cartRouter);


app.get('/', (req, res) => {
  res.send("This server is running. Hello World!")
});


app.listen(3000, () => {
  console.log('server started');
});