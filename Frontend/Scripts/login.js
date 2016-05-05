JS_login = { 
  	Initialize : function() {
  		var first = true;
  		$("#logInButton").on("click", function( event ) {
  			$.post('http://localhost:3000/login', {username: $(logInInput).val(), password: $(passwordInput).val()}).done( function(response) {
  			 console.log("login",response);
         if (response.err == null){
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
          alert("Successful login!")
         }
        });
  		});
  		$("#signUpButton").click(function(){
  			if (first) {
  				$("#hidden").slideDown();
  				first = false;
  			}
  			else {
  				$.post('http://localhost:3000/signup', {username: $(logInInput).val(), password: $(passwordInput).val(), confirm: $(passwordConfirm).val(), email: $(email).val() }).done( function(response) {
  					console.log("signup",response);
  					if (response.username == "Username must be between 3 and 15 alphanumeric characters") {
  						alert(response.username);
  					}
  					if (response.password == "Password must be between 8 and 15 alphanumeric characters") {
  						alert(response.password);
  					}
  					if (response.confirm == "The entered passwords do not match") {
  						alert(response.confirm);
  					}
  					if (response.email == "Please enter a valid email address") {
  						alert(response.email);
  					}
  				});
  			}
  		});
  	}
}