var TwitterStrategy = require('passport-twitter').Strategy;
exports.initialize = function(config) {
    return new TwitterStrategy({
            consumerKey: config.service.Twitter.CONSUME_KEY,
            consumerSecret: config.service.Twitter.CONSUME_SECRET,
            callbackURL: config.url + config.service.Twitter.callbackURL
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
