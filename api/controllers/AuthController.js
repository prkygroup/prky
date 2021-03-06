/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var passport = require('passport');

module.exports = {

    /**
     * In routes, we are mapping the route directly to the view instead of
     * going through this controller first. Just leaving it in here to remember
     * that it is an option.
     *
     * Max H. - 9/19/15
     * http://miscposts1.blogspot.com/2014/09/sailsjs-user-authentication.html
     */
    // login: function(req, res) {
    //     res.view();
    // },

    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if( (err)||(!user) ) {
                return res.send({
                    message: 'login failed'
                });
                res.send(err);
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                return res.send({
                    message: 'login successful'
                });
            });
        }) (req, res);
    },

    logout: function(req, res) {
        req.logOut();
        res.send('logout successful');
    },

    facebook: function (req, res, next) {
        passport.authenticate('facebook', {scope: 'email, user_about_me'},
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        req.session.flash = 'There was an error';
                        res.redirect('/login');
                    } else {
                        req.session.user = user;
                        res.redirect('/');
                    }
                });
            }
        )(req, res, next);
    },

    facebookCallback: function (req, res, next) {
        passport.authenticate('facebook',
            { successRedirect: '/', failureRedirect: '/login' }
        )(req, res, next);
    }

};

module.exports.blueprints = {
    actions: true,
    rest: true,
    shortcuts: true
};

