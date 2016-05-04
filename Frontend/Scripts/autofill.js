function TestSubmit(data) {
  console.log("HI!");
  //var user_id = data[0]["_id"];
  //var other_user_ids = [data[0]["_id"], data[1]["_id"], data[2]["_id"]];

  /*$.post('http://localhost:3000/relationship', {0: user1_id, 1: user2_id}).done( function(data) {
    // data contains all information about relationship between two users!
    console.log(data);
  });*/

  /*var query = {
    collection: 'users',
    entry_property_name: 'friends',
    entry_id: user_id,
    corresponding_entry_ids: other_user_ids
  }

  $.post('http://localhost:3000/linkEntries', query).done( function(data) {
     //console.log(data); 
  });*/

  /*$.post('http://localhost:3000/createInterest', {title: "game221", description: "play it"}).done( function(data) {
       //console.log(data);
  });*/
}

/*function P3_insertInterest(suggestion) {
  $("#P3_interests").append(makeInterest(suggestion.title, suggestion._id));
  $("#P3_interests").children().last().children("div").click( function( event ) {
    $(event.target).parent().remove();
  });
}

function P6_insertInterest(suggestion) {
  $("#searchInterests").val(suggestion.title);
  var success = true;
  for (var i = 0; i < user.interests.length; i++) {
    if (user.interests[i]._id == suggestion._id) {
      success = false;
      break;
    }
  }
  if (success) {
    user.interests.push(suggestion);
    populateInterests();
  }
}*/

autofill = {

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
};
