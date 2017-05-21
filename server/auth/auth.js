const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });
const User = require('../api/user/userModel');

exports.decodeToken = () => {
  return (req, res, next) => {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    checkToken(req, res, next);
  };
};

exports.getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id)
      .then(user => {
        if (!user) {
          res.status(401).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      })
      .catch((err) => next(err));
  };
};

exports.verifyUser = () => {
  return (req, res, next) => {
    const username = req.body.email;
    const password = req.body.password;

    if (!username || !password) {
      res.status(400).send('You need a username and password');
    }

    User.findOne({ email: username })
      .then(user => {
        if (!user) {
          res.status(401).send('No such user in the database');
        } else {
          if (!user.authenticate(password)) {
            res.status(401).send('Incorrect username or passwword');
          } else {
            req.user = user;
            next();
          }
        }
      })
      .catch(() => next(new Error('Error fetching the user')));
  };
};

// util method to sign tokens on signup
exports.signToken = (id) => {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  );
};
