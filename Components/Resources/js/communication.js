// Create a new event
function createEvent() {
  var name = $("#eventNameInput").val();
  var tagsRaw = $("#eventTagsInput").val();
  var description = $("#eventDescriptionInput").val();
  console.log("Attempting to make a new event!");
}

// Search for events
function searchEvents() {
  var tagsRaw = $("#searchEvents").val();
  var distance = $("#distanceSelect").val();
  var friends = $("#friendSelect").val();
}