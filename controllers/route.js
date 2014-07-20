function index(req, res){
    if(req.url == "/"){
        path = "./timeline";
    }
    else{
        path = "./" + req.url;
    }
    var controller = require(path + "/executer.js");
    controller.execute(req, res);
}

exports.index = index;
