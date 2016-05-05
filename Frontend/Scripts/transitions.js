var page = 0;
var imageRatio = 0.621;
var user = null;

// Document functions --- o
$(document).ready(function() {
  // Resize the window
  $(window).resize(function() {
    if (page > 0) {
      scroll("up",0);
    }
    else {
      scroll("down",0);
    }
  });

  $(".pageButton").click(function(event) {
  
    setUser();
    // Change pages
    goToPage(($(this)).attr("value"));
    $(".infoArea").each(function(){
      $(this).hide();
    });

    if($(event.target)[0].id == "logoutBTN") {
      $.post('http://localhost:3000/logout').done( function (data) {
        current_user = {};
      });
    };
  });
  
  // Open help info
  $(".infoButton").click(function(){
    var value = $(this).val();
    $(this).blur();
    $(".infoArea").each(function(){
      if ($(this).attr("value") == value) {
        $(this).slideToggle("fast");
      }
    });
  });
  
  // Open user info dialog
  $("#editUserInfoBTN").click(function() {
    $("#userInfo").slideDown();
    $(this).slideUp();
  });
  
  // Interest creation dialog
  $("#newInterestBTN").click(function(){
    if ($(this).val() == 0) {
      $("#newInterestArea").slideDown();
      $(this).val(1);
      $(this).html("Submit new interest");
    }
    else {
      submitNewInterest($("#interestName").val(),$("#interestDescription").val(),P6_insertInterest);
      $("#newInterestArea").slideUp();
      $(this).val(0);
      $(this).html("...not found? Make a new interest.");
      $("#interestName").val($("#interestName").attr("default"));
      $("#interestDescription").val($("#interestDescription").attr("default"));
    }
  });
  
  $("#newInterestArea .form-control").click(function() {
    if ($(this).val() == $(this).attr("default")) {
      $(this).val("")
    }
  });
  
  $("#newInterestArea .form-control").blur(function() {
    if ($(this).val() == "") {
      $(this).val($(this).attr("default"))
    }
  });
  
  $("#signUpButton").click(function() {
    $("#signUpInfo").slideDown();
  });
  
});

// Helper functions --- o
function goToPage(num) {

  // Calculate fade in speed
  var fadeValue = 0;
  if (page > 0 && num > 0) {
    fadeValue = 300;
  }

  // Go to designated page
  $(".page").each(function(){
    if ($(this).attr("value") == num) {
      $(this).fadeIn(fadeValue);
    }
    else {
      $(this).hide();
    }
  });
  
  // Scroll header up or down
  if (num > 0 && page <= 0) {
    scroll("up",750);
  }
  else if (num <=0 && page > 0) {
    scroll("down",750);
  }
  
  // Hide all info boxes
  $(".infoArea").each(function() {
    $(this).hide();
  });
  
  // Remove password
  $("#password").val("");
  
  // Set page number to current page
  page = num;
  
  // Page specific transitions ---o
  if (num == 5) {
    populateFriends();
  }
  
  if (num == 6) {
    populateInterests();
    $("#newInteresBTN").val(0);
  }
  
  // 0000000000000000000000000 ---o

}

function scroll(direction, duration) {
  // Scroll header up
  if (direction == "up") {
      var scroll = $("#header").height() * -imageRatio;
      $("#header").animate({top: scroll}, duration);
      $(".page").animate({top: scroll}, duration);
  }
  // Scroll header down
  else {
      $("#header").animate({top: 0}, duration);
      $(".page").animate({top: 0}, duration);
  }
}

function makeInterest(title, _id) {
  console.log(_id);
  return '<div class="interest" data-title="' + title + '" data-_id="' + _id + '"><p>' + title + '</p><div value=' + _id + '></div></div>';
}

function makeFriend(name) {
  return '<div class="friend"><p>' + name + '</p></div>';
}

// Reads in user info
function setUser() {
  if (user == null) {
    user = current_user;
    $("#mainmenu h1").html("Welcome to Bordr, " + user.username + "!");
    $("#profile #changeUsername").html(user.username);
    $("#profile #changePassword").html(user.password);
    $("#profile #changeEmail").html(user.email);
  }
}

// Populate interests page
function populateInterests() {
  var interests = user.interests;
  var string = "";
  for (var i = 0; i < interests.length; i++) {
    string += makeInterest(interests[i].title, interests[i]._id);
  }
  $("#interestsArea").html(string);
  
  $(".interest div").click(function() {
    removeInterest($(this).attr("value"));
    $(this).parent().remove();
  });
}

// Populate friends page
function populateFriends() {

  var friends = user.friends.slice();
  var friendArray = [];
  friendArray.push({name: "Dan", id: 123})
  friendArray.push({name: "Conrad", id: 456})
  friendArray.push({name: "Chandler", id: 789})
  
  var string = "";
  for (var i = 0; i < friendArray.length; i++) {
    string += makeFriend(friendArray[i].name);
  }
  $("#friendsOnline").html(string);
}

// Add a new interest via POST request
function submitNewInterest(title, description, callback) {
  $.post('http://localhost:3000/getUserEvents', {}).done( function(data) {
      callback(data.data);
  });
}

// Remove a user's interest
function removeInterest(id) {
  for (var i = 0; i < user.interests.length; i++) {
    if (user.interests[i]._id == id) {
      console.log("removed interest");
      user.interests.splice(i,1);
      break;
    }
  }
}