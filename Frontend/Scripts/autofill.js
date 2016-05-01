$(document).ready( function () {
  $('.AUTOFILL').each( function () {

    var element = $( this );
    var input = element.children('input');
    var collection = input.data("collection");
    var property = input.data("property");
    var link_prefix = input.data("link-prefix");

    console.log(link_prefix);

    // Append the suggestions box
    element.append("<div class='autofill_box'></div>");
    var autofill_box = element.children('.autofill_box');
    autofill_box.hide();

    // For the autofill object replace the name of the connection
    // with an actual connection.
    input.on('keyup', function(e) { 
      if(e.keyCode >= 32 || e.keyCode == 8) 
        UpdateSuggestions(); 
    })

    function UpdateSuggestions() {

      var value = input.val();
      autofill_box.html("");

      if (value.length < 3) {
        autofill_box.hide();
      }
      if (value.length >= 3) {
        autofill_box.show();
        $.post('http://localhost:3000/autofill', {"collection": collection, "value": value, "property": property}).done( function(suggestions) {
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





