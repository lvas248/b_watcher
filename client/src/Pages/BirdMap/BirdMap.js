import { useSelector } from "react-redux";
import calculateBounds from "../../Helpers/calculateBounds";
import MapComp from "./MapComp";

function BirdMap() {

    const posts = useSelector(state => state.post.entity)
    const bounds = calculateBounds(posts)

 
    return ( 
    
        <div className='mt-[9vh]'>

            <MapComp posts={posts} bounds={bounds}/>

        </div> 
);
}

export default BirdMap;