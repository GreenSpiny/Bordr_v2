var request = module.exports =  
function () { 

  // Handle Page Routing
  app.get("*", function(req, res) {
    if (req.login_cookie && req.login_cookie.user) {
      logged_in = true;
    }
    var extension = req.originalUrl.toLowerCase();

    if (extension.slice(0,9) == '/scripts/') {
      var path  = mod.path.join(loc.frontend_scripts, extension.slice(9));
      res.sendFile(path);
    }
    // If the exension is empty, redirect to the index page
    else if (extension == '' || (extension == '/' && extension.length == 1) ) {
      res.render(mod.path.join(loc.pages));
    }
    // Otherwise, try to render a page with the extension name, 404 on error
    else {
      res.render(mod.path.join(loc.pages + extension), {}, function(err, html) {
        if (err) {
          console.log(mod.path.join(loc.pages + extension) + "does not exist. Redirecting...");
          res.redirect('/404');
        }
        else {
          res.send(html);
        }
      });
    }
  });

  // Handle Post Requests 
  app.post('/signup', function (req, res) {
    AddUser(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/login', function (req, res) {
    ValidateUser(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/autofill', function (req, res) {
    Autofill(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/userinfo', function (req, res) {
    UserInfo(req.body[0], function(data) { 
      res.send(data);
    });
  });

  app.post('/relationship', function (req, res) {
    Relationship(req.body, function(data) { 
      res.send(data);
    });
  });

  app.listen(3000, function() {});
}


function AddUser (signup_info, callback) {
  var err = {};

  // Validate Username
  var rx_Alphanumeric = /^([0-9]|[a-z])+([0-9a-z]+)$/i
  if (signup_info.username.length < 3 || signup_info.username.length > 15 || !rx_Alphanumeric.test(signup_info.username))
    err['username'] = "Username must be between 3 and 15 alphanumeric characters";

  // Validate Password
  if (signup_info.password.length < 8 || signup_info.password.length > 15 || !rx_Alphanumeric.test(signup_info.username))
    err['password'] = "Password must be between 8 and 15 alphanumeric characters";
  if (signup_info.confirm != signup_info.password){
    err['confirm'] = "The entered passwords do not match";
}
  // Validate Email
  var rx_EmailAddress = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!rx_EmailAddress.test(signup_info.email))
    err['email'] = "Please enter a valid email address";

  var user = signup_info;
  user.friends = [];
  user.interests = [];
  user.participating_events = [];
  user.hosting_events = [];
  user.profile_picture = null;
  user.bio = null;

  console.log(err);

  // Database Insertion
  collection = mongo.db.collection('users');    
  collection.insert(user, {w:1}, function(db_err, result) { 
    if (err != null) 
      err['database'] = db_err;
    callback(err);
  });
}

function ValidateUser (credentials, callback) {
  var err = {};
  var collection = mongo.db.collection('users');
  collection.findOne(credentials, function(db_err, record) {

    if (db_err) {
      err['database'] = db_err;
    }
    else if (record && (user.username != "") ) {
      req.login_cookie.user = credentials;
      callback("Login Successful");
    }
    else {
      callback("Invalid Credentials");
    }
  });
}

function UserInfo (user_id, callback) {
  var err = {};
  var collection = mongo.db.collection('users');

  collection.findOne({"_id": mod.mongo.ObjectId(user_id)} , function(db_err, record) {
    if (db_err) {
      err['database'] = db_err;
      callback(err);
    }
    else {
      callback(record);
    }
  });
}

function Relationship(user_ids, callback) {
  var err = {};
  var user1_id = user_ids[0];
  var user2_id = user_ids[1];

  function SharedEntities(user1, user2, field) {
    var shared = [];
    for (var i = 0; i < user1[field].length; i++) {
      for (var j = 0; j < user2[field].length; j++) {
        if (user1[field][i] == user2[field][j]) {
          shared.push(user1[field][i]);
        }
      }
    }
    return shared;
  }

  UserInfo( user1_id, function(_user1) {
    var user1 = _user1;
    UserInfo( user2_id, function(_user2) {
      var user2 = _user2;

      var shared = {};
      shared.friends = SharedEntities(user1, user2, "friends");
      shared.interests = SharedEntities(user1, user2, "interests");
      shared.participating_events = SharedEntities(user1, user2, "participating_events");

      callback(shared);
    })
  });
}

function Autofill (data, callback) {

  var err = {};
  var value = data.value;
  property = data.property;
  collection = mongo.db.collection(data.collection);

  var possibilities = [];
  var rx_AutofillValue = new RegExp(value,"i");
  var query = {};

  query[property] = rx_AutofillValue;

  var cursor = collection.find(query);
  cursor.each( function(err, doc) {
    if (doc != null)
      possibilities.push(doc);
    else {
      callback(possibilities);
    }
  });  
}















