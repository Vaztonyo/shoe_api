$(function() {

  const avlShoesBtn = document.querySelector('#avlShoesBtn');

  avlShoesBtn.addEventListener('click', function () {
  var url = "http://localhost:8083/api/shoes";
  var shoeTemplate = document.querySelector('#shoeTemplate').innerHTML;
  var compileTable = Handlebars.compile(shoeTemplate);
  var shoeTable = document.querySelector('#shoeTable');

  $.ajax({
    type: "get",
    url: url,
    success : function(data) {  
      shoeTable.innerHTML = compileTable({
        shoes: data
      })
    },
    error : function() {
      alert("error");
    }
  });//ajax call
}) //available shoe eventListener


});//end main function