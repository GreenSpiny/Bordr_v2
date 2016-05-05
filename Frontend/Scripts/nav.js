JS_nav = {
  Initialize : function() {


  $(".infoButton").click(function(){
    $(".infoArea").slideToggle("fast");
  });

// Hide all info boxes on goto page
  $(".infoArea").each(function() {
    $(this).hide();
  });


  }
}