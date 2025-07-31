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
// If the credentials are valid, it generates a JWT token and returns it.
const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Credenciais inválidas');

  const token = jwt.generateToken({ id: user.id, name: user.name, email: user.email });
  return token;
};

module.exports = { register, login };
