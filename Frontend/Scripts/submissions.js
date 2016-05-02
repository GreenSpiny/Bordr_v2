$(document).ready(function() {
  $("#eventBTN").click(function() {
    console.log("CLICK");
    var data = {
      owner: user._id,
      title: $("#eventNameInput").val(),
      description: $("#eventDescriptionInput").val(),
      privacy: $("#eventFriendsInput").val(),
      interests: []
    };

    $("#P3_interests").children().each(function () {
      data.interests.push($(this).data('_id'));
    });

    $.post('http://localhost:3000/createEvent', data).done( function(data) {
      console.log(data);
      goToPage(1);
    });

  });
});