InitializeGlobals();
ConfigureSitemap();
mod.async.parallel([InitializeDatabase, InitializeSessionManager], AllowPageAccess);

function InitializeGlobals() {
  // Initialize Site-wide Modules
  global.mod = {
    async         : require('async'),
    express       : require('express'),
    path          : require('path'),
    bodyParser    : require('body-parser'),
    session       : require('client-sessions'),
    crypto        : require('crypto'),
    file          : require('fs'),
    mongo         : require('mongodb'),
    http          : require('http'),
    socket_io     : require('socket.io')
  }

  // Initialize Site Structure
  global.loc = {
    root                        : mod.path.dirname(require.main.filename),
    backend_scripts             : mod.path.join(mod.path.dirname(require.main.filename), 'Backend/Scripts'),
    system_data                 : mod.path.join(mod.path.dirname(require.main.filename), 'Backend/SystemData'),
    frontend_scripts            : mod.path.join(mod.path.dirname(require.main.filename), 'Frontend/Scripts'),
    pages                       : mod.path.join(mod.path.dirname(require.main.filename), 'Frontend/Pages'),
    resources                   : mod.path.join(mod.path.dirname(require.main.filename), 'Frontend/Resources')
  } 
 
  // Initialize Application
  global.app = mod.express();

  // Initialize Database Client
  global.client = mod.mongo.MongoClient;
  global.mongo = {
    url      : 'mongodb://localhost:27017/bordr'
  }

  global.logged_in = false;

  console.log("Global framework initialized")
}

function ConfigureSitemap() {
  // Configure Parser for HTTP Requests
  app.use(mod.bodyParser.urlencoded({extended: true}));

  // Configure View Folder
  var cons = require('consolidate');
  app.engine('html', cons.swig);
  app.set('views', loc.pages);
  app.set('view engine', 'html');

  // Configure Public (Static) Folder
  app.use(mod.express.static(loc.resources));

  console.log("Sitemap configured")
}

function InitializeDatabase(callback) {
  // Connect with client
  client.connect(mongo.url, function(err, db) {
    mongo.db = db;
    db.createCollection('users', function(collection_err, collection) {
      collection.createIndex({username: 1}, {unique: true}); 
    });
    db.createCollection('events', function(collection_err, collection) {
      collection.createIndex({title: 1}, {unique: true});
    })
    db.createCollection('interests', function(collection_err, collection) {
      collection.createIndex({title: 1}, {unique: true}); 
    });
    console.log("Database initialized")
    callback();
  });
}

// Read and Update Server Secrets
function InitializeSessionManager(callback) {
  // When the server is launched, if it has been a day since reboot, initialize a new session secret
  secret_path = mod.path.join(loc.system_data, 'secrets.json');

  // Read the old session secret
  mod.file.readFile(secret_path, 'utf8', function(err, data) {

    // Check if the secret is older than a day
    var now = new Date();
    var start_of_today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) / 1000;


    var secret;
    try { secret = JSON.parse(data); }
    catch (err) { secret = JSON.parse('{}'); }
    
    if (secret == null || secret.date == null || secret.codes == null)
      secret = {date : 0, codes : ''};
    if (secret.date < start_of_today)
      secret.code = mod.crypto.randomBytes(48).toString('hex');
    secret.date = start_of_today;

    // Write the new secret
    mod.file.writeFile(secret_path, JSON.stringify(secret), function() {

      // Link our sessions to the secret
      app.use(mod.session({
        cookieName: 'login_cookie',
        secret: secret.code,
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
      }));

      console.log("Secrets updated");
      callback();
    });
  });
}

function AllowPageAccess() {
  require(mod.path.join(loc.backend_scripts, 'request.js'))();
  console.log("Site operational");
}


