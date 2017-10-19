$(document).ready(function() {

  getData()

}); //end document ready function


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
