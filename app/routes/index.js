const appRoutes = require('./app_routes');
const notificationRoutes = require('./notification_routes');
const userRoutes = require('./user_routes');
module.exports = function(app, db) {
  appRoutes(app, db);
  notificationRoutes(app, db);
  userRoutes(app, db);
  // Other route groups could go here, in the future
};