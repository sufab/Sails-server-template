var bcrypt = require('bcryptjs');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            unique: true,
            maxLength: 9,
            minLength: 9
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
        email: {
            type: 'string',
            email: true
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        profileImg: {
            type: 'string'
        },
        isAdmin: {
          type: 'boolean',
          defaultsTo: false
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
            // TODO: check valid id of user --> if(isValidId(user.id)
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
        delete valuesToUpdate.password;
        delete valuesToUpdate.facebookId;
        delete valuesToUpdate.googleId;
        cb();
    }

};
