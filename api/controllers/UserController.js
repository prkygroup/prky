/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res) {
      User.create(req.body, function(err) {
        if (err) {
          res.send(500, {message: err});
        }
        else {
          sails.controllers.auth.login(req, res);
        }
      });
    }
};