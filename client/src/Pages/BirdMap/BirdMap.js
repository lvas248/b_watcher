import { useSelector } from "react-redux";
import MapComp from "./MapComp";
import getBounds from "../../Helpers/getBounds";

function BirdMap() {

    const posts = useSelector(state => state.post.entity)
    const bounds = getBounds(posts)

 
    return ( 
    
        <div className='page p-10'>
            
            <MapComp posts={posts} bounds={bounds}/>

        </div> 
);
}

export default BirdMap;