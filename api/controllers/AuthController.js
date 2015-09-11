var passport = require('passport');

module.exports = {

    _config: {
        actions: true,
        shortcuts: false,
        rest: false
    },

    logout: function(req, res) {
        if (req.isAuthenticated()) {
            req.logout();
            res.ok('Logged out Successfully');
        }
        else
            res.badRequest('Not logged in');
    },
    
    isLoggedIn: function(req, res) {
        var isLoggedIn = req.isAuthenticated();
        res.ok(isLoggedIn);
    },
    
// ####################################
// #########  Local   #################
// ####################################

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.badRequest({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) return res.serverError(err);
                return res.ok({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

// ####################################
// #########  Facebook   ##############
// ####################################
    
    'facebook': function (req, res, next) {
     passport.authenticate('facebook', { scope: ['email', 'user_photos']},
        function (err, user, info) {

            if ((err) || (!user)) {
                return res.badRequest({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) return res.serverError(err);
                return res.ok({
                    message: info.message,
                    user: user
                });
            });
        })(req, res, next);
    },

    'facebook/callback': function (req, res, next) {
     passport.authenticate('facebook',
        function (req, res) {
            res.ok({ user: req.session.user });
        })(req, res, next);
    },
  
// ####################################
// #########  Google   ################
// ####################################

    'google': function (req, res, next) {
     passport.authenticate('google', { scope: 'email'},
        function (err, user, info) {
            
            if ((err) || (!user)) {
                return res.badRequest({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) return res.serverError(err);
                return res.ok({
                    message: info.message,
                    user: user
                });
            });
        })(req, res, next);
    },

    'google/callback': function (req, res, next) {
     passport.authenticate('google',
        function (req, res) {
            res.ok({ user: req.session.user });
        })(req, res, next);
    }
};
