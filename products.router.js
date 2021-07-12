const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());


let productPostIdCounter = 1234;
const products = [
  {id:123, name:"shoes", price:1500},
  {id:124, name:"shirt", price:1200},
]

router.route('/')
.get((req, res) => {
  res.json({success: true, products});
})
.post((req, res) => {
  const {id, name ,price} = req.body;
  products.push({id:productPostIdCounter++ , name, price});
  res.send({success: true, products});
})


router.route('/:id')
.get((req, res) => {
  const {id} = req.params;
  const productDetails = products.find(product => product.id == id);
  if(productDetails){
    return res.json(productDetails);
  } res.status(404).json({success:false, message:"The id sent has no product associated with it. Check and try again later!"})
  
})
.post((req, res) => {
  const keysToUpdate = req.body;
  const {id} = req.params;
  const product = products.find(product => product.id === parseInt(id, 10));
  Object.keys(keysToUpdate).map(key => {
    if(key in product){
      product[key] = keysToUpdate[key];
    }
  })
  res.json({success: true, products});
})

module.exports = router;