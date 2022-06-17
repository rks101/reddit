export const getPosts = async (prisma) => {
    const posts = await prisma.post.findMany({
      where: {},
      orderBy: [
        {
          id: 'desc',
        },
      ],
      include: {
        author: true,
      }
    })
  
    return posts
  }