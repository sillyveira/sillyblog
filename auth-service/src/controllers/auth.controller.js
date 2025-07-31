const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password e nome são obrigatórios' });
    }

    const user = await authService.register({ email, password, name });
    
    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password são obrigatórios' });
    }

    const result = await authService.login({ email, password }, res);    
    res.cookie('token', result, { httpOnly: true, secure: false });

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token: result
    });
    
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };
