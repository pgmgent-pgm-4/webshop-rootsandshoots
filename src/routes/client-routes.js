import express, { Router } from "express"
import path from "path"

const router = express.Router()

import * as usersController from "../controllers/usersController.js"
import * as profilesController from "../controllers/profilesController.js"
import * as orderHasProductsController from "../controllers/orderHasProductsController.js";
import * as ordersController from "../controllers/ordersController.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(express.static(path.join('src/client')));

// allows for .html invisibility in adress

// CLIENT GET REQUESTS
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: "src/client" });
});

app.get('/plants', function(req, res) {
    res.sendFile('plants.html', { root: "src/client" });
});
  
app.get('/care', function(req, res) {
    res.sendFile('care.html', { root: "src/client" });
});
  
app.get('/contact', function(req, res) {
    res.sendFile('contact.html', { root: "src/client" });
});
  
app.get('/login', function(req, res) {
    res.sendFile('signin.html', { root: "src/client" });
})
  
app.get('/signup', function(req, res) {
    res.sendFile('signup.html', { root: "src/client" });
});
  
app.get('/profile', (req, res) => {
    res.sendFile('profile.html', { root: "src/client" });
});
  
app.get('/profile-edit', function (req, res) {
    res.sendFile('profileedit.html', { root: "src/client" });
});
  
app.get('/details', function (req, res) {
    res.sendFile('details.html', { root: "src/client" });
});

app.get('/cart', function (req, res) {
    res.sendFile('shoppingcart.html', { root: "src/client" });
});

app.get('/order-history', function (req, res) {
    res.sendFile('orderhistory.html', { root: "src/client" });
});


//REGISTER
app.post('/signup', usersController.addUser);

//EDIT PROFILE INFORMATION THROUGH FORM
app.post('/profile-edit/',  profilesController.editProfile);

//ADD ITEM TO CART
app.post('/details/', orderHasProductsController.addOrderHasProduct);

//CHECKOUT
app.post('/cart', ordersController.editOrder)

export { app as client };