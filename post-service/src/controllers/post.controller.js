const postService = require('../services/post.service');

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({ error: 'Parâmetros de paginação inválidos' });
    }

    const result = await postService.getAllPosts(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'ID do post inválido' });
    }

    const post = await postService.getPostById(parseInt(id));
    
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }
    
    
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { id, name, email } = req.user; 
    const idToInt = parseInt(id);

    const post = await postService.createPost({
      title:title,
      content:content,
      id:idToInt,
      name:name,
      email:email
    });

    res.status(201).json({
      message: 'Post criado com sucesso',
      post
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id: postId } = req.params;

    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
    }

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { id: userId } = req.user;
    const post = await postService.updatePost(parseInt(postId), parseInt(userId), { title, content });

    res.json({
      message: 'Post atualizado com sucesso',
      post
    });
  } catch (error) {
    const status = error.message === 'Post não encontrado' ? 404 : 
                   error.message === 'Não autorizado a editar este post' ? 403 : 400;
    res.status(status).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { id } = req.user;
    const result = await postService.deletePost(req.params.id, parseInt(id));
    res.json(result);
  } catch (error) {
    const status = error.message === 'Post não encontrado' ? 404 : 403;
    res.status(status).json({ error: error.message });
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
