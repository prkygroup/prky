var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;
module.exports = {
    http: {
        customMiddleware: function(app) {
            console.log('Express middleware for passport');
            app.use( passport.initialize() );
            app.use( passport.session() );

            app.use(function(req, res, next){
                res.locals.user = req.session.user;
                next();
            });
        }
    }
};