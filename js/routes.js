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
app.use(bodyParser.urlencoded({
  extended: false
}));

// new instances
var db = model().shoeModel;

// factory function : hosts function to be exported
module.exports = function() {

  var findAllShoes = function(req, res) {
    db.find({}, function(error, results) {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      };
    });
  };

  // this is a function to find shoes in my Database by filtering with brands
  var findBrand = function(req, res) {
    // capitalizing the first letter of  values entered as route parameters
    const capitalize = req.params.brandname.substring(0, 1);
    const toUpperCase = req.params.brandname.substring(0, 1).toUpperCase();

    // applying the above capitalization to the "brandname" entered in the URl
    const brandname = req.params.brandname.replace(capitalize, toUpperCase);

    // going to my Database and finding the above "brandname" it then takes an annonymous callback function
    // that takes "error & results" as parameters. If there is an error the error will logged to the console
    // if there is no error the results from the Database are printed as JSON on the browser
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

  // this is a function to find shoes in my Database by filtering with brands and size
  var findBrandAnSize = function(req, res) {
    // capitalizing the first letter of  values entered as route parameters
    const capitalize = req.params.brandname.substring(0, 1);
    const toUpperCase = req.params.brandname.substring(0, 1).toUpperCase();

    // applying the above capitalization to the "brandname" entered in the URl
    const brandname = req.params.brandname.replace(capitalize, toUpperCase);
    const brandsize = req.params.size;


    // going to my Database and finding the above "brandname" and "brandsize" it then takes an annonymous callback function
    // that takes "error & results" as parameters. If there is an error the error will logged to the console
    // if there is no error the results from the Database are printed as JSON on the browser
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
    console.log(shoeBought);

    // going to my Database and finding then updating the number of shoes instock by minusing one shoe
    // this is done by using the "shoeBought" constant as the value to the "brand" property
    // the "in_stock" property then gets to be reduced by one
    // "upsert: false" then persitst the deduction to on minus once
    // it then takes an annonymous callback functionthat takes "error & results" as parameters.
    // If there is an error the error will logged to the console
    // if there is no error the results from the Database are printed as JSON on the browser
    db.findOneAndUpdate({
        _id: ObjectId(shoeBought)
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
  };

  // this function is for adding shoes to the API or Database
  var addShoe = function(req, res) {

    // using "bodyParser" to read DOM input elements for adding stock
    const id = req.body.id;
    const brand = req.body.brand;
    const color = req.body.color;
    const cash = req.body.cash;
    const size = req.body.size;
    const in_stock = req.body.in_stock;

    // creating a new shoe into the Database with values from the above HTML elements
    const newShoeEntry = new db({
      brand: brand,
      color: color,
      cash: cash,
      size: size,
      in_stock: in_stock
    });

    // the entry is then saved to the Database. The "save()" function takes an annonymous callback function
    // that takes "error & results" as parameters.
    // If there is an error the error will logged to the console
    // if there is no error the results from the Database are printed as JSON on the browser
    newShoeEntry.save(function(error, results) {
      if (error) {
        console.log(error);
      } else {
        console.log(results.brand + " added in stock");
      }
    });
  }

  return {
    findAllShoes,
    findBrand,
    findBrandAnSize,
    sellShoes,
    addShoe
  }
}
