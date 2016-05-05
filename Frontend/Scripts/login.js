JS_login = { 
  	Initialize : function() {
  		var first = true;
  		$("#logInButton").click(function(){
  			$.post('http://localhost:3000/login', {title: $(eventNameInput).val() }).done( function(response) {
  			});
  		});
  		$("#signUpButton").click(function(){
  			if (first) {
  				$("#hidden").slideDown();
  				first = false;
  			}
  			else {
  				$.post('http://localhost:3000/signup', {username: $(logInInput).val(), password: $(passwordInput).val(), confirm: $(passwordConfirm).val(), email: $(email).val() }).done( function(response) {
  					console.log(response);
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