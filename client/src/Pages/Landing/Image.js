import { useState } from "react";

function Image({src}) {
    
    const [ loaded, setLoaded ] = useState(false)
    
    function toggleLoaded(){
        setLoaded(!loaded)
    }
    
    return ( 

        <img onLoad={toggleLoaded} alt='bird' src={src} className={`${!loaded ? 'invisible':'visible'} bg-slate-400 w-[44vw] md:w-[40vw] lg:w-[30vw] rounded-3xl border border-black animate-fade-in`} />
     );
}

export default Image;