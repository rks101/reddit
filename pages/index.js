import Head from 'next/head'
import { getPosts } from 'lib/data.js'
import prisma from 'lib/prisma'
import Posts from 'components/Posts'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Reddit Clone</title>
        <meta name='description' content='A great social network!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Posts posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  let posts = await getPosts(prisma)
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts: posts,
    },
  }
}