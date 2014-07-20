var PublicTL = require("../model/db/PublicTL.js");

describe("PublicTL model test", function() {
    it("should create user model instance", function() {
        var public_tl = new PublicTL();
        public_tl.fetch(10,function(err, results) {
            expect(results).not.toBe(null);
        });
    });
});