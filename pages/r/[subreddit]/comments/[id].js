import Link from 'next/link'
import prisma from 'lib/prisma'
import { getPost, getSubreddit } from 'lib/data.js'
import timeago from 'lib/timeago'

export default function Post({ subreddit, post }) {
  if (!post) return <p className='text-center p-5'>Post does not exist 😞</p>
  return (
    <>
      <Link href={`/`}>
        <a className='text-center p-5 underline block'>
          🔙 back to the homepage
        </a>
      </Link>
      <Link href={`/r/${subreddit.name}`}>
        <a className='text-center p-5 underline block'>
          🔙 back to /r/{subreddit.name}
        </a>
      </Link>

      <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
        <div className='flex flex-shrink-0 pb-0 '>
          <div className='flex-shrink-0 block group '>
            <div className='flex items-center text-gray-800'>
              Posted by {post.author.name}{' '}
              <p className='mx-2 underline'>
                {timeago.format(new Date(post.createdAt))}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-1'>
          <a className='flex-shrink text-2xl font-bold color-primary width-auto'>
            {post.title}
          </a>
          <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
            {post.content}
          </p>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const subreddit = await getSubreddit(params.subreddit, prisma)
	let post = await getPost(parseInt(params.id), prisma)
  post = JSON.parse(JSON.stringify(post))

  return {
    props: {
      subreddit,
      post,
    },
  }
}