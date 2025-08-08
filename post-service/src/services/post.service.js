const prisma = require('../prisma/client');

const getAllPosts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count()
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts: total,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};

const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  
  return post;
};

const createPost = async ({ title, content, id, name, email }) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: id,
      authorName: name,
      authorEmail: email
    },
  });
  return post;
};

const updatePost = async (postId, userId, { title, content }) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error('Post não encontrado');
  if (post.authorId !== userId) throw new Error('Não autorizado a editar este post');

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      updatedAt: new Date()
    },
  });
  
  return updatedPost;
};

const deletePost = async (postId, userId) => {
  const post = await prisma.post.findUnique({ where: { id: parseInt(postId) } });
  if (!post) throw new Error('Post não encontrado');
  if (post.authorId !== userId) throw new Error('Não autorizado a deletar este post');

  await prisma.post.delete({ where: { id: parseInt(postId) } });
  return { message: 'Post deletado com sucesso' };
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
