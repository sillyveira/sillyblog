const createProxy = require('../utils/createProxy');
const AUTH_SERVICE_PORT = process.env.authPort || 3000;

// Personalized proxy for post service to allow body parsing 
module.exports = createProxy({
  target: `http://localhost:${AUTH_SERVICE_PORT}`,
  pathRewrite: { '^/auth': '' }
});
