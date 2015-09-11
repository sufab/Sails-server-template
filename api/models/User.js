var bcrypt = require('bcryptjs');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6
        },
        facebookId: {
          type: 'string',
          unique: true
        },
        googleId: {
          type: 'string',
          unique: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        // only for local auth
        if (user.password) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        console.log(err);
                        cb(err);
                    } else {
                        user.password = hash;
                        cb();
                    }
                });
            });
        }
        else {
            cb();
        }
    },
    beforeUpdate: function(valuesToUpdate, cb) {
        // not editable fields
        delete valuesToUpdate.username;
        delete valuesToUpdate.facebookId;
        delete valuesToUpdate.googleId;
        cb();
    }
    
};
