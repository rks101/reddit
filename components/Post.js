import timeago from 'lib/timeago'

export default function Post({ post }) {
  return (
    <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
      <div className='flex flex-shrink-0 pb-0 '>
        <div className='flex-shrink-0 block group '>
          <div className='flex items-center text-gray-800'>
            /r/{post.subredditName} Posted by {post.author.name}{' '}
            {timeago.format(new Date(post.createdAt))}
          </div>
        </div>
      </div>
      <div className='mt-5'>
				<p className='flex-shrink text-2xl font-bold color-primary width-auto'>          
					{post.title}
        </p>
				<p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
          {post.content}
        </p>
      </div>
    </div>
  )
}