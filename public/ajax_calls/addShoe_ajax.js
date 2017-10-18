$(function addShoeAjax() {

  // introducing the "addStockBtn" button for adding stock
  const addStockBtn = document.querySelector('#addStockBtn');
  // "click" event listener for "addStockBtn" button
  addStockBtn.addEventListener('click', function(event) {
    // prevents form's default behavior when admin submits the form for adding stock
    event.preventDefault();

    setTimeout(function() {
      location.reload();
    }, 30000);

    // introducing HTML admin entry points for new stock
    const brandName = document.querySelector('#brandName');
    const shoeColor = document.querySelector('#shoeColor');
    const cash = document.querySelector('#cash');
    const size = document.querySelector('#size');
    const in_stock = document.querySelector('#in_stock');

    // alert message
    const alertMsg = document.querySelector('.alert');


    // alert message when a shoe has been successfully added
    var successMsg = document.querySelector('#successMsg');
    // handlebars template for the shoe template
    var shoeTemplate = document.querySelector('#shoeTemplate').innerHTML;
    // compiling the above handlebars template
    var compileAvailStock = Handlebars.compile(shoeTemplate);
    // empty div to display the shoe table
    var availStock = document.querySelector('#availStock');
    // API route for adding shoe to the database
    var url = "/api/shoes";

    // AJAX call to add stock into the API and Database
    $.ajax({
      // the type of the AJAX call will be a "POST"
      type: "POST",
      // the "url" property takes the value of the above "url" varaible
      url: url,
      // data is admin entry values that gets passed inside the success function and into the database
      data: {
        brand: brandName.value,
        color: shoeColor.value,
        cash: cash.value,
        size: size.value,
        in_stock: in_stock.value
      },
      // when the AJAX call is successfull the above data is passed through the annoymous function
      // and through the compiled Handlebars script which populates the empty div for the  shoe table
      success: function(data) {
        // alertMsg.innerHTML = "Shoe Added";
        availStock.innerHTML = compileAvailStock({
          shoes: data
        });
        availableShoes();
      },
      // on error of the AJAX call a pop-up error will be alerted with its status code and the word "error"
      error: function(jqXHR) {
        alert(jqXHR.status + " error");
      },
      function() {
        window.location.reload(true);
      }
    }); //ajax call
  }) //available shoe eventListener

}); //end main function
