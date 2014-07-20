// web.js
var express = require("express");
var logfmt = require("logfmt");
var dynamicPassport = require('./libs/DynamicPassport.js');
var route = require("./route.js");
var ECT = require('ect');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//ECT env
app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
app.set('view engine', 'ect');

// page controlloer
var paths = ["/", "/login", "/timeline"];
var postApis = ["post"];
var getApis = [];

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.cookieParser());
    app.use(express.session({secret: 'session'}));
    app.use(express.static(__dirname + '/public'));
    app.use(logfmt.requestLogger());
    app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
    app.set('view engine', 'ect');
    dynamicPassport.initialize(app);
    app.use(express.bodyParser());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// login route setting
dynamicPassport.routes(app);

// allowed path setting
var path = ["/", "/login", "/timeline"]
// set route for page controller
for (var i = 0; i < paths.length; i++){
    app.get(paths[i], route.index);
}

// set route post api services
for (var i = 0; i < postApis.length; i++){
    path = "/service/" + postApis[i];
    app.post(path, route.service);
}

// set route get api services
for (var i = 0; i < getApis.length; i++){
    path = "/service/" + getApis[i];
    app.get(path, route.service);
}


// web socket
io.on('connection', function(socket){
    console.log("Connected");
    socket.on('post', function(post){
        var User = require("./models/db/User.js");
        var user = new User(post.username);
        user.post(post.content, post.icon_url, function(err, results){
            if(err){
                throw err;
            }
            else{
                io.emit('post', post);
            }
        })
    });
});
    

http.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});
