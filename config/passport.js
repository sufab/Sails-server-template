var passport = require('passport'),
    bcrypt = require('bcryptjs'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var hostname = 'http://localhost';

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// ####################################
// #########  Local   #################
// ####################################

function findById(id, fn) {
  User.findOne(id).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {

    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (err) { return done(err); }

          if (!res)
            return done(null, false, { message: 'Invalid Password' });
          var returnUser = {
            username: user.username,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, { message: 'Logged In Successfully' });
        });
    });
  }
));

// ####################################
// #########  Facebook   ##############
// ####################################

function findByFacebookId(id, fn) {
  User.find({ facebookId: id }).exec(function (err, users) {
    if (err) {
      return fn(err, null);
    } else {
      var user = users.length ? users[0]: null;
      return fn(null, user);
    }
  });
}

passport.use(new FacebookStrategy({
    clientID: 'your-clientID',
    clientSecret: 'your-clientSecret',
    callbackURL: hostname + '/auth/facebook/callback',
    enableProof: false
  }, 
  function (accessToken, refreshToken, profile, done) {
    findByFacebookId(profile.id, function (err, user) {
      if (err) { return done(err); }

      if (!user) {
        User.create({
          facebookId: profile.id
        }).exec(function (err, user) {
          if (user) {
            return done(null, user, { message: 'Logged In Successfully' });
          } else {
            return done(err, null, { message: 'There was an error logging you in with Facebook' });
          }
        });

      // If there is already a user, return it
      } else {
        return done(null, user, { message: 'Logged In Successfully' });
      }
    });
  }
));



// ####################################
// #########  Google   ################
// ####################################


function findByGoogleId(id, fn) {
  User.find({ googleId: id }).exec(function (err, users) {
    if (err) {
      return fn(err, null);
    } else {
      var user = users.length ? users[0]: null;
      return fn(null, user);
    }
  });
}

passport.use(new GoogleStrategy({
    clientID        : 'your-clientID',
    clientSecret    : 'your-clientSecret',
    callbackURL     : hostname + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    findByGoogleId(profile.id, function (err, user) {

      if (err) { return done(err); }

      if (!user) {
        User.create({
          googleId: profile.id
        }).exec(function (err, user) {
          if (user) {
            return done(null, user, { message: 'Logged In Successfully' });
          } else {
            return done(err, null, { message: 'There was an error logging you in with Google' });
          }
        });

      // If there is already a user, return it
      } else {
        return done(null, user, { message: 'Logged In Successfully' });
      }
    });
  }
));
