var page = 0;
var imageRatio = 0.621;

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
  
  $(".pageButton").click(function(){
    goToPage(($(this)).attr("value"));
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
  
  // TESTING
  $("#eventsArea").html(makeEventDiv("Albert's Party","30 years!","skydiving","false"));
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

/*function makeEventDiv(name, description, tags, isPublic) {
  var string = "";
  string += ' <div class="eventObject space">'
  string += '   <div class="form-group row">'
  string += '     <div class="col-sm-2">'
  string += '       <p class="bg-1">Name:</p>'
  string += '     </div>'
  string += '     <div class="col-sm-7">'
  string += '       <input type="text" class="eventName form-control" value="' + name + '"></input>'
  string += '     </div>'
  string += '     <div class="col-sm-2">'
  string += '       <p class="bg-1">Public:</p>'
  string += '     </div>'
  string += '     <div class="col-sm-1">'
  string += '       <input type="checkbox" class="eventFriends form-control col-sm-1"></input>'
  string += '     </div>'
  string += '   </div>'
  string += '   <div class="form-group row">'
  string += '     <div class="col-sm-2">'
  string += '       <p class="bg-1">Tags:</p>'
  string += '     </div>'
  string += '     <div class="col-sm-10">'
  string += '       <input type="text" class="eventTags form-control" value="' + tags + '"></input>'
  string += '     </div>'
  string += '   </div>'
  string += '   <div class="form-group row">'
  string += '     <div class="col-sm-12">'
  string += '       <textarea class="eventDescription form-control">' + description + '</textarea>'
  string += '     </div>'
  string += '   </div>'
  string += '   <div class="form-group row">'
  string += '     <div class="col-sm-4">'
  string += '       <button type="button" class="btn btn-success btn-block groupChat">Group Chat</button>'
  string += '     </div>'
  string += '     <div class="col-sm-4">'
  string += '       <button type="button" class="btn btn-success btn-block groupChat">View Attendees</button>'
  string += '     </div>'
  string += '     <div class="col-sm-4">'
  string += '       <button type="button" class="btn btn-primary btn-block groupChat">Save Chages</button>'
  string += '     </div>'
  string += '   </div>'
  string += ' </div>'

  return string;
}*/