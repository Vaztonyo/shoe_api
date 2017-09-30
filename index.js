"use strict"
// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// file exports
const model = require('./js/model');
const routes = require('./js/routes');

// new instances
const app = express();
const shoeRoutes = routes();
const port = process.env.PORT || 8083;

// configuring dependencies
app.use(flash());

app.use(express.static('public'));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000 * 30
  }
}));

app.set('trust proxy', 1);

mongoose.Promise = global.Promise;

/// server or app URL routes
app.get('/', function(req, res) {
  res.render('index');
});

// find all the shoes in the database
app.get('/api/shoes', shoeRoutes.findAllShoes);

// filter shoes in the database based on brandname
app.get('/api/shoes/brand/:brandname', shoeRoutes.findBrand);

// filter shoes in the database based on brandname and size
app.get('/api/shoes/brand/:brandname/size/:size', shoeRoutes.findBrandAnSize);

// selling shoes in the database and subtructing in_stock value
app.post('/api/shoes/sold/:id', shoeRoutes.sellShoes);

// adds shoes into the database
app.post('/api/shoes', shoeRoutes.addShoe);

// listen for a localhost port and logging it on the console
app.listen(port, function() {
  console.log('App running on port: ' + port);
});
