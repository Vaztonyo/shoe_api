$(function() {

  // JQuery function to hide the search collapse div for filtering with brand, when the size search button is cliked
  $('#sizeBtn').click(function() {
    $('#searchBrand').hide();
    $('#searchSize').show();
  });

  // introducing the "searchBtn" button for searching the stock with size
  const searchBtn = document.querySelector('#searchBtn');

  // HTML input elements for filter with size
  const searchSizeInput = document.querySelector('#searchSizeInput');
  const searchBrandInput = document.querySelector('#searchBrandInput1');

  // "click" event listener for "searchBtn" button
  searchBtn.addEventListener('click', function() {
    // hiding the table with available shoes when one searches for a particular brand
    $('#shoeTable').hide();

    // values of the HTML input elements for filtering with size
    var sizeValue = searchSizeInput.value
    var brandValue = searchBrandInput.value

    // API route for filtering with brand and size. This is concatinated with the brand and size being searched
    var url = "api/shoes/brand/" + brandValue + "/size/" + sizeValue;
    // handlebars template for displaying the searched shoes
    var brandsTemplate = document.querySelector('#brandsTemplate').innerHTML;
    // compiling the above handlebars template
    var compileBrandsTable = Handlebars.compile(brandsTemplate);
    // empty div to display the searched shoe data
    var brandsTable = document.querySelector('#brandsTable');

    // AJAX call to filter available brands with size and brand name
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
        // alert(jqXHR.status + " error");
      }
    }); //ajax call
  }) //available shoe eventListener

}); //end main function
