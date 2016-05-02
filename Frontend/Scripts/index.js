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
      if (response == 'Login Successful') {
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
});

app.controller('Controller1', function($rootScope){
        $rootScope.loadEvents = function() {
          $rootScope.$broadcast('loadEvents', myEvents());
        }
      });

      app.controller('Controller2', function($scope, $http){
        $scope.searchEvent = function() {
          http({
            method: 'GET',
            url: '/searchEvent',
            params: {t: $scope.searchEvents, d: $scope.distance, f: $scope.friends}
          }).then(function successCallback(response){

          })
        }
      });

      app.controller('Controller3', function($scope, $http){
        $scope.createEvent = function(){
          $http({
            method: 'POST',
            url: '/createEvent',
            params: {n: $scope.eventName, t: $scope.eventTags, d: $scope.eventDesc, p:$scope.isPrivate}
          }).then(function successCallback(response) {
            $('#eventArea').hide();
            $('#resultsArea').show();
            document.getElementById('results').innerHTML = '<p>' + response.data + '</p>';
          })
        }
        $scope.showCreateEvent = function(){
          document.getElementById('results').innerHTML = '';
          $('#resultsArea').hide();
          document.getElementById('eventNameInput').value = '';
          document.getElementById('eventTagsInput').value = '';
          document.getElementById('eventDescriptionInput').value = '';
          $('#eventArea').show(); 
        }
      });

      app.controller('rootController', function($scope, $http){
        $scope.eventsFeed = [];
        $scope.$on('loadEvents', function() {
          $http({
            method: 'GET',
            url: '/getUserEvents'
          }).then(function successCallback(response) {
            for (var i=0; i < response.data.length; i++)
            {
              var string = "";
              string += ' <div class="eventObject space">'
              string += '   <div class="form-group row">'
              string += '     <div class="col-sm-2">'
              string += '       <p class="bg-1">Name:</p>'
              string += '     </div>'
              string += '     <div class="col-sm-7">'
              string += '       <input type="text" class="eventName form-control" value="' + response.data[i].name + '"></input>'
              string += '     </div>'
              string += '     <div class="col-sm-2">'
              string += '       <p class="bg-1">Public:</p>'
              string += '     </div>'
              string += '     <div class="col-sm-1">'
              string += '       <input type="checkbox" class="eventFriends form-control col-sm-1"></input>'
              string += '     </div>'
              string += '   </div>'
              string += '   <div class="form-group row">'
              string += '     <div class="col-sm-2">'
              string += '       <p class="bg-1">Tags:</p>'
              string += '     </div>'
              string += '     <div class="col-sm-10">'
              string += '       <input type="text" class="eventTags form-control" value="' + response.data[i].tags + '"></input>'
              string += '     </div>'
              string += '   </div>'
              string += '   <div class="form-group row">'
              string += '     <div class="col-sm-12">'
              string += '       <textarea class="eventDescription form-control">' + response.data[i].description + '</textarea>'
              string += '     </div>'
              string += '   </div>'
              string += '   <div class="form-group row">'
              string += '     <div class="col-sm-4">'
              string += '       <button type="button" class="btn btn-success btn-block groupChat">Group Chat</button>'
              string += '     </div>'
              string += '     <div class="col-sm-4">'
              string += '       <button type="button" class="btn btn-success btn-block groupChat">View Attendees</button>'
              string += '     </div>'
              string += '     <div class="col-sm-4">'
              string += '       <button type="button" class="btn btn-primary btn-block groupChat" ng-click="saveChanges()">Save Chages</button>'
              string += '     </div>'
              string += '   </div>'
              string += ' </div>'
              document.getElementById('event-feed').innerHTML += string;
            }
          })
        })

      $scope.saveChanges = function(){
        $http({
            method: 'POST',
            url: '/saveChanges',
            params: {n: $scope.eventName, t: $scope.eventTags, d: $scope.eventDesc, p:$scope.isPrivate}
          }).then(function successCallback(response) {

        })
      }
    });




// var signup = false;
// $(document).ready( function() {
//   $("#signupBTN").click( function() {
//     if (!signup) {
//       signup = true;
//       $("#signUpInfo").slideDown();
//       return;
//     }
//     else {
//       var data = {username: $('#user').val(), password: $('#password').val(), confirm: $('#confirm').val(), email: $('#email').val()};
//       console.log(data);
//       $.post('http://localhost:3000/signup', data).done(function(response) {
//         var alerts = "";
//          if (response.username != null) {
//           $('#user').addClass("error");
//           $('#user').after('<div class="alert alert-warning">'+ response.username +'</div>');

//         }
//         if (response.password != null) {
//           alerts += response.password + "\n";
//           $('#password').addClass("error");
//           $('#password').after('<div class="alert alert-warning">'+ response.password +'</div>');
//         }
//         if (response.confirm != null) {
//           alerts += response.confirm + "\n";
//           $('#password').addClass("error");
//           $('#confirm').addClass("error");
//           $('#confirm').after('<div class="alert alert-warning">'+ response.confirm +'</div>');
//         }
//         if (response.email != null) {
//           alerts += response.email + "\n";
//           $('#email').addClass("error");
//           $('#email').after('<div class="alert alert-warning">'+ response.email +'</div>');
//         }

//         console.log("response",response);
//       });
//     }
//   })  
//   $("#loginBTN").click( function() {
//     var data = {username: $('#user').val(), password: $('#password').val()};
//     $.post('http://localhost:3000/login', data).done(function(response) {
//       if (response.slice(0,11) == 'User Found:') 
//       if (response == 'Login Successful') {
//         goToPage($('#loginBTN').attr("value"));
//       }
//     });
//   })  
// });