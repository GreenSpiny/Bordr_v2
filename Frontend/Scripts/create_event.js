JS_create_event = { 
  	Initialize : function() {
  		var event;
	  	$("#eventBTN").click(function(){
	  		$.when(create()).done(function(event){
	  			console.log(event);
	  			append(event);
	  		}) 
	  	});
  	}
}
function create () {
	return 	$.post('http://localhost:3000/createEvent', {title: $(eventNameInput).val(), description: $(eventDescriptionInput).val(), tags: $(eventTagsInput).val(), private: ($('#eventFriendsInput').is(":checked"))}).done( function(response) {
	  if (response.title == "Event title must be between 3 and 15 alphanumeric characters") {
	  	alert(response.title);
	  }
	  else if (response.description == "Event name must be under 250 characters"){
	  	alert(response.description);	
	  }
	  else {
	  	event = response;
	  	//short term
	  	current_user.user.hosting_events.push(response);
	  	current_user.user.participating_events.push(response);
	  	alert("Event made!");
	  	
	     }
	});
}

function append(event) {
	console.log("post event",event);
	eventString = JSON.stringify(event);
  	$.post('http://localhost:3000/appendList', {collection: "users", field: "hosting_events", entity: current_user.user._id, field_value: eventString}).done( function(response) {
    	console.log(response);
    });
    $.post('http://localhost:3000/appendList', {collection: "users", field: "participating_events", entity: current_user.user._id, field_value: eventString}).done( function(response) {
    	console.log(response);
    });
}

