JS_my_events = {
  Initialize : function() {
  	// Grab event data via POST request
  	$.post('http://localhost:3000/createInterest', {title: title, description: description}).done( function(data) {
      callback(data.data);
  	});
  }
}