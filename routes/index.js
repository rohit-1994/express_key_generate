`use strict`;

module.exports = (app) => {
  require('./authRoutes')(app);
  require('./fileRoutes')(app);
};