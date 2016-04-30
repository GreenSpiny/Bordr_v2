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
  
  // Create new event
  $("#eventBTN").click(function() {
    createEvent();
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
  
  // Remove password
  $("#password").val("");
  
  // Set page number to current page
  page = num;
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

function transition(button) {
  goToPage(button.attr("value"));
  $(".infoArea").each(function(){
    button.hide();
  });
}