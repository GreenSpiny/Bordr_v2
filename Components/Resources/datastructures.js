/////////////////////
// Data structures //
/////////////////////

// Person object
function person() {
  this.username = "";   // Username (unique)
  this.nickname = "";   // Nickname (anything)
  this.friends = [];    // List of friends, by username
  this.myevents = [];   // List of created events, by event ID
  this.events = [];     // List of events participating in, by event ID
  
  // Not included: password, email, alerts.
}

// Event object
function event() {
  this.id = 0;
  this.name = "";
  this.genre = "";
  this.description = "";
  this.date = "";
  this.time = "";
  this.creator = "";
  this.participants = "";
}

// Request a user from the database, and deposit the person object into an array
function getUser(array, username) {

}

// Request an event from the database, and deposit the event object into an array
function getEvent(array, id) {

}