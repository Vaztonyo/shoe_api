// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// exports module files
const data = require('./data')


const app = express();
const port = process.env.PORT || 8083
const local_db = process.env.MONGO_DB_URL || ('mongodb://localhost/shoe_api');

mongoose.connect(local_db, {
  useMongoClient: true
}, function(error) {
  if (error) {
    console.log('DB connection failed: ' + error);
  } else {
    console.log('DB connection successful');
  }
})

const shoeModel = mongoose.model('shoeModel', {
  id: Number,
  color: String,
  brand: String,
  cash: Number,
  size: Number,
  in_stock: Number
});



mongoose.Promise = global.Promise;

app.use(flash());

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  },
  proxy: 'true',
  resave: 'true',
  saveUninitialized: 'true'
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}), bodyParser.json())

app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/api/shoes', function(req, res) {
  shoeModel.find({}, function(error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      res.render('allShoes',{
          shoeInfo: results
      });
    }
  })
});
app.get('/api/shoes/brand/:brandname', function(req, res) {
  const shoeBrand = req.params.brandname;

  res.json({
    Brand_Name: shoeBrand,
  });
});
app.get('/api/shoes/brand/:brandname/size/:size', function(req, res) {
  const shoeBrand = req.params.brandname;
  const shoeSize = req.params.size;

  res.json({
    Brand_Name: shoeBrand,
    Brand_Size: shoeSize
  });
});
app.post('/api/shoes/sold/:id', function(req, res) {
  const soldShoes = req.params.id;
  res.json(soldShoes);
});
app.get('/admin', function(req, res) {
  // console.log(data);
  res.render('admin');
});

app.post('/api/shoes', function(req, res) {
  const brand = req.body.brand;
  const color = req.body.color;
  const cash = req.body.cash;
  const size = req.body.size;
  const in_stock = req.body.in_stock;

  const newShoeEntry = new shoeModel({
    // id: Number,
    brand: brand,
    color: color,
    cash: cash,
    size: size,
    in_stock: in_stock
  });

  newShoeEntry.save();
  console.log(brand );
});

app.listen(port, function() {
  console.log('App running on port: ' + port);
});
