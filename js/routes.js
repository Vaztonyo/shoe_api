// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

// file exports
const model = require('./model');
const app = express();

///  configuring dependencies

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// new instances
var db = model().shoeModel;

// factory function : hosts function to be exported
module.exports = function(){

  var findAllShoes = function(req, res) {
    db.find({}, function(error, results) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      };
    });
  };

  var findBrand = function(req, res) {
    // capitalizing route parameters
    const capitalize = req.params.brandname.substring(0, 1);
    const toUpperCase = req.params.brandname.substring(0, 1).toUpperCase();

    const brandname = req.params.brandname.replace(capitalize, toUpperCase);
    db.find({
      brand: brandname
    }, function(error, results) {
      if (error) {
        req.flash('error', 'Sorry the brand is not available');
        console.log(error);
      } else {
        res.json(results);
      }
    });
  }

  var findBrandAnSize = function(req, res) {
    // capitalizing route parameters
    const capitalize = req.params.brandname.substring(0, 1);
    const toUpperCase = req.params.brandname.substring(0, 1).toUpperCase();

    const brandname = req.params.brandname.replace(capitalize, toUpperCase);
    const brandsize = req.params.size;

    db.find({
      brand: brandname,
      size: brandsize
    }, function(error, results) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    });
  }

  var sellShoes = function(req, res) {
    const shoeBought = req.params.id;
    // const shoeBought = req.params.id;

    db.findOneAndUpdate({
        brand: shoeBought
        // _id: ObjectId(shoeBought)
      }, {
        $inc: {
          in_stock: -1
        }
      }, {
        upsert: false
      },
      function(error, results) {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        }
      })
    res.json(shoeBought);
    // res.json(ObjectId(soldShoes).str);
  };

  var addShoe = function(req, res) {

    const id = req.body.id;
    const brand = req.body.brand;
    const color = req.body.color;
    const cash = req.body.cash;
    const size = req.body.size;
    const in_stock = req.body.in_stock;

    const newShoeEntry = new db({
      id: id,
      brand: brand,
      color: color,
      cash: cash,
      size: size,
      in_stock: in_stock
    });

    newShoeEntry.save(function(error, results) {
      if (error) {
        alert('Ya')
        console.log(error);
      }else {
        console.log(results.brand + " added in stock");
      }
    });
  }

  // finds all shoe brand in the database
  var findAllBrands =  function() {
    db.find({brand: ""}, function(error, results) {
      if (error) {
        console.log(error);
      }else {
        console.log(results);
      }
    })
  }

  return {
    findAllShoes,
    findBrand,
    findBrandAnSize,
    sellShoes,
    addShoe,
    findAllBrands
  }
}
