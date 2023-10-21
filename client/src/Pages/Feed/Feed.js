import FilterBar from './FilterBar';
import PostsList from './PostsList'
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom' 
import { useEffect, useRef } from 'react'

function Feed(){

    const postListRef = useRef()
    const { search } = useLocation()
    const { id } = useParams()
    const searchParams = new URLSearchParams(search)

    const bird = searchParams.get('filter')

    const posts = useSelector( state => state.post.entity)

    const filteredPosts = posts.filter( p => p.filtered_bird.name.includes(bird||''))

  

    useEffect( ()=>{
        const post = document.getElementById(id)
        if(post && postListRef){
            setTimeout(()=>{
                post.scrollIntoView({ behavior: 'smooth'})           
            }, 100)
        }
    },[id, posts])

    return ( 
        <div className='relative max-w-[1050px] mt-[8vh] mx-auto  h-[92vh] overflow-auto'>
            <FilterBar postListRef={postListRef}/>
            <PostsList posts={filteredPosts} postListRef={postListRef}/>
        </div>
     );
}

export default Feed;

