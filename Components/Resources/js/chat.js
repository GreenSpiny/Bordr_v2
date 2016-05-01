// load socket.io-client
var socket = io();

// on nick form submit, save nickname
$('#nickname-form').submit(function(){

  // save nick in session & greet
  sessionStorage.setItem("nickname", $('#nickname').val());
  
  // greet user
  $("#greeting").html('Welcome' + ' ' + $('#nickname').val() + '!');
  $('#nick').val('');
  
  return false;
});

// on chat form submit, send msg to server
$('#chat-form').submit(function(){
  
  // get nickname from session storage
var nick = sessionStorage.getItem("nickname");
  
  // append and emit message
  $('#messages').append($('<li>').text(nick + ': ' + $('#message').val()));
  socket.emit('message', nick + ': ' + $('#message').val());
  $('#message').val('');
  
  return false;
});

socket.on("connection", function() {
	console.log("CONNECT");
});

// on msg received, append to list
socket.on('message', function(msg){
	$('#messages').append($('<li>').text(msg));
});