function TestSubmit(data) {
  var user_ids = {values: [data[0]["_id"], data[1]["_id"]]};

  /*$.post('http://localhost:3000/relationship', {0: user1_id, 1: user2_id}).done( function(data) {
    // data contains all information about relationship between two users!
    console.log(data);
  });*/

 $.post('http://localhost:3000/createInterest', {title: "game", description: "play it"}).done( function(data) {
    // data contains information about all users in user_ids!!
     console.log(data); 
  });
}

$(document).ready( function () {
  $('.AUTOFILL').each( function () {

    var element = $( this );
    var input = element.children('input');
    var collection = input.data("collection");
    var property = input.data("property");
    var link_prefix = input.data("link-prefix");
    var submit_function = input.data("submit-function");

    // Append the suggestions box
    element.append("<div class='autofill_box'></div>");
    var autofill_box = element.children('.autofill_box');
    autofill_box.hide();

    // For the autofill object replace the name of the connection
    // with an actual connection.
    input.on('keyup', function(e) { 
      if(e.keyCode == 13) {
        $.post('http://localhost:3000/autofill', {"collection": collection, "value": input.val(), "property": property}).done( function(entries) {
          window[submit_function](entries);
        });
      }
      else if(e.keyCode >= 32 || e.keyCode == 8) {
        UpdateSuggestions(); 
      }
    })

    function UpdateSuggestions() {
      var value = input.val();
      autofill_box.html("");

      if (value.length < 3) {
        autofill_box.hide();
      }
      if (value.length >= 3) {
        $.post('http://localhost:3000/autofill', {"collection": collection, "value": value, "property": property}).done( function(suggestions) {

          console.log({"collection": collection, "value": value, "property": property});

          if (suggestions.length > 0)
            autofill_box.show();

          for (var key in suggestions) {
            var suggestion = suggestions[key];
            var link = link_prefix + suggestion[input.data("link-property")];
            var suggestion_element_html = "<div class='suggestion' href='" + link + "'>" 
                                          + suggestion[property] +  "</div>";

            autofill_box.append(suggestion_element_html);
            var suggestion_element = autofill_box.children().last();
            suggestion_element.on('click', function( event ) {
              window.open($(event.target).attr("href"), "_self");
            });
          }
        });
      }
    }
  });
});





