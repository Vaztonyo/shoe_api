$(function() {



  addStockBtn.addEventListener('click', function() {
    const shoeId = document.querySelector('#shoeId');
    const brandName = document.querySelector('#brandName');
    const shoeColor = document.querySelector('#shoeColor');
    const cash = document.querySelector('#cash');
    const size = document.querySelector('#size');
    const in_stock = document.querySelector('#in_stock');
    const addStockBtn = document.querySelector('#addStockBtn');

    var url = "http://localhost:8083/api/shoes";
    var shoeTemplate = document.querySelector('#shoeTemplate').innerHTML;
    var compileAvailStock = Handlebars.compile(shoeTemplate);
    var availStock = document.querySelector('#availStock');

    $.ajax({
      type: "POST",
      url: url,
      data : {
        id: shoeId.value,
        brand: brandName.value,
        color: shoeColor.value,
        cash: cash.value,
        size: size.value,
        in_stock: in_stock.value
      },
      success: function(data) {
        availStock.innerHTML = compileAvailStock({
          shoes: data
        })
      },
      error: function(jqXHR) {
        alert(jqXHR.status + " error");
      }
    }); //ajax call
  }) //available shoe eventListener


}); //end main function
