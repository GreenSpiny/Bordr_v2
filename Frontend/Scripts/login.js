JS_login = { 
  	Initialize : function() {
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
   console.log("login",response);
   if (response.err == null){
    alert("Successful login!")
    current_user = {
      "user": {
        "_id": response.user._id,
        "email": response.user.email,
        "friends": response.user.friends,
        "hosting_events": response.user.hosting_events,
        "interests": response.user.interests,
        "participating_events": response.user.participating_events,
        "profile_picture": response.user.profile_picture,
        "username": response.user.username
      }
    };
    $("body").fadeOut(300, function () {
      LoadPage( $( event.target ).data('redirect') );
      autofill.Initialize();
      $("body").fadeIn(300);
    });
   }
  });
}