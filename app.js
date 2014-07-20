var express = require('express');
var dynamicPassport = require(__dirname + '/libs/DynamicPassport.js');

var app = express();
app.configure(function(){
    app.use(express.cookieParser());
    app.use(express.session({secret: 'session'}));
    app.use(express.static(__dirname + '/public'));
    
    dynamicPassport.initialize(app);

});

dynamicPassport.routes(app);

app.get('/', function(req, res) {
   if(req.user) {
        res.send('success '+req.user.name+'<img src="'+req.user.icon+'"/>');
    }else {
        res.send('logincheck');

    } 
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
