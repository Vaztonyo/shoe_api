$(function() {
  // introducing the "brandSearchBtn" button for filtering stock with brand names
  const brandSearchBtn = document.querySelector('#brandSearchBtn');
  // introducing the input field for searching brand
  const searchBrandInput = document.querySelector('#searchBrandInput');

  // "click" event listener for "brandSearchBtn" button
  brandSearchBtn.addEventListener('click', function() {
    // the value of the brand search input field
    var brandValue = searchBrandInput.value

    // API route for filtering with brands. This is concatinated with the brand being searched
    var url = "api/shoes/brand/" + brandValue;
    // handlebars template for displaying the searched shoe
    var brandsTemplate = document.querySelector('#brandsTemplate').innerHTML;
    // compiling the above handlebars template
    var compileBrandsTable = Handlebars.compile(brandsTemplate);
    // empty div to display the searched shoe data
    var brandsTable = document.querySelector('#brandsTable');

    // AJAX call to filter available brands
    $.ajax({
      // the type of the AJAX call will be a "get"
      type: "get",
      // the "url" property takes the value of the above "url" varaible
      url: url,
      // "data" is all the data retrieved from the API or Database
      // this data is then populated in the compiled Handlebars script which gets placed inside the empty div using innerHTML
      success: function(data) {
        brandsTable.innerHTML = compileBrandsTable({
          shoes: data
        })
      },
      // if there is an error a pop-up alert with the error status code and the string "error"
      error: function(jqXHR) {
        alert(jqXHR.status + " error");
      }
    }); //ajax call
  }) //available shoe eventListener


}); //end main function
