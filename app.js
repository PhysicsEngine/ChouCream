// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var ECT = require('ect');

//ECT env
app.engine('ect', ECT({ watch: true, root: __dirname + '/views', ext: '.ect' }).render);
app.set('view engine', 'ect');

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    res.send('This is ChouCream and supervisor test');
});
app.get('/ect', function(req,res){ res.render('index',{ 
    title: 'ect test title'
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
