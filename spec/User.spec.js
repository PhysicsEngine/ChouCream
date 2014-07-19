var User = require("../model/db/User.js");

describe("User model test", function() {
    it("should access MongoHQ instance", function(done) {
        var user = new User("kaisasak", "123456789", "http://example.com", function(err, docs) {
            expect(docs).not.toBe(null);
            done();
        });
    });
});