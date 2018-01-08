const User = require('../../models/user')

module.exports = function(app, db) {

  // Basic Home Route
  app.get('/', function(req, res) {
      res.send('Hello! The API');
  });

  // Setup Route
  app.get('/setup', function(req, res) {

    // Create a sample user
    var nick = new User({
      username: 'admin',
      password: 'admin1',
      admin: true
    });

    // Save the sample user
    nick.save(function(err) {
      if (err) throw err
      console.log('User saved successfully')
      res.json({ success: true })
    });

  });

};
