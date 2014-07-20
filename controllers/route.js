function index(req, res){
    if(req.url == "/"){
        path = "./login";
    }
    else{
        path = "./" + req.url;
    }
    controller = require(path + "/executer.js");
    controller.execute(req, res);
}

exports.index = index;
