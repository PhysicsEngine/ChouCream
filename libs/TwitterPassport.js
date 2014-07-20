var TwitterStrategy = require('passport-twitter').Strategy;
var choucreamConfig = require('../choucream.config');
exports.initialize = function(config) {
    return new TwitterStrategy({
            consumerKey: config.service.Twitter.CONSUME_KEY,
            consumerSecret: config.service.Twitter.CONSUME_SECRET,
            callbackURL: choucreamConfig.WEB_URL + config.service.Twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            user = {
                id : profile.id,
                name : profile.username,
                icon : profile.photos[0].value,
                profile : profile
            }
            return done(null, user);
        }
    );
};
