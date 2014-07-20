// web.js
var express = require("express");
var logfmt = require("logfmt");
var dynamicPassport = require('./libs/DynamicPassport.js');
var route = require("./controllers/route.js");
var ECT = require('ect');
var app = express();
var ECT = require('ect');

//ECT env
app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
app.set('view engine', 'ect');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.cookieParser());
    app.use(express.session({secret: 'session'}));
    app.use(express.static(__dirname + '/public'));
    app.use(logfmt.requestLogger());
    app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
    app.set('view engine', 'ect');
    dynamicPassport.initialize(app);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// login route setting
dynamicPassport.routes(app);

// allowed path setting
var path = ["/", "/login", "/timeline"]
for (var i = 0; i < path.length; i++){
    app.get(path[i], route.index);
}

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});
