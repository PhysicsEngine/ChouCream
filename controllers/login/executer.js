function execute(req, res){
    res.send("hello world");
    console.log(req)
}

exports.execute = execute;
