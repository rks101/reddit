import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).end()
  }

  const session = await getSession({ req })

  if (!session) return res.status(401).json({ message: 'Not logged in' })

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })

  if (!user) return res.status(401).json({ message: 'User not found' })

  if (req.method === 'POST') {
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        post: {
          connect: {
            id: req.body.post,
          },
        },
        author: {
          connect: { id: user.id },
        },
      },
    })

    res.json(comment)
    return
  }
}