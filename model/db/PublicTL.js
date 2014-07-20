var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var MONGOHQ_URL = process.env['MONGOHQ_URL'];
var ModelUtil = require('./ModelUtil.js');

function PublicTL() {
    var self = this;
}

PublicTL.prototype.fetch = function(limit, callback) {
    var self = this;
    function selectAction(collection, closeCb) {
        collection.find().limit(limit).toArray(function(err, results) {
            closeCb(err, results);
        });
    }

    ModelUtil.doAction('public_tl', selectAction, function(err, results) {
        callback(err, results);
    });
}


module.exports = PublicTL;

