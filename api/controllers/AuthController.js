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
            res.success('Logged out Successfully');
        }
        else
            res.error('Not logged in');
    },
    
    isLoggedIn: function(req, res) {
        var isLoggedIn = req.isAuthenticated();
        if (isLoggedIn) {
            return res.success(isLoggedIn, { ans: true, user: req.user });
        } else {
            return res.success(isLoggedIn, { ans: false });
        }
        
    },
    
// ####################################
// #########  Local   #################
// ####################################

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.error(info.message, { error: err });
            }
            req.logIn(user, function(err) {
                if (err) return res.error('Error trying to login (local)', { error: err });
                return res.success(info.message, { user: user });
            });

        })(req, res);
    },

// ####################################
// #########  Facebook   ##############
// ####################################
    
    'facebook': function (req, res, next) {
     passport.authenticate('facebook', { scope: ['email', 'user_photos']}, function (err, user, info) {
            if ((err) || (!user)) {
                return res.error(info.message, { error: err });
            }
            req.logIn(user, function(err) {
                if (err) return res.error('Error trying to login (Facebook)', { error: err });
                return res.success(info.message, { user: user });
            });
        })(req, res, next);
    },

    'facebook/callback': function (req, res, next) {
     passport.authenticate('facebook',
        function (req, res) {
            res.success('', { user: req.session.user });
        })(req, res, next);
    },
  
// ####################################
// #########  Google   ################
// ####################################

    'google': function (req, res, next) {
     passport.authenticate('google', { scope: 'email'}, function (err, user, info) {
            if ((err) || (!user)) {
                return res.error(info.message, { error: err });
            }
            req.logIn(user, function(err) {
                if (err) return res.error('Error trying to login (Google)', { error: err });
                return res.success(info.message, { user: user });
            });
        })(req, res, next);
    },

    'google/callback': function (req, res, next) {
     passport.authenticate('google',
        function (req, res) {
            res.success('', { user: req.session.user });
        })(req, res, next);
    }
};
