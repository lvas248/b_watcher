import FilterBar from './FilterBar';
import PostsList from './PostsList'
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react'

function Feed(){

    const [ selectedBird, setSelectedBird ] = useState('')
    const postListRef = useRef()

    function scrollToTop(){
        postListRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    function updateSelectedBird(value){
        setSelectedBird(value)
        scrollToTop()

    }

    function resetSelectedBird(){
        setSelectedBird('')
        scrollToTop()

    }

    const posts = useSelector( state => state.post.entity)

    const filteredPosts = posts.filter( p => p.filtered_bird.name.includes(selectedBird))

  

    return ( 
        <div className='relative max-w-[1050px] mt-[8vh] mx-auto  h-[92vh] overflow-auto'>
            <FilterBar updateSelectedBird={updateSelectedBird} resetSelectedBird={resetSelectedBird} />
            <PostsList posts={filteredPosts} postListRef={postListRef}/>
        </div>
     );
}

export default Feed;

