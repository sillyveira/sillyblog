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
      ...user
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
    res.cookie('token', result.token, { httpOnly: true, secure: false });

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      ...result
    });
    
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false // Local development only
    });
    
    res.status(200).json({
      message: 'Logout realizado com sucesso'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'ID do usuário é obrigatório' });
    }

    const user = await authService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    if (name.length < 2) {
      return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres' });
    }

    if (name.length > 100) {
      return res.status(400).json({ error: 'Nome deve ter no máximo 100 caracteres' });
    }

    const result = await authService.updateUserProfile(userId, { name: name.trim() });
    
    if (!result || !result.user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Update cookie with new token containing updated user info
    res.cookie('token', result.token, { httpOnly: true, secure: false });

    res.status(200).json({
      message: 'Perfil atualizado com sucesso',
      user: result.user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, logout, getProfile, updateProfile };
