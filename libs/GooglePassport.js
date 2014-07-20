var GoogleStrategy = require('passport-google').Strategy;
exports.initialize = function(config) {
    return new GoogleStrategy({
            returnURL: config.url + config.service.Google.callbackURL,
            realm: config.url
        },
        function(identifier, profile, done) {
            process.netTick(function() {
                user = {
                    id : identifier,
                    name : profile.emails[0].value,
                    icon : "",
                    profile : profile
                }
                return done(null, user);
            });
        }
    );
};

