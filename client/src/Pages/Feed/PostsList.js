import PostCard2 from './PostCard2'

function PostsList({posts, postListRef}) {

    const renderPosts = posts?.map( p =>{
        return <PostCard2 key={p.id} post={p} />
    })

    return ( 
        <div id='postList' ref={postListRef} className='grid gap-5 py-5 max-w-[1050px] bg-slate-100 h-[81vh] overflow-y-auto '>
            {renderPosts}
        </div>
     );
}

export default PostsList;