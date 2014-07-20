// web.js
var express = require("express");
var logfmt = require("logfmt");
var route = require("./route.js");
var ECT = require('ect');
var app = express();
// page controlloer
var paths = ["/", "/login", "/timeline"]
var services = ["post"]

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(logfmt.requestLogger());
    app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
    app.set('view engine', 'ect');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// set route for page controller
for (var i = 0; i < paths.length; i++){
    app.get(paths[i], route.index);
}

// set route api services
for (var i = 0; i < services.length; i++){
    path = "/service/" + services[i]
    app.get(path, route.service);
    app.post(path, route.service);
}

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});
