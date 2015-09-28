var passport = require('passport'),
    bcrypt = require('bcryptjs'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook-token').Strategy,
    GoogleStrategy = require('passport-google-token').Strategy;

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
      return fn(err, null);
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
        return done(null, false, { message: 'שם משתמש או סיסמא לא נכונים' });
      }

      bcrypt.compare(password, user.password, function (err, res) {
          if (err) { return done(err); }

          if (!res)
            return done(null, false, { message: 'שם משתמש או סיסמא לא נכונים'  });

          return done(null, user, { message: 'Logged In Successfully' });
        });
    });
  }
));

// ####################################
// #########  Facebook   ##############
// ####################################

function findByFacebookId(id, fn) {
  User.findOne({ facebookId: id }).exec(function (err, user) {
    if (err) {
      return fn(err, null);
    } else {
      return fn(null, user);
    }
  });
}

passport.use(new FacebookStrategy({
    clientID: 'your-clientID',
    clientSecret: 'your-clientSecret'
  }, 
  function (accessToken, refreshToken, profile, done) {
    findByFacebookId(profile.id, function (err, user) {
      if (err) { return done(err); }
      
      if (!user) {
        var profileImg = '';
        if (profile.photos.length) {
            profileImg = profile.photos[0].value;
        }
        
        User.create({
          facebookId: profile.id,
          fullname: profile.displayName,
          profileImg: profileImg
        }).exec(function (err, user) {
          if (user) {
            return done(null, user, { message: 'Logged In Successfully' });
          } else {
            return done(err, null, { message: 'Error creating facebook user: ' +  profile.id});
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
  User.findOne({ googleId: id }).exec(function (err, user) {
    if (err) {
      return fn(err, null);
    } else {
      return fn(null, user);
    }
  });
}

passport.use(new GoogleStrategy({
    clientID: 'your-clientID',
    clientSecret: 'your-clientSecret'
  },
  function(accessToken, refreshToken, profile, done) {
    findByGoogleId(profile.id, function (err, user) {

      if (err) { return done(err, null, { message: 'There was an error trying to find googleId: ' + profile.id }); }
      
      if (!user) {
        var jsonProfile = profile._json;
        User.create({
          googleId: jsonProfile.id,
          fullname: jsonProfile.name,
          profileImg: jsonProfile.picture
        }).exec(function (err, user) {
          if (user) {
            return done(null, user, { message: 'Logged In Successfully' });
          } else {
            return done(err, null, { message: 'Error creating google user: ' +  profile.id});
          }
        });

      // If there is already a user, return it
      } else {
        return done(null, user, { message: 'Logged In Successfully' });
      }
    });
  }
));