/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

// module.exports = {

//   attributes: {

//   }
// };

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        // override default toJSON
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
  },

  beforeCreate: function(user, cb) {
      // Remove passwordConfirm in request
      if (user.passwordConfirm)
        delete user.passwordConfirm;

      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                console.log(err);
                cb(err);
            } else {
                user.password = hash;
                // console.log(hash);
                cb(null, user);
            }
          });
      });
  },

  afterCreate: function (user, cb) {
    sails.hooks.email.send('newUserCreatedEmail',
      {
        newUserEmail: user.email
      },
      {
      to: "mharris7190@gmail.com",
      subject: "A new user was created with PRKY!"
    },
    function(err) {
      console.log(err || "It worked!");
      if (err) {
        cb(err);
      } else {
        cb(null, user);
      }
    });
  }
};