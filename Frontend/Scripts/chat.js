// load socket.io-client
var socket = io();

//declare Angular app name
var app = angular.module('chatApp',[]);

//add controller to app
app.controller("chatController",
function($scope, $http) {
  var url_ = window.location.href;
  var trap = false;
  var eventBool = false;
  var senderBool = false;
  var count = -1;
  var data = ["",""];
  for (i = 0; i < url_.length; i++) {
    if (trap) {
      if (url_[i] == "%") {
        trap = false;
        eventBool = false;
        count = 2;
      }
      if (eventBool) {
         data[0] += url_[i];
      }
      if (senderBool) {
         data[1] += url_[i];
      }
    }
    if (url_[i] == "=") {
      trap = true;
      eventBool = true;
    }
    if (count == 0) {
      trap = true;
      senderBool = true;
    }
    count--;
  }

  var event = data[0];
  var room;
  var name = data[1];
  var names;
  console.log(data);

  var data = {room: room, event:event, users:names};
  $.post('http://localhost:3000/startChat', data).done(function(response) {
    room = response;
    socket.emit('room', {room:room});
  }); 

  $scope.send = function() {
    if (!($scope.words == "" || $scope.words == undefined)) {
      socket.emit("send", {room: room, event:event, users: names, message: [{speaker: name, words: $scope.words}] });
    }
  }

  socket.on("recieve", function(data){
    console.log(data);
    $scope.words = "";
    $scope.$apply();
    var string = "";
            string += ' <li class="message"> ';
            string +=   data.speaker;            
            string +=   ": ";            
            string +=   data.words;
            string += ' </li> ';
        document.getElementById('conversation').innerHTML += string; 
  });
});