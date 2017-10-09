$(function() {


  const checkoutBtn = document.querySelector('#checkoutBtn');

  checkoutBtn.addEventListener('click', function() {
    const buyShoe = document.querySelector('#buyShoe');
    const buyQty = document.querySelector('#buyQty');

    const buyShoeVal = buyShoe.value;
    const buyQtyVal = buyQty.value;

    console.log(buyQtyVal);

    var url = "/api/shoes/sold/" + buyShoeVal;

    var successMsg = document.querySelector('#successMsg');
    // console.log(buyShoeTemplate);
    $.ajax({
      type: "POST",
      url: url,
      success: function(data) {
        successMsg.innerHTML = "Thank You"
      },
      error: function(jqXHR) {
        alert(jqXHR.status + " error");
      }
    }); //ajax call
  }) //available shoe eventListener


}); //end main function
