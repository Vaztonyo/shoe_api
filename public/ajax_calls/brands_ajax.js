$(function() {

  const brandSearchBtn = document.querySelector('#brandSearchBtn');
  const searchBrandInput = document.querySelector('#searchBrandInput');

  brandSearchBtn.addEventListener('click', function() {
    var brandValue = searchBrandInput.value

    var url = "http://localhost:8083/api/shoes/brand/" + brandValue;
    var brandsTemplate = document.querySelector('#brandsTemplate').innerHTML;
    var compileBrandsTable = Handlebars.compile(brandsTemplate);
    var brandsTable = document.querySelector('#brandsTable');

    // var alertMsgTemplate = document.querySelector('#alertMsgTemplate').innerHTML;
    // var alertMsgTemplate = Handlebars.compile(alertMsgTemplate);
    // var alertMsg = document.querySelector('#alertMsg');


    $.ajax({
      type: "get",
      url: url,
      success: function(data) {
        brandsTable.innerHTML = compileBrandsTable({
          shoes: data
        })
      },
      error: function(jqXHR) {
        // alertMsg.innerHTML = compileBrandsTable({
        //   messages.error: data
        // });
        alert(jqXHR.status + " error");
      }
    }); //ajax call
  }) //available shoe eventListener


}); //end main function
