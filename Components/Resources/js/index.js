var signup = false;
$(document).ready( function() {
  $("#signupBTN").click( function() {
    if (!signup) {
      signup = true;
      $("#signUpInfo").slideDown();
      return;
    }
    else {
      var data = {username: $('#user').val(), password: $('#password').val()};
      console.log(data);
      $.post('http://localhost:3000/signup', data).done(function(response) {
        var alerts = "";
        if (response.password != null) {
          alerts += response.password + "\n";
        }
        if (response.password_confirm != null) {
          alerts += response.password_confirm + "\n";;
        }
        if (response.email != null) {
          alerts += response.email + "\n";
        } 
        console.log("response",response);
        alert (alerts);
      });
    }
  })  
  $("#loginBTN").click( function() {
    var data = {username: $('#user').val(), password: $('#password').val()};
    $.post('http://localhost:3000/login', data).done(function(response) {
    console.log(response);
      if (response.slice(0,11) == 'User Found:') 
      console.log(response);
      if (response == 'Login Successful') {
        goToPage($('#loginBTN').attr("value"));
      }
    });
  })  
});