$(function() {

  // introducing the "avlShoesBtn" button for buying a shoe
  const checkoutBtn = document.querySelector('#checkoutBtn');

  // "click" event listener for "checkoutBtn" button
  checkoutBtn.addEventListener('click', function() {
    // introducing HTML input element for making a choice on purchasing a shoe
    const buyShoe = document.querySelector('#buyShoe');
    const buyQty = document.querySelector('#buyQty');

    // values of the chosen shoe to be bought
    const buyShoeVal = buyShoe.value;

    // API route for buying shoes. This is concatinated with the brand being searched
    var url = "/api/shoes/sold/" + buyShoeVal;

    // AJAX call to file available stock in the API or Database
    $.ajax({
      // the type of the AJAX call will be a "POST"
      type: "POST",
      // the "url" property takes the value of the above "url" varaible
      url: url,
      // "data" is all the data retrieved from the API or Database
      // this data is then populated in the compiled Handlebars script which gets placed inside the empty div using innerHTML
      success: function(data) {
        successMsg.innerHTML = "Thank You"
      },
      // if there is an error a pop-up alert with the error status code and the string "error"
      error: function(jqXHR) {
        alert(jqXHR.status + " error");
      }
    }); //ajax call
  }) //available shoe eventListener


}); //end main function
