var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var MONGOHQ_URL = process.env['MONGOHQ_URL'];
var ModelUtil = require('./ModelUtil.js');


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

User.prototype.post = function(content, icon_url, callback) {
    var self = this;

    function postAction(collection, closeCb) {
        collection.insert({userid: self._id, username: self.name, icon_url: icon_url, content: content}, function(err, results) {
            closeCb(err, results);
        });
    }

    ModelUtil.doAction("public_tl", postAction, function(err, results) {
        callback(err, results);
    });
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

    ModelUtil.doAction("users", selectAction, function(err, results) {
        if (! results.length == 1) {
            throw err;
        }
        self._id = results[0]._id;
        self.token = results[0].token;
        self.icon_url = results[0].icon_url;
        callback(err, results[0]);
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

    ModelUtil.doAction('users', insertAction, callback);
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

    ModelUtil.doAction('users', removeAction, callback);
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