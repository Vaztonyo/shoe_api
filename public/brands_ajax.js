$(function() {

  const brandSearchBtn = document.querySelector('#brandSearchBtn');
  const searchBrandInput = document.querySelector('#searchBrandInput').value;

  brandSearchBtn.addEventListener('click', function() {
    console.log(searchBrandInput);
    var url = "http://localhost:8083/api/shoes/brand" + "/searchBrandInput";
    var brandsTemplate = document.querySelector('#brandsTemplate').innerHTML;
    var compileBrandsTable = Handlebars.compile(brandsTemplate);
    var brandsTable = document.querySelector('#brandsTable');

    $.ajax({
      type: "get",
      url: url,
      success: function(data) {
        console.log(data);
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
