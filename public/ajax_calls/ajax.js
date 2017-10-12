$(function() {
  // introducing the "avlShoesBtn" button for checking available stock
  const avlShoesBtn = document.querySelector('#avlShoesBtn');

  // "click" event listener for "avlShoesBtn" button
  // avlShoesBtn.addEventListener('click', function() {
    // API route for seeing all the shoes in the database
    var url = "/api/shoes";
    // handlebars template for the shoe template
    var shoeTemplate = document.querySelector('#shoeTemplate').innerHTML;
    // compiling the above handlebars template
    var compileTable = Handlebars.compile(shoeTemplate);
    // empty div to display the shoe table
    var shoeTable = document.querySelector('#shoeTable');

    // AJAX call to file available stock in the API or Database
    $.ajax({
      // the type of the AJAX call will be a "get"
      type: "get",
      // the "url" property takes the value of the above "url" varaible
      url: url,
      // "data" is all the data retrieved from the API or Database
      // this data is then populated in the compiled Handlebars script which gets placed inside the empty div using innerHTML
      success: function(data) {
        shoeTable.innerHTML = compileTable({
          shoes: data
        })
      },
      // if there is an error a pop-up alert with the error status code and the string "error"
      error: function(jqXHR) {
        alert(jqXHR.status + " error");
      }
    // }); //ajax call
  }) //available shoe eventListener
  // }


}); //end main function
