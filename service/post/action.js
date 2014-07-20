var User = require("../../models/db/User.js");

function action(req, res){
    var user = new User(req.user.name);
    user.post(req.body.content);
}

exports.action = action;
