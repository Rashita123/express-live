const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());


let idCounter = 12345;
const cart = [
  {id:1, name:"shoes", price:1500, quantity:2},
  {id:2, name:"shirt", price:1200, quantity:5},
]


const checkAuthentication = (req, res, next) => {
  const {username, password} = req.body;
  if(username==='rashita' && password==='mehta'){
    next();
  }else{
    res.json({success: false, message:"Not Authenticated!"})
  }
}
router.use('/', checkAuthentication)
router.route('/')
.get((req, res) => {
  res.send({success: true, cart});
})
.post((req, res) => {
  const {name, price, quantity} = req.body;
  const newProduct = {id: idCounter++, name, price, quantity};
  cart.push(newProduct);
  res.json({success: true, cart});
})


router.route('/:id')
.get((req, res) => {
  const {id} = req.params;
  const cartItemDetails = cart.find(cartItem => cartItem.id == id);
  if(!cartItemDetails){
    res.status(404).json({success:false, messsage: "No products found in cart corresponding to this id!"})
  }else{
    res.json({success: true, cartItemDetails});
  }
})
.post((req, res) => {
  const keysToUpdate = req.body;
  const {id} = req.params;
  cart.forEach(cartItem => {
    if(cartItem.id == id){
      Object.keys(keysToUpdate).forEach(key => {
        if(key in cartItem){
          cartItem[key] = keysToUpdate[key];
        }
      })
    }
  })
  res.json({success: true, cart});
})
.delete((req, res) => {
  const {id} = req.params;
  const cartItemIndex = cart.findIndex(cartItem => cartItem.id == id);
  if(cartItemIndex===-1){
    res.status(404).json({success: false, message:"No product corresponding to this id is found! Try with another id."})
  }else{
    cart.splice(cartItemIndex, 1);
    res.json({succesS: true, cartItemIndex});
  }
  
})


module.exports = router;