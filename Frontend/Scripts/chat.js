// load socket.io-client
var socket = io();

//declare Angular app name
var app = angular.module('chatApp',[]);

//add controller to app
app.controller("chatController",
function($scope, $http) {
  var room;
  var event;
  var name = "Sender";
  var names = ["ConradTest1","ConradTest2"];

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