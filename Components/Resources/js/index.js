var signup = false;
$(document).ready( function() {
  $("#signupBTN").click( function() {
    if (!signup) {
      signup = true;
      $("#signUpInfo").slideDown();
      return;
    }
    else {
      var data = {username: $('#user').val(), password: $('#password').val(), confirm: $('#confirm').val(), email: $('#email').val()};
      console.log(data);
      $.post('http://localhost:3000/signup', data).done(function(response) {
        var alerts = "";
         if (response.username != null) {
          $('#user').addClass("error");
          $('#user').after('<div class="alert alert-warning">'+ response.username +'</div>');

        }
        if (response.password != null) {
          alerts += response.password + "\n";
          $('#password').addClass("error");
          $('#password').after('<div class="alert alert-warning">'+ response.password +'</div>');
        }
        if (response.confirm != null) {
          alerts += response.confirm + "\n";
          $('#password').addClass("error");
          $('#confirm').addClass("error");
          $('#confirm').after('<div class="alert alert-warning">'+ response.confirm +'</div>');
        }
        if (response.email != null) {
          alerts += response.email + "\n";
          $('#email').addClass("error");
          $('#email').after('<div class="alert alert-warning">'+ response.email +'</div>');
        }

        console.log("response",response);
      });
    }
  })  
  $("#loginBTN").click( function() {
    var data = {username: $('#user').val(), password: $('#password').val()};
    $.post('http://localhost:3000/login', data).done(function(response) {
      if (response.slice(0,11) == 'User Found:') 
      if (response == 'Login Successful') {
        goToPage($('#loginBTN').attr("value"));
      }
    });
  })  
});