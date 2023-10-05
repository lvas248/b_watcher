import PostCard2 from './PostCard2'


function PostsList({posts}) {
    const renderPosts = posts?.map( p =>{
        return <PostCard2 key={p.id} post={p} />
    })
    return ( 
        <div className='flex flex-wrap place-content-center py-[2vh]'>
            {renderPosts}
        </div>
     );
}

export default PostsList;