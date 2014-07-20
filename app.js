// web.js
var express = require("express");
var logfmt = require("logfmt");
var route = require("./route.js");
var ECT = require('ect');
var app = express();

// page controlloer
var paths = ["/", "/login", "/timeline"];
var postApis = ["post"];
var getApis = [];

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(logfmt.requestLogger());
    app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
    app.set('view engine', 'ect');
    app.use(express.bodyDecoder());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// set route for page controller
for (var i = 0; i < paths.length; i++){
    app.get(paths[i], route.index);
}

// set route post api services
for (var i = 0; i < postApis.length; i++){
    path = "/service/" + postApis[i]
    app.post(path, route.service);
}

// set route get api services
for (var i = 0; i < getApis.length; i++){
    path = "/service/" + getApis[i]
    app.get(path, route.service);
}

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});
