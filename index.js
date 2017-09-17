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

mongoose.connect(local_db, {useMongoClient: true}, function(error) {
    if (error) {
      console.log('DB connection failed: ' + error);
    }else{
      console.log('DB connection successful');
    }
})

mongoose.Promise = global.Promise;

app.use(flash());

app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000 * 30 },proxy: 'true', resave: 'true', saveUninitialized: 'true'}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.get('/', function(req,res){
  res.render('index');
});
app.get('/api/shoes', function(req,res){
  res.render('allShoes');
});
app.get('/api/shoes/brand/:brandname', function(req,res){
  res.render('index');
});
app.get('/api/shoes/brand/:brandname/size/:size', function(req,res){
  res.render('index');
});
app.post('/api/shoes/sold/:id', function(req,res){
  res.render('index');
});
app.post('/api/shoes', function(req,res){
  // console.log(data);
  res.render('allShoes');
});

app.listen(port, function(){
  console.log('App running on port: ' + port);
});
