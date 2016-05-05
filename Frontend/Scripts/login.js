JS_login = { 
  	Initialize : function() {

      console.log("HERE");
      $.post('http://localhost:3000/checkLogin', function(response) {
        console.log(response);
        if (response) {
          current_user = response;
          LoadPage("menu");
        }
      })


  		var first = true;
  		$("#logInButton").on("click", function( event ) {
  			log(event);
  		});
      $("#signUpButton").on("click", function( event ) {
  			if (first) {
  				$("#hidden").slideDown();
  				first = false;
  			}
  			else {
  				$.post('http://localhost:3000/signup', {username: $(logInInput).val(), password: $(passwordInput).val(), confirm: $(passwordConfirm).val(), email: $(email).val() }).done( function(response) {
  					console.log("signup",response);
            var alerts = "";
  					if (response.username == "Username must be between 3 and 15 alphanumeric characters") {
  						alerts += (response.username + "\n");
  					}
  					if (response.password == "Password must be between 8 and 15 alphanumeric characters") {
  						alerts += (response.password + "\n");
  					}
  					if (response.confirm == "The entered passwords do not match") {
  						alerts += (response.confirm + "\n");
  					}
  					if (response.email == "Please enter a valid email address") {
  						alerts += (response.email + "\n");
  					}
            if (alerts == "") {
              alert("User made successfully!");
              log(event);
            }
            else {
              alert(alerts);
            }
  				});
  			}
  		});
  	}
}

function log(event) {
  $.post('http://localhost:3000/login', {username: $(logInInput).val(), password: $(passwordInput).val()}).done( function(response) {
    if (response.err == null) {
      current_user = response.user;
    };
    LoadPage( $( event.target ).data('redirect') );
  });
}
