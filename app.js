// web.js
var express = require("express");
var logfmt = require("logfmt");
var route = require("./controllers/route.js");
var ECT = require('ect');
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(logfmt.requestLogger());
    app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
    app.set('view engine', 'ect');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// allowed path setting
var path = ["/", "/login", "/timeline"]
for (var i = 0; i < path.length; i++){
    app.get(path[i], route.index);
}

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});
