$(function() {

  const avlShoesBtn = document.querySelector('#avlShoesBtn');

  // function availableShoes(){
    avlShoesBtn.addEventListener('click', function () {
    var url = "/api/shoes";
    var shoeTemplate = document.querySelector('#shoeTemplate').innerHTML;
    var compileTable = Handlebars.compile(shoeTemplate);
    var shoeTable = document.querySelector('#shoeTable');

    $.ajax({
      type: "get",
      url: url,
      success : function(data) {
        // console.log("Data", data);
        shoeTable.innerHTML = compileTable({
          shoes: data
        })
      },
      error : function() {
        alert("error");
      }
    });//ajax call
  }) //available shoe eventListener
  // }


});//end main function
