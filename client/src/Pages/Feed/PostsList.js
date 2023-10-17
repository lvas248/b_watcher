import PostCard2 from './PostCard2'

function PostsList({posts, postListRef}) {

    const renderPosts = posts?.map( p =>{
        return <PostCard2 key={p.id} post={p} />
    })


    return ( 
        <div id='postList' ref={postListRef} className='grid max-w-[1050px] bg-slate-100 h-[82vh] overflow-y-auto '>
            {renderPosts}
        </div>
     );
}

export default PostsList;