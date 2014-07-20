var User = require("../model/db/User.js");

describe("User model test", function() {
    it("should create user model instance", function() {
        var user = new User("kaisasak");
        expect(user.name).toBe("kaisasak");
    });

    it("should create into MongoHQ instance", function(done) {
        var user = new User("kaisasak");
        user.token = "123456789";
        user.icon_url = "http://example.com";
        user.save(function(err, results) {
            done();
        });
    });

    /*
    it("should remove from MongoHQ instance", function(done) {
        var user = new User("kaisasak");
        user.remove(function(err, results) {
            console.log(results);
            done();
        });
    });
    */

    it("should fetch user model from MongoHQ instance", function(done) {
        var user = new User("kaisasak");
        
        user.fetch(function(err, results) {
            expect(user.token).toBe("123456789");
            done();
        });
    });
});