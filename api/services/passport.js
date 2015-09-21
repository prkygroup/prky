var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email }).exec(function(err, user) {
            if(err) { return done(err); }
            if(!user) { return done(null, false, { message: 'Unknown user ' + email }); }
            bcrypt.compare(password, user.password, function(err, res) {
                if(!res) return done(null, false, {message: 'Invalid Password'});
                return done(null, user);
            });
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: "1494699380824184",
    clientSecret: "f6994310586cdffd9a2c149f8fceeed8",
    callbackURL: "http://localhost:1337/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails','photos'],
    enableProof: false
  }, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate(
        {facebookId: profile.id},
        {facebookId: profile.id,
         name: profile.displayName,
         email: profile.emails[0].value,
         profilePictureUrl: profile.photos[0].value},
        function (err, user) {
            done(err, user);
        });
  }
));