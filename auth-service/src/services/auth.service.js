const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');


// Verifies the user by their email, hashes the password, and creates a new user in the database.
// Returns the user ID, email, and name if the registration is successful.
const register = async ({ email, password, name }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email já registrado');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return { id: user.id, email: user.email, name: user.name };
};

// Authenticates the user by checking the email and password.
// If the credentials are valid, it generates a JWT token and sets it as a cookie.
const login = async ({ email, password }, res) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Credenciais inválidas');

  const token = jwt.generateToken({ userId: user.id });
  
  // Localstorage isn't secure, so cookies will be used to store the JWT token.
  // The tag 'secure' is set to false because of the local development environment.
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    sameSite: 'lax'
  });

  return { message: 'Login realizado com sucesso' };
};

module.exports = { register, login };
