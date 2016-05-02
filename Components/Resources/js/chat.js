// load socket.io-client
var socket = io();

//declare Angular app name
var app = angular.module("chatApp", []);

//add controller to app
app.controller("chatController",
function($scope, $http) {
	//I swear to you, this will not work. Thus the janky-not-so-angular solution
	// $scope.messages = [{message: "Yo!"},{message: "Hello"}];

	$scope.send = function() {
		if (!($scope.message == "")) {
			socket.emit("send", {message: $scope.message});
		}
	}

	socket.on("recieve", function(data){
		console.log(data.message);
		var message = data.message
		var string = "";
            string += ' <li> ';
            string +=   data.message.message;
            string += ' </li> ';
        document.getElementById('conversation').innerHTML += string; 
	});
});