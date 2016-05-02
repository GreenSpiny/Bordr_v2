var request = module.exports =  
function () { 

  // Handle Page Routing
  app.get("*", function(req, res) {
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
    CreateUser(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/createInterest', function (req, res) {
    CreateInterest(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/createEvent', function (req, res) {
    CreateEvent(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/login', function (req, res) {
    ValidateUser(req, req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/checkLogin', function(req, res) {
    CheckLogin(req, function(data) {
      res.send(data);
    });
  })

  app.post('/logout', function (req, res) {
    Logout(req, function(data) { 
      res.send(data);
    });
  });

  app.post('/autofill', function (req, res) {
    Autofill(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/userinfo', function (req, res) {
    UserInfo(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/interestinfo', function (req, res) {
    InterestInfo(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/eventinfo', function (req, res) {
    EventInfo(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/relationship', function (req, res) {
    Relationship(req.body, function(data) { 
      res.send(data);
    });
  });

  app.post('/createEvent', function (req, res) {
    CreateEvent(req.body, function(data) {
      res.send(data);
    });
  })

  app.post('/getUserEvents', function (req, res){
    GetUserEvents(req.body[0], function(data) {
      res.send(data);
    });
  })

  app.post('/saveChanges', function (req, res) {
    UpdateEvent(req.body, function(data) {
      res.send(data);
    });
  })

  app.listen(3000, function() {});
}


function CreateUser (signup_info, callback) {
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

  // Database Insertion
  collection = mongo.db.collection('users');    
  collection.insert(user, {w:1}, function(db_err, result) { 
    if (err != null) 
      err['database'] = db_err;
    callback(err);
  });
}

function CreateInterest (new_interest, callback) {
  var err = {};
  var rx_Alphanumeric = /^([0-9]|[a-z])+([0-9a-z]+)$/i;

  if (new_interest.title.length < 3 || new_interest.title.length > 15 || !rx_Alphanumeric.test(new_interest.title))
    err['title'] = "Event title must be between 3 and 15 alphanumeric characters";
  if (new_interest.description.length > 250)
    err['description'] = "Event name must be under 250 characters";
  
  // Database Insertion
  collection = mongo.db.collection('interests');    
  collection.insert(new_interest, {w:1}, function(db_err, result) { 
    if (err != null) 
      err['database'] = db_err;
    callback(err);
  });
}

function CreateEvent (new_interest, callback) {
  var err = {};
  var rx_Alphanumeric = /^([0-9]|[a-z])+([0-9a-z]+)$/i;

  if (new_interest.title.length < 3 || new_interest.title.length > 15 || !rx_Alphanumeric.test(new_interest.title))
    err['title'] = "Event title must be between 3 and 15 alphanumeric characters";
  if (new_interest.description.length > 250)
    err['description'] = "Event name must be under 250 characters";
  
  // Database Insertion
  collection = mongo.db.collection('interests');    
  collection.insert(new_interest, {w:1}, function(db_err, result) { 
    if (err != null) 
      err['database'] = db_err;
    callback(err);
  });
}

function LinkEntries (link_data, callback) {
  var err = {};
  var collection1 = link_data.collection1;
  var collection2 = link_data.collection2;
  var col1entry = link_data.entries[0];
  var col2entries = link_data.entries[1];

}

function ValidateUser (req, credentials, callback) {
  var err = {};
  var collection = mongo.db.collection('users');
  collection.findOne(credentials, function(db_err, record) {
    if (db_err) {
      err['database'] = db_err;
      callback({'err': err, 'user': null});
    }
    else if (record && (record.username != "") ) {
      req.login_cookie.user = record;
      callback({'err': null, 'user': record});
    }
    else {
      err['credentials'] = 'Invalid Credentials';
      callback({'err': err, 'user': null});
    }
  });
}

function CheckLogin(req, callback) {
  if (req.login_cookie && req.login_cookie.user) {
    console.log(req.login_cookie.user);
    callback(req.login_cookie.user);
  }
  else {
    callback(false);
  }
}

function Logout(req, callback) {
  req.login_cookie.destroy();
  callback("Logged Out");
}

function UserInfo (user_ids, callback) {
  var err = {};
  var collection = mongo.db.collection('users');

  var formatted_ids = [];
  user_ids.values.forEach( function (user_id) {
    formatted_ids.push(mod.mongo.ObjectId(user_id));
  });

  var users = [];
  var cursor = collection.find({"_id": {$in: formatted_ids}});
  cursor.each( function(err, doc) {
    if (err)
      callback(err);
    else if (doc != null)
      users.push(doc);
    else 
      callback(users);
  });
}

function InterestInfo (interest_ids, callback) {
  var err = {};
  var collection = mongo.db.collection('interests');

  var formatted_ids = [];
  interest_ids.values.forEach( function (interest_id) {
    formatted_ids.push(mod.mongo.ObjectId(interest_id));
  });

  var interests = [];
  var cursor = collection.find({"_id": {$in: formatted_ids}});
  cursor.each( function(err, doc) {
    if (err)
      callback(err);
    else if (doc != null)
      interests.push(doc);
    else 
      callback(interests);
  });
}

function EventInfo (event_ids, callback) {
  var err = {};
  var collection = mongo.db.collection('events');

  var formatted_ids = [];
  event_ids.values.forEach( function (event_id) {
    formatted_ids.push(mod.mongo.ObjectId(event_id));
  });

  var events = [];
  var cursor = collection.find({"_id": {$in: formatted_ids}});
  cursor.each( function(err, doc) {
    if (err)
      callback(err);
    else if (doc != null)
      events.push(doc);
    else 
      callback(events);
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

function CreateEvent(event_data, callback) {
  var eventListing = {name: event_data.query.n, tags: event_data.query.t, description: event_data.query.d, isPrivate: event_data.query.p};
  collection = mongo.db.collection('events');
  collection.insert(eventListing, function(db_err, result) {
    if (db_err) {
      console.log(db_err);
      callback(err);
    }
    else {
      callback("Event successfully created!");
    }
  })
}

function GetUserEvents(user_id, callback) {
  var eventsList = [];
  var collection = mongo.db.collection('events');
  var cursor = collection.find({ 'participants': user_id });
  cursor.each( function(err, doc) {
    if (doc != null)
      eventsList.push(doc);
    else 
      callback(eventsList);
  });
}

function UpdateEvents(req, client) {
  //console.log(req.query.id);
  //collection = mongo.db.collection('events');

}















