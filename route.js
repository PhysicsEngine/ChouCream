// route pages
function index(req, res){
    if(req.url == "/"){
        path = "./controllers/timeline";
    }
    else{
        path = "./controllers/" + req.url;
    }
    var controller = require(path + "/executer.js");
    controller.execute(req, res);
}

// route api
function service(req, res){
    var api = require("." + req.path + "/action.js");
    api.action(req, res);
}

exports.index = index;
exports.service = service;
