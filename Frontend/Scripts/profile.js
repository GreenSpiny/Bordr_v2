JS_profile = {
  Initialize : function() {

    if(current_user.friends.length > 0) {
      $.post('http://localhost:3000/userinfo', {values: current_user.friends}).done( function(response) {
        for(key in response) {
          var friend = response[key];
          AddFriendElement(friend);
        } 
      });
    } else {
      $("#MyFriends").append("<div id='lonely'>You have no friends :(</div>");
    }

    autofill.Initialize( $("#searchFriends"), 
      {
        Populate: function( value, callback ) {
          $.post('http://localhost:3000/autofill', 
            {
              "collection": "users", 
              "property": "username", 
              "value": value
            }).done( function ( response ){
              var friends = response;

              for (key in friends) {
                if ( (current_user._id == friends[key]._id) || (current_user.friends.indexOf(friends[key]._id) > -1) )
                  friends.splice(current_user.friends.indexOf(friends[key]), 1)
              }
        
              callback( response );
            })
        }, 

        Submit: function( element_value ) {
          $.post('http://localhost:3000/appendList',
          {
            collection: "users",
            entity: current_user._id,
            field: "friends",
            field_value: element_value
          }).done( function( response ) { 
            if (response.nModified == 1) {
              current_user.friends.push( element_value );
              LoadPage("profile");
            }
          });
        } 

    });

    if(current_user.interests.length > 0) {
      $.post('http://localhost:3000/interestinfo', {values: current_user.interests}).done( function(response) {
        for(key in response) {
          var interest = response[key];
        }
      })
    } else {
       $("#MyInterests").append("<div id='boring'>You have no interests :(</div>");
    }

    autofill.Initialize( $("#searchInterests"), 
      {
        Populate: function( value, callback ) {
          $.post('http://localhost:3000/autofill', 
            {
              "collection": "interests", 
              "property": "title", 
              "value": value
            }).done( function ( response ){
              var interests = response;
              for (key in interests) {
                if (current_user.interests.indexOf(interests[key]._id) > -1)
                  interests.splice(current_user.interests.indexOf(interests[key]), 1)
              }
        
              callback( response );
            })
        }, 

        Submit: function( element_value ) {
          $.post('http://localhost:3000/appendList',
          {
            collection: "users",
            entity: current_user._id,
            field: "interests",
            field_value: element_value
          }).done( function( response ) { 
            if (response.nModified == 1) {
              current_user.interests.push( element_value );
              LoadPage("profile");
            }
          });
        } 

    });
  }
}

function AddFriendElement(friend) {
  var friend_element = 
  "<div id='F_" + friend._id + "'>" +
    "<h4>" + friend.username + "</h4>" + 
    "<h5>Interests: </h5>";

  $.post('http://localhost:3000/interestinfo', {
    friend.interests;
  })/*.done( function ( response ) {

    console.log(response);
    /*for(key in friend.interests) {
      interest = friend.interests[key];
      friend_element += interest + ", ";
    }
    friend_element = friend_element.slice(0,-2);
    friend_element += "</div>";
    $("#MyFriends").append(friend_element);
  });*/
}

function AddInterestElement(interest) {
  console.log(interest);
  var interest_element = 
  "<div id='I_" + interest._id + "'>" + interest.title + "</div>"
  $("#MyInterests").append(interest_element);
}