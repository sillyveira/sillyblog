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

const deletePost = async (postId, userId) => {
    console.log(postId);
    console.log(userId);
  const post = await prisma.post.findUnique({ where: { id: parseInt(postId) } });
  console.log(post);
  if (!post) throw new Error('Post não encontrado');
  if (post.authorId !== userId) throw new Error('Não autorizado a deletar este post');

  await prisma.post.delete({ where: { id: parseInt(postId) } });
  return { message: 'Post deletado com sucesso' };
};

module.exports = { getAllPosts, createPost, deletePost };
