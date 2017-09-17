module.exports = function shoeData() {



var shoes = [{
    id: 100,
    color: 'blue',
    brand: 'Addidas',
    cash: 350,
    size: 7,
    in_stock: 5
  },
  {
    id: 101,
    color: 'green',
    brand: 'Mike',
    price: 350,
    size: 8,
    in_stock: 15
  }
];

console.log(shoes[0]);

return {
  shoes
}

} // end of shoeData function
