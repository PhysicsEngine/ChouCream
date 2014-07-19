var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});

app.get('/', function(req, res) {
    res.send("This is ChouCream");
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});