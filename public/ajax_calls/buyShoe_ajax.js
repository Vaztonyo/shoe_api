$(function() {
  var buyShoe = function() {
    // API route for buying shoes. This is concatinated with the brand being searched
    var url = "/api/shoes/sold/" + shoeId;

    // AJAX call to file available stock in the API or Database
    $.ajax({
      // the type of the AJAX call will be a "POST"
      type: "POST",
      // the "url" property takes the value of the above "url" varaible
      url: url,
      // "data" is all the data retrieved from the API or Database
      // this data is then populated in the compiled Handlebars script which gets placed inside the empty div using innerHTML
      success: function(data) {
        // successMsg.innerHTML = "Thank You",
        console.log(data);
      },
      // if there is an error a pop-up alert with the error status code and the string "error"
      error: function(jqXHR) {
        if (jqXHR.status !== 0) {
          alert(jqXHR.status + " error");
        }
      }
    }); //ajax call
  } //end of "buyShoe" function
}); //end main function
