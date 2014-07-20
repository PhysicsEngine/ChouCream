var User = require("../models/db/User.js");

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
            expect(results).not.toBe(null);
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

    it("should post text content into MongoHQ instance", function(done) {
        var user = new User("kaisasak");
        user.fetch(function(err, results) {
            user.post("Hi, Takahshi. I'm Kai.", function(err, results) {
                expect(results).not.toBe(null);
                done();
            });
        });
    });
});