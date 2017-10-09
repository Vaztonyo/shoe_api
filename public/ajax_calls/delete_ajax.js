$(function() {
  console.log('ssss');
      function ddeleteBrand(id) {
        console.log('id');

        var url = "/api/shoes/delete/" + id;

        $.ajax({
          type: "POST",
          url: url,
          success: function(data) {
            alert('Shoe Deleted');
          },
          error: function(jqXHR) {
            alert(jqXHR.status + " error");
          }
        }); //ajax call
      // }) //available shoe eventListener
  }

}); //end main function
