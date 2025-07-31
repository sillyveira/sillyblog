const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'chave-secreta', { expiresIn: '1h' });
};

module.exports = { generateToken };
