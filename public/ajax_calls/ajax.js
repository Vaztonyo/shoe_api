$(function availableShoes() {

    // API route for seeing all the shoes in the database
    var url = "/api/shoes";
    // handlebars template for the shoe template
    var shoeTemplate = document.querySelector('#shoeTemplate').innerHTML;
    // compiling the above handlebars template
    var compileTable = Handlebars.compile(shoeTemplate);
    // empty div to display the shoe table
    var shoeTable = document.querySelector('#shoeTable');

    // AJAX call to file available stock in the API or Database
    $.ajax({
      // the type of the AJAX call will be a "get"
      type: "get",
      // the "url" property takes the value of the above "url" varaible
      url: url,
      // "data" is all the data retrieved from the API or Database
      // this data is then populated in the compiled Handlebars script which gets placed inside the empty div using innerHTML
      success: function(data) {
        shoeTable.innerHTML = compileTable({
          shoes: data
        });

        // introducing the "tbody" element by its class name
        const shoeList  = document.querySelector('.shoeList')
        // event bubbling: added an eventListener on "tbody" element
        shoeList.addEventListener('click', function(evt){
            // finding the clicked element
            var target = evt.target;
            // getting the value of the clicked element
            var shoeId = target.value;
            // API route for buying shoes. This is concatinated with the brand being searched
            var url = "/api/shoes/sold/" + shoeId;

            // AJAX call to file available stock in the API or Database
            $.ajax({
              // the type of the AJAX call will be a "POST"
              type: "POST",
              // the "url" property takes the value of the above "url" varaible
              url: url,
              // "data" is all the data retrieved from the API or Database
              // this data is then populated in the compiled Handlebars script which gets placed inside the empty div using innerHTML
              success: function(data) {
                // successMsg.innerHTML = "Thank You",
                alert("Thank You for Buying");
              },
              // if there is an error a pop-up alert with the error status code and the string "error"
              error: function(jqXHR) {
                // if (jqXHR.status !== 0) {
                //   alert(jqXHR.status + " error");
                // }
              }
            }); //ajax call


        });

        ////////////////////////////////////////////////////////////////////////////////////////
        // introducing the "tbody" element by its class name
        const admin_panel = document.querySelector('.admin_panel btn                                                                                                                                                                                                                                                                                                                                                          ')

        // event bubbling: added an eventListener on "tbody" element
        admin_panel.addEventListener('click', function(evt) {
          // finding the clicked element
          var target = evt.target;
          // getting the value of the clicked element
          var shoeId = target.value;
          console.log(shoeId);
          console.log(target);
          // API route for deleting shoes to the database
          var url = "/api/shoes/delete" + shoeId;

          // AJAX call to add stock into the API and Database
          $.ajax({
            // the type of the AJAX call will be a "POST"
            type: "POST",
            // the "url" property takes the value of the above "url" varaible
            url: url,
            // when the AJAX call is successfull the above data is passed through the annoymous function
            // and through the compiled Handlebars script which populates the empty div for the  shoe table
            success: function(data) {
              // alertMsg.innerHTML = "Shoe Added";
              availStock.innerHTML = compileAvailStock({
                shoes: data
              });
            },
            // on error of the AJAX call a pop-up error will be alerted with its status code and the word "error"
            error: function(jqXHR) {
              // alert(jqXHR.status + " error");
            }
          }); //ajax call
        }) //available shoe eventListener


      },
      // if there is an error a pop-up alert with the error status code and the string "error"
      error: function(jqXHR) {
        if (jqXHR.status !== 0) {
          alert(jqXHR.status + " error");
        }
      }
    // }); //ajax call
  }) //available shoe eventListener
  // }


}); //end main function
