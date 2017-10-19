$(document).ready(function() {

  getData()

  }); //end main function

  $(document).on('click', '#buyBtn', function(evt) {
    // finding the clicked element
    var target = evt.target;
    // getting the value of the clicked element
    var shoeId = target.value;
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
      success: function(databaseData) {
      getData()
      },
      // if there is an error a pop-up alert with the error status code and the string "error"
      error: function(jqXHR) {
        // if (jqXHR.status !== 0) {
        //   alert(jqXHR.status + " error");
        // }
      }
    }); //ajax call
  })
 function getData() {
   // API route for seeing all the shoes in the database
   var url = "/api/shoes";
   // handlebars template for the shoe template
   var shoeTemplate = document.querySelector('#shoeTemplate').innerHTML;
   // compiling the above handlebars template
   var compileTable = Handlebars.compile(shoeTemplate);
   // empty div to display the shoe table
   var shoeTable = document.querySelector('#shoeTable');

   $.ajax({
       type: "get",
       url: url,

       success: function(data) {
         shoeTable.innerHTML = compileTable({
           shoes: data
         });
       },

       error: function(jqXHR) {
         if (jqXHR.status !== 0) {
           alert(jqXHR.status + " error");
         }
       }

     }) //available shoe eventListener
 }
