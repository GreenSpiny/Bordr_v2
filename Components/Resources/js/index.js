var app = angular.module("Bordr", []);
//add controller to app
app.controller("controller0",
function($scope, $http) {
  var signup = false;
  $scope.user = "";
  $scope.password = "";
  $scope.confirm = "";
  $scope.email = "";

  $scope.logInClick = function() {
    var data = {username: $scope.user, password: $scope.password};
    $.post('http://localhost:3000/login', data).done(function(response) {
      console.log(response);
      console.log(1);
      if (response.slice(0,11) == 'User Found:') 
        console.log(2);
      if (response == 'Login Successful') {
        console.log(3);
        goToPage($('#loginBTN').attr("value"));
      }
    });

  }

  $scope.signUpClick = function() {
    if (!signup) {
      signup = true;
      $("#signUpInfo").slideDown();
      return;
    }
    else {
      var data = {username: $scope.user, password: $scope.password, confirm: $scope.confirm, email:$scope.email};
      console.log(data);
      $.post('http://localhost:3000/signup', data).done(function(response) {
         if (response.username != null) {
          $scope.errorUser = 'error';          
          $('#user').after('<div class="alert alert-warning">'+ response.username +'</div>');

        }
        if (response.password != null) {
          $scope.errorPassword = 'error';
          $scope.errorConfirm = 'error';
          $('#password').after('<div class="alert alert-warning">'+ response.password +'</div>');
        }
        if (response.confirm != null) { 
          $scope.errorPassword = 'error';
          $scope.errorConfirm = 'error';
          $('#confirm').after('<div class="alert alert-warning">'+ response.confirm +'</div>');
        }
        if (response.email != null) {
          $scope.errorEmail = 'error';
          $('#email').after('<div class="alert alert-warning">'+ response.email +'</div>');
        }
        $scope.$apply();
      });
    }
  }
  $scope.chat = function() {
    var data = {username: $scope.user, password: $scope.password, confirm: $scope.confirm, email:$scope.email};
    var form = document.createElement("form");

    form.setAttribute("method", "get");
    form.setAttribute("action", "http://localhost:3000/chat");
    form.setAttribute("target", "view");

    var hiddenField = document.createElement("input"); 
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "message");
    hiddenField.setAttribute("value", "val");
    form.appendChild(hiddenField);
    document.body.appendChild(form);
    window.open('', 'view', 'resizable=0,width=350,height=250');
    form.submit();

  }
});