var request = module.exports =  
function () { 

  // Handle Page Routing
  app.get("/", function(req, res) {
    if (req.login_cookie && req.login_cookie.user) {
      logged_in = true;
    }
    var extension = req.originalUrl;
    if (extension == '' || extension == '/')

      res.render(mod.path.join(loc.root, 'Components/Pages'));
  });

  app.get('/chat', function(req, res) {
    res.render(mod.path.join(loc.root, 'Components/Pages/chat.html'));
  });

  // Handle Post Requests
  app.post('/signup', function(req, res) {
    AddUser(req.body, res);
  });

  app.post('/login', ValidateUser);

  app.post('/startChat', function(req, res) {
    console.log(req.body);
    if (req.body.event != null){
      findEvent(req.body, res);
    }
    else if (req.body.users != null){
      findUsers(req.body, res);
    }
    else {

    }
  });

  io.on("connection",function(socket) {
    console.log("connect");

    socket.on("send",function(data){
      var id = ObjectId(data.room.toString());
      collection = mongo.db.collection('chats');    
      collection.update({"_id": id}, { $push: { messages: data.message } }, function(db_err, result) {});
      collection.findOne({"_id" : id}, function(db_err, record) {
      });
      io.sockets.in(data.room).emit("recieve", data.message[0]);
    });

    socket.on('room', function(data) {
      var id = ObjectId(data.room.toString());
      socket.join(data.room);
      collection = mongo.db.collection('chats')
      collection.findOne({"_id" : id}, function(db_err, record) {
        if (!(record == null || record.messages == undefined)) {
          for (var i = 0; i < record.messages.length; i++) {
            socket.emit("recieve",record.messages[i][0]); 
          }   
        }
      });
    });

    socket.on('disconnect', function(data){
      socket.leave(data.room);
    });

  });
}


function AddUser (user, client) {
  err = {};

  // Validate Username
  var rx_Alphanumeric = /^([0-9]|[a-z])+([0-9a-z]+)$/i
  if (user.username.length < 3 || user.username.length > 15 || !rx_Alphanumeric.test(user.username))
    err['username'] = "Username must be between 3 and 15 alphanumeric characters";

  // Validate Password
  if (user.password.length < 8 || user.password.length > 15 || !rx_Alphanumeric.test(user.username))
    err['password'] = "Password must be between 8 and 15 alphanumeric characters";
  if (user.confirm != user.password){
    err['confirm'] = "The entered passwords do not match";
}
  // Validate Email
  var rx_EmailAddress = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!rx_EmailAddress.test(user.email))
    err['email'] = "Please enter a valid email address";

  // Database Insertion
  collection = mongo.db.collection('users');    
  collection.insert(user, {w:1}, function(db_err, result) { 
    if (err != null) 
      err['database'] = db_err;
    client.send(err);
  });
}

function ValidateUser (req, res) {
  err = {};
  user = req.body;
  collection = mongo.db.collection('users');
  collection.findOne(user, function(db_err, record) {
    if (db_err) {
      console.log(db_err);
      err['database'] = db_err;
    }
    else if (record && (user.username != "") ) {
      req.login_cookie.user = user;
      res.send("Login Successful");
    }
    else {
      res.send("Invalid Credentials");
    }
  });
}

function findEvent(req, res) {
  collection = mongo.db.collection('chats');
  collection.findOne({event: req.event}, function(db_err, record) {
    if (db_err) {
      console.log(db_err);
    }
    else if (record) {
      res.send(record._id);
    }
    else {
      addChat(req,res);
    }
  });
}

function findUsers(req, res) {
  console.log("USERS",req.users[0]);
  collection = mongo.db.collection('chats');
  collection.findOne({users: req.users[0], users: req.users[1]}, function(db_err, record) {
    if (db_err) {
      console.log(db_err);
    }
    else if (record) {
      res.send(record._id);
    }
    else {
      addChat(req,res);
    }
  });
}

function addChat(chat, res) {
  collection = mongo.db.collection('chats');
  collection.insert(chat, {w:1}, function(db_err, result) { 
    console.log(chat);
    if (db_err) {
      console.log(db_err);
    }  
    res.send(chat._id);
  });
}