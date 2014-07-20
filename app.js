var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
  console.log('serialize',user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('desrialize',obj);
  done(null, obj);
});

var app = express();
app.configure(function(){
    app.use(express.cookieParser());
    app.use(express.session({secret: 'session'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/public'));

    passport.use(new GoogleStrategy({
            returnURL: 'http://localhost:3000/auth/google/return',
            realm: 'http://localhost:3000/'
        },
        function(identifier, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                console.log('identifier', profile);
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
    ));
});

app.get('/success', function(req, res) {
    console.log('success',req.user);
    res.send('success'+req.user.displayName);
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return', passport.authenticate('google', 
        { failureRedirect : 'login.html',
          successRedirect : 'success'}
));

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

app.get('/hoge.txt', function(req, res){
  console.log(req);
  console.log(res);
  res.send('hoge');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
