$(function() {

  const shoeId = document.querySelector('#shoeId');
  const brandName = document.querySelector('#brandName');
  const shoeColor = document.querySelector('#shoeColor');
  const cash = document.querySelector('#cash');
  const size = document.querySelector('#size');
  const in_stock = document.querySelector('#in_stock');
  const addStockBtn = document.querySelector('#addStockBtn');

  addStockBtn.addEventListener('click', function() {
    var shoeIdVal = shoeId.value
    var brandNameVal = brandName.value
    var shoeColorVal = shoeColor.value
    var cashVal = cash.value
    var sizeVal = size.value
    var in_stockVal = in_stock.value
    var addStockBtnVal = addStockBtn.value

    var url = "http://localhost:8083/api/shoes";
    var availStockTemplate = document.querySelector('#availStockTemplate').innerHTML;
    var compileAvailStock = Handlebars.compile(availStockTemplate);
    var availStock = document.querySelector('#availStock');

    // var alertMsgTemplate = document.querySelector('#alertMsgTemplate').innerHTML;
    // var alertMsgTemplate = Handlebars.compile(alertMsgTemplate);
    // var alertMsg = document.querySelector('#alertMsg');


    $.ajax({
      type: "post",
      url: url,
      success: function(data) {
        availStock.innerHTML = compileAvailStock({
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
