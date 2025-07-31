const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'chave-secreta';

// Even if the JWT is invalid or cannot be decoded, the process continues.
// This is because some services don't require user information to work (like auth service).
const decodeJWT = (req, res, next) => {
  const authToken = req?.cookies?.token || false;
  if (!authToken) {
    req.user = undefined;
    console.log("sem token")
    return next();
    
  }

  // If the token is defined and valid, the user info is attached to the request
  try {
    const decoded = jwt.verify(authToken, SECRET);
    console.log("funcionou")
    req.user = decoded; 
    console.log(req.user);
    next();
  } catch (err) {
    req.user = undefined;
    console.log(err);
    return next();
  }
};

module.exports = decodeJWT;
