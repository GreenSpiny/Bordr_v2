JS_event_listing = {
  Initialize : function() {
  	$("#getEventsButton").click(function(){
  		$.post('http://localhost:3000/createEvent', {title: $(eventNameInput).val(), description: $(eventDescriptionInput).val(), tags: $(eventTagsInput).val(), private: ($('#eventFriendsInput').is(":checked"))}).done( function(response) {
  			
  		});
  	});
  }
}