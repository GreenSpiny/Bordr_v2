
autofill = {
  Initialize : function(wrapper, methods) {

    // Append the suggestions box
    var element = wrapper.children('.text_entry');
    var autofill_box = wrapper.children('.autofill_box');
    autofill_box.hide();

    var submit_value = null;
    function Submit() {
      submit.hide();
      methods.Submit( submit_value );
      element.val("");
    }

    var submit = wrapper.children('.submit');
    submit.on("click", Submit);
    submit.hide();

    element.on('keyup', function(e) { 

      if(e.keyCode == 13) {
        Submit();
      }
      else if(e.keyCode >= 32 || e.keyCode == 8) {
        var value = element.val();
        autofill_box.html("");
        submit.hide();
        submit_value = null

        if (value.length < 3) {
          autofill_box.hide();
        }
        if (value.length >= 3) {
          autofill_box.show();

          methods.Populate(value, function( suggestions ) {
            if (suggestions.length == 0)
              autofill_box.hide();

            for (var key in suggestions) {
              (function(key) {
                suggestion = suggestions[key];

                if (suggestion.title)
                  var suggestion_element_html = "<div class='suggestion'>" + suggestion.title + "</div>";
                else 
                  var suggestion_element_html = "<div class='suggestion'>" + suggestion.username + "</div>";

                autofill_box.append(suggestion_element_html);

                var suggestion_element = autofill_box.children().last();
                suggestion_element.on('click', function() { 
                  autofill_box.hide();
                  if (suggestion.title)
                    element.val( suggestion.title );
                  else
                    element.val( suggestion.username );
                  submit_value = suggestion._id;
                  submit.show();
                });

              })(key);
            }
          });
        }
      } 
    })
  }
}

/*autofill = {

  Initialize: function() {
    $('.AUTOFILL').each( function () {

      var element = $( this );
      var input = element.children('input');
      var collection = input.data("collection");
      var property = input.data("property");
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

            if (suggestions.length > 0)
              autofill_box.show();

            var suggestion;
            for (var key in suggestions) {
              suggestion = suggestions[key];
              var click_event = input.data("click");
              var suggestion_element_html = "<div class='suggestion' data-title=" + suggestion.title + " data-_id=" + suggestion._id + " >" + suggestion[property] + "</div>";
              autofill_box.append(suggestion_element_html);

              var suggestion_element = autofill_box.children().last();
              suggestion_element.on('click', function( event ) {
                  var param = {
                    title: $(event.target).data('title'),
                    _id: $(event.target).data('_id')
                  }

                  window[click_event]({_id: $(event.target).data('_id')});
                  input.val(suggestion.title);
                  UpdateSuggestions();
              });
            }
          });
        }
      }
    });
  }
};*/
