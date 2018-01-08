const mainRoutes = require('./main/routes')
const apiRoutes = require('./api/routes')

module.exports = function(app, db) {
  mainRoutes(app, db)
  apiRoutes(app, db)
}
