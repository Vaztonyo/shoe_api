$(function() {

  const searchBtn = document.querySelector('#searchBtn');

  const searchSizeInput = document.querySelector('#searchSizeInput');
  const searchBrandInput = document.querySelector('#searchBrandInput1');

  searchBtn.addEventListener('click', function() {
    var sizeValue = searchSizeInput.value
    var brandValue = searchBrandInput.value

    console.log(sizeValue);
    console.log(brandValue);

    var url = "api/shoes/brand/" + brandValue + "/size/" + sizeValue;
    var brandsTemplate = document.querySelector('#brandsTemplate').innerHTML;
    var compileBrandsTable = Handlebars.compile(brandsTemplate);
    var brandsTable = document.querySelector('#brandsTable');

    $.ajax({
      type: "get",
      url: url,
      success: function(data) {
        brandsTable.innerHTML = compileBrandsTable({
          shoes: data
        })
      },
      error: function(jqXHR) {
        alert(jqXHR.status + " error");
      }
    }); //ajax call
  }) //available shoe eventListener

}); //end main function
