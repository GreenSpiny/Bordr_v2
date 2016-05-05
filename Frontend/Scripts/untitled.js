autofill = {
  Initialize : function(element, Populate, Click, Submit) {

    // Append the suggestions box
    element.append("<div class='autofill_box'></div>");
    var autofill_box = element.children('.autofill_box');
    autofill_box.hide();

    input.on('keyup', function(e) { 
      if(e.keyCode == 13) {
        Submit();
      }
      else if(e.keyCode >= 32 || e.keyCode == 8) {
        var value = input.val();
        autofill_box.html("");

        if (value.length < 3) {
          autofill_box.hide();
        }
        if (value.length >= 3) {
          Populate(value, function( suggestions ) {
            for (var key in suggestions) {
              (function(key) {
                suggestion = suggestions[key];
                var suggestion_element_html = "<div class='suggestion'>" + suggestion.title + "</div>";
                autofill_box.append(suggestion_element_html);

                var suggestion_element = autofill_box.children().last();
                suggestion_element.on('click', Click(suggestion));
              })(key);
            }
          });
        }


      }
    })
  }
}