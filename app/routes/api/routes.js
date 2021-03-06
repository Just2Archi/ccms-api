// User Model
const User = require('../../models/user')
// JSON Web Token for authentication
const jwt = require('jsonwebtoken')

module.exports = function(app, db) {

  // Login Route

  app.post('/api/login', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
      console.log('Ivestas username: ', req.body.username)
      console.log('Ivestas pswrd: ', req.body.password)
      if (err) throw err
      if (!user) {
        res.json({ success: false, message: 'Vartotojas nerastas.' })
      } else if (user) {
        if (user.password != req.body.password) {
          res.json({
            success: false,
            message: 'Neteisingai įvestas slaptažodis.'
          })
        } else {
          const payload = {
            admin: user.admin
          }
          const token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 1440 // expires in 24 hours
          })
          res.json({
            success: true,
            message: 'Prisijungta!',
            token: token,
            user: {
              id: user._id,
              username: user.username
            }
          })
        }
      }

    })
  });

  // Route middleware to verify a token
  app.use(function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

    if (token) {
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          throw err
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }

  });

  // Basic Home Route
  app.get('/api/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  // List All Users
  app.get('/api/users', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });

  // List One user by username
  app.get('/api/user', function(req, res) {
    User.findOne({ username: req.query.username }, function(err, user) {
      res.json(user);
    });
  });

  app.get('/api/logout', function(req, res) {
    res.json({ message: 'Sėkmingai atsijungėte' });
  });

};
