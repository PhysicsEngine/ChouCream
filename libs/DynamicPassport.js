var passport = require('passport');
var config = require(__dirname + '/../passport.json');
var serviceHash = config.service;

var services = [];
for(var service in serviceHash) {
    services.push(require(__dirname + '/'  + service + 'Passport.js'));
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

exports.initialize = function(app){
    app.use(passport.initialize());
    app.use(passport.session());

    for(var i=0;i<services.length;i++) {
        passport.use(services[i].initialize(config));
    }
};

exports.routes = function(app) {
    for(var service in serviceHash) {
        //login
        //ToDo:Login状況をチェックして、Login済みなら処理をスルーするようにしたい
        app.get(serviceHash[service].loginURL,
            passport.authenticate(serviceHash[service].id));

        //callback
        app.get(serviceHash[service].callbackURL, 
            passport.authenticate(serviceHash[service].id,
                { failureRedirect : '/', successRedirect: '/'}));
    }

    app.get(config.loginURL, function(req, res) {
        res.redirect('/login.html');
    });

    app.get(config.logoutURL, function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
