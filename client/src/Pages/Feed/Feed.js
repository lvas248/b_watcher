import PostsList from './PostsList'
import { useSelector } from 'react-redux';

function Feed(){
    const posts = useSelector( state => state.post.entity)
    return ( 
        <div className='max-w-[1050px] m-auto mt-[8vh] h-[92vh] overflow-auto'>

            <PostsList posts={posts}/>
        </div>
     );
}

export default Feed;
