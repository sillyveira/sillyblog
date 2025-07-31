const jwt = require('jsonwebtoken');

const addUserHeaders = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave-secreta');
      
      // Add user info as headers for the proxy to forward
      req.headers['x-user-id'] = decoded.id?.toString();
      req.headers['x-user-name'] = decoded.name;
      req.headers['x-user-email'] = decoded.email;
    }
  } catch (error) {
    // Don't block the request if JWT is invalid, let the target service handle it
    console.log('JWT decode error in gateway:', error.message);
  }
  
  next();
};

module.exports = { addUserHeaders };
