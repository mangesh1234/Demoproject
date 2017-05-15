const storage = require('./storage/runmigration');
var routes = require('./routes');
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
storage()
  .then(() => {
    function unknownMethodHandler(req, res) {
      if (req.method.toLowerCase() === 'options') {
        // added Origin & X-Requested-With & **Authorization**
      const allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization'];

      if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
      res.header('Access-Control-Allow-Methods', res.methods.join(', '));
      res.header('Access-Control-Allow-Origin', req.headers.origin);

      return res.send(200);
    } else {
      return res.send(new restify.MethodNotAllowedError());
    }
  }
  routes(server);
  server.on('MethodNotAllowed', unknownMethodHandler);
  server.listen(8082, function() {
    console.log('%s listening at %s', server.name, server.url);
  });
});



//var restify = require('restify');
//
//// Authentication
//var passport        = require('passport');
//var LocalStrategy   = require('passport-local').Strategy;
//var sessions        = require("client-sessions");
//
//var server = restify.createServer();
//server.use(restify.queryParser());
//server.use(restify.bodyParser());
//
//server.use(sessions({
//    // cookie name dictates the key name added to the request object
//    cookieName: 'session',
//    // should be a large unguessable string
//    secret: 'yoursecret',
//    // how long the session will stay valid in ms
//    duration: 365 * 24 * 60 * 60 * 1000    
//}));
//
//// Initialize passport
//server.use(passport.initialize()); 
//// Set up the passport session
//server.use(passport.session());
//
//// This is how a user gets serialized
//passport.serializeUser(function(user, done) {
//    done(null, user.id);
//});
//
//// This is how a user gets deserialized
//passport.deserializeUser(function(id, done) {
//    // Look the user up in the database and return the user object
//    // For this demo, return a static user
//    return done(null, {id:123456, username:'john'});
//});
//
//// Lookup a user in our database
//var lookupUser = function(username, password, done) {
//    if(username === 'john' && password === 'johnspassword') {
//        return done(null, {id:123456, username:'john'});
//    }
//    
//    return done(null, false, { error: 'Incorrect username or password.' });
//};
//
//passport.use(new LocalStrategy({ usernameField: 'username', session: true }, lookupUser));
//
//
//
//
//
//// POST /login
//var loginRoute = function(req, res, next) {
//    // The local login strategy
//    passport.authenticate('local', function(err, user) {
//        if (err) {
//            return next(err);
//        }
//
//        // Technically, the user should exist at this point, but if not, check
//        if(!user) {
//            return next(new restify.InvalidCredentialsError("Please check your details and try again."));
//        }
//
//        // Log the user in!
//        req.logIn(user, function(err) {
//            if (err) { 
//                return next(err);
//            }
//            console.log(req.isAuthenticated());
//            req.session.user_id = req.user.id;
//
//            if(user.username) {
//                res.json({ success: 'Welcome ' + user.username + "!"});
//                return next();
//            }
//            
//            res.json({ success: 'Welcome!'});
//            return next();
//        });
//
//    })(req, res, next);
//};
//
//
//
//
//
//// GET /hello
//var helloRoute =function(req, res, next) {
//    console.log(req.isAuthenticated());
//    if(req.user) {
//        res.send("Hello " + req.user.username);
//    } else {
//        res.send("Hello unauthenticated user");
//    }
//
//    return next();
//};
//
//
//
//
//
//server.post({url:'/login'}, loginRoute);
//server.get({url:'/hello'}, helloRoute);
//
//var io = require('socket.io').listen(server);
//
///// Parse the given cookie header string into an object
///// The object has the various cookies as keys(names) => values
///// @param {String} str
///// @return {Object}
//var parseCookie = function(str, opt) {
//    opt = opt || {};
//    var obj = {}
//    var pairs = str.split(/[;,] */);
//    var dec = opt.decode || decodeURIComponent;
//
//    pairs.forEach(function(pair) {
//        var eq_idx = pair.indexOf('=')
//
//        // skip things that don't look like key=value
//        if (eq_idx < 0) {
//            return;
//        }
//
//        var key = pair.substr(0, eq_idx).trim()
//        var val = pair.substr(++eq_idx, pair.length).trim();
//
//        // quoted values
//        if ('"' == val[0]) {
//            val = val.slice(1, -1);
//        }
//
//        // only assign once
//        if (undefined == obj[key]) {
//            try {
//                obj[key] = dec(val);
//            } catch (e) {
//                obj[key] = val;
//            }
//        }
//    });
//
//    return obj;
//};
//
//io.set('authorization', function (handshakeData, accept) {
//    
//    // Check that the cookie header is present
//    if (!handshakeData.headers.cookie) {
//        return accept('No cookie transmitted.', false);
//    }
//    
//    // Get all the cookie objects
//    var cookie = parseCookie(handshakeData.headers.cookie);
//    
//    // Pull out the user from the cookie by using the decode function
//    handshakeData.sessionID = sessions.util.decode({cookieName: 'session', secret:'yoursecret'}, cookie['session']);
//
//    accept(null, true);
//});
//
//io.on('connection', function(socket) {
//    // Get the first key of the handshake data
//    var firstKey = Object.keys(socket.manager.handshaken)[0];
//    var userId = socket.manager.handshaken[firstKey].sessionID.content.user_id;
//    
//    // Send a hello message with the user's id
//    socket.emit('message', "Hey " + userId);
//});
//
//// Launch the server
//server.listen(5000, function() {
//    console.log('Server running at port 5000');
//});