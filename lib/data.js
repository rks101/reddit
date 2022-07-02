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

export const getSubreddit = async (name, prisma) => {
  return await prisma.subreddit.findUnique({
    where: {
      name,
    },
  })
}

export const getPostsFromSubreddit = async (subreddit, prisma) => {
  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        name: subreddit,
      },
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })

  return posts
}