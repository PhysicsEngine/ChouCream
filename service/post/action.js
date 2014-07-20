var User = require("../../models/db/User.js");

function action(req, res){
    var user = new User(req.user.name);
    user.post(req.body.content);
    try{
        user.post(req.body.content);
        res.end(201);
    }catch(e){
        res.end(500);
    }
}

exports.action = action;
