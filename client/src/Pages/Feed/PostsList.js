import PostCard2 from './PostCard2'
import { useHistory } from 'react-router-dom'

function PostsList({posts, postListRef}) {

    const history = useHistory()

    const renderPosts = posts?.map( p =>{
        return <PostCard2 key={p.id} post={p} />
    })

    return ( 
        <div id='postList' ref={postListRef} className='h-[83svh] md:pt-4 gap-5 max-w-[1050px] bg-slate-100 overflow-y-auto '>

            { posts.length > 0 ? renderPosts : <div className='h-[100%] w-[100%] bg-white grid place-content-center'> <button onClick={()=>history.push('/post')} className='bg-slate-200 p-2 border border-black rounded'>Create an Entry!</button>  </div> }
         
        </div>
     );
}

export default PostsList;