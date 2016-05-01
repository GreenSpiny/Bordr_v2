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

  // Handle Post Requests
  app.post('/signup', function(req, res) {
    AddUser(req.body, res);
  });

  app.post('/login', ValidateUser);

  app.listen(3000, function() {});
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
    console.log (user.confirm, user.password);
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
    console.log(user);
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















