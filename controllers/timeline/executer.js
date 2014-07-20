var PublicTL = require("../../models/db/PublicTL.js");
var User = require("../../models/db/User.js");

function execute(req, res){
    var publicTL = new PublicTL();
    publicTL.fetch(10, function(error, timeline){
        if(error){
            res.send("ChouCream has some unko cream"); 
        }
        res.render('timeline', {timeline:timeline.reverse(), userInfo:req.user});
    });
}

exports.execute = execute;
