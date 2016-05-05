JS_menu = {
  Initialize : function() {

  	$("#logoutBTN").click(function(){
  		console.log("logout");
  		 $.post('http://localhost:3000/logout', {}).done( function(response) {
  		 	console.log(response);
  		 });
  	});
  }
}