var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var MONGOHQ_URL = process.env['MONGOHQ_URL'];

function doAction(collectionName, action, callback) {
    MongoClient.connect(MONGOHQ_URL, function(err, db) {
        if(err) throw err;
        var collection = db.collection(collectionName);

        // Do action for example CRUD
        action(collection, function(err, results) {
            db.close();
            callback(err, results);
        });
    })
}

module.exports.doAction = doAction;