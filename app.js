// web.js
var express = require("express");
var logfmt = require("logfmt");
var route = require("./controllers/route.js");
var app = express();

var path = ["/", "/login"]

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(logfmt.requestLogger());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

for (var i = 0; i < path.length; i++){
    app.get(path[i], route.index);
}

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});
