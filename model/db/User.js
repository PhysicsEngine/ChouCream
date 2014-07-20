var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var MONGOHQ_URL = process.env['MONGOHQ_URL'];


/**
 *  This model represents user account 
 *
 *  @param username
 *  @param token
 *  @param icon_url 
 *  @param callback
 */
function User(username) {
    var self = this;
    self.name = username;
}
/**
 *  Fetch data from MongoHQ instance
 *
 *  @param callback
 */
User.prototype.fetch = function(callback) {
    var self = this;
    function selectAction(collection, closeCb) {
        collection.find({username:self.name}).toArray(function(err, results) {
            closeCb(err, results);
        });
    }

    self.connect(selectAction, function(err, results) {
        if (! results.length == 1) {
            console.log("There is mode than one record");
            throw err;
        }
        self.token = results[0].token;
        self.icon_url = results[0].icon_url;
        callback(err, results[1]);
    });
}

/**
 *  Create user object
 *
 *  @param callback
 */
User.prototype.save = function(callback) {
    var self = this;
    var username = self.name;
    var token = self.token;
    var icon_url = self.icon_url;
    function insertAction(collection, closeCb) {
        collection.insert({username: username, token: token, icon_url: icon_url}, function(err, results) {
            // Closing db resource
            closeCb(err, results);
        });
    }

    self.connect(insertAction, callback);
}

/**
 *  Remove instance method
 *
 *  @param username
 *  @param callback
 */
User.prototype.remove = function(callback) {
    var self = this;
    var username = self.name;
    function removeAction(collection, closeCb) {
        collection.remove({username: username}, function(err, results) {
            closeCb(err, results);
        });
    }

    self.connect(removeAction, callback);
}


/**
 *  Instance  method for creating connection 
 *
 *  @param action
 *  @param callback
 */
User.prototype.connect = function(action, callback) {
    MongoClient.connect(MONGOHQ_URL, function(err, db) {
        if(err) throw err;
        var collection = db.collection('user');

        // Do action for example CRUD
        action(collection, function(err, results) {
            db.close();
            callback(err, results);
        });
    });
}


module.exports = User;