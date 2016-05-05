// load socket.io-client
var socket = io();

//declare Angular app name
var app = angular.module('chatApp',[]);

//add controller to app
app.controller("chatController",
function($scope, $http) {

  //this lovely little piece of code parses the relevant information from
  //url so it can be used by the socket to create the correct and unique chat room
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

  //parsed data is set into variables
  var event = data[0];
  var room;
  var name = data[1];
  var names;
  var data = {room: room, event:event, users:names};

  //post request to set up the unique chat room
  $.post('http://localhost:3000/startChat', data).done(function(response) {
    //unique id of the room
    room = response;
    //finds the id in the database and creates a chat room with that ID
    socket.emit('room', {room:room});
  }); 

  $scope.send = function() {
    //if the input is not blank
    if (!($scope.words == "" || $scope.words == undefined)) {
      //send it to the chat room to be broadcast
      socket.emit("send", {room: room, event:event, users: names, message: [{speaker: name, words: $scope.words}] });
    }
  }

  //when a tweet comes in
  socket.on("recieve", function(data){
    //empty the input box
    $scope.words = "";
    $scope.$apply();
    //append the new list item to chat window
    var string = "";
        string += ' <li class="message"> ';
        string +=   data.speaker;            
        string +=   ": ";            
        string +=   data.words;
        string += ' </li> ';
    document.getElementById('conversation').innerHTML += string; 
  });
});