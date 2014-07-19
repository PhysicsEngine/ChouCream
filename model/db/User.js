var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var MONGOHQ_URL = process.env['MONGOHQ_URL'];

function User(username, token, icon_url, callback) {
    var self = this;
    MongoClient.connect(MONGOHQ_URL, function(err, db) {
        console.log('MongoClient.connect');
        if(err) throw err;

        var collection = db.collection('user');
        collection.insert({username: username, token: token, icon_url: icon_url}, function(err, docs) {
            console.log("insert");
            if (err) throw err;
            db.close();
            callback(err, docs);
        });
    });
}




module.exports = User;