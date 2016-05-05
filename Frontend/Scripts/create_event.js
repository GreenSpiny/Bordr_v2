JS_create_event = { 
  	Initialize : function() {
	  	$("#eventBTN").click(function(){
		  	$.post('http://localhost:3000/createEvent', {title: $(eventNameInput).val(), description: $(eventDescriptionInput).val(), tags: $(eventTagsInput).val(), private: ($('#eventFriendsInput').is(":checked"))}).done( function(response) {
		      console.log(response);
		      if (response.title == "Event title must be between 3 and 15 alphanumeric characters") {
		      	alert(response.title);
		      }
		      else if (response.description == "Event name must be under 250 characters"){
		      	alert(response.description);	
		      }
		      else {
		      	alert("Event made!");
		      }
		  	});
		});
  	}
}