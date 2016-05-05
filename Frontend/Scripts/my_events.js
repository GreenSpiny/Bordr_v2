JS_my_events = {
  Initialize : function() {
  	// Grab event data via POST request
  	console.log(current_user);
  	var events = current_user.user.hosting_events;
  	console.log("events",events);
  	for (var i=0; i < events.length; i++)
		{
			var checked = "";
			if (events[i].private) {
				checked = "checked";
			}
			var string = "";
			string += ' <div class="eventObject space">'
			string += '   <div class="form-group row">'
			string += '     <div class="col-sm-2">'
			string += '       <p class="bg-1">Name:</p>'
			string += '     </div>'
			string += '     <div class="col-sm-7">'
			string += '       <input type="text" class="eventName form-control" value="' + events[i].title + '"></input>'
			string += '     </div>'
			string += '     <div class="col-sm-2">'
			string += '       <p class="bg-1">Private:</p>'
			string += '     </div>'
			string += '     <div class="col-sm-1">'
			string += '       <input type="checkbox" class="eventFriends form-control col-sm-1 "'+ checked + '></input>'
			string += '     </div>'
			string += '   </div>'
			string += '   <div class="form-group row">'
			string += '     <div class="col-sm-2">'
			string += '       <p class="bg-1">Tags:</p>'
			string += '     </div>'
			string += '     <div class="col-sm-10">'
			string += '       <input type="text" class="eventTags form-control" value="' + events[i].tags + '"></input>'
			string += '     </div>'
			string += '   </div>'
			string += '   <div class="form-group row">'
			string += '     <div class="col-sm-12">'
			string += '       <textarea class="eventDescription form-control">' + events[i].description + '</textarea>'
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
			string += '       <button type="button" class="btn btn-primary btn-block groupChat" ng-click="saveChanges()">Save Chages</button>'
			string += '     </div>'
			string += '   </div>'
			string += ' </div>'
			document.getElementById('event-feed').innerHTML += string;
		}
  }
}