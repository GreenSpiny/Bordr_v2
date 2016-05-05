JS_menu = {
  Initialize : function() {

  	$("#logoutBTN").click(function(){
  		 $.post('http://localhost:3000/logout', {}).done( function(response) {

  		 });
       current_user = {};
  	});
  }
}