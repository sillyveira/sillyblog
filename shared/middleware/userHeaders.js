const extractUserFromHeaders = (req, res, next) => {
  // Check if user headers exist, if so, extract user information
  if (req.headers['x-user-id'] && req.headers['x-user-name'] && req.headers['x-user-email']) {
    req.user = {
      id: req.headers['x-user-id'] || null,
      name: req.headers['x-user-name'] || null,
      email: req.headers['x-user-email'] || null
    };
    
    // Remove null values
    Object.keys(req.user).forEach(key => {
      if (req.user[key] === null) {
        delete req.user[key];
      }
    });
  }
  
  next();
};

module.exports = { extractUserFromHeaders };
