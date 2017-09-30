const mongoose = require('mongoose');
const local_db = process.env.MONGO_DB_URL || ('mongodb://localhost/shoe_api');

module.exports = function(){


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

  return {
    shoeModel
  }
}
