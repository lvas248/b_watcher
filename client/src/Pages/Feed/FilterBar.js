import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import bird from '../../Assets/Icons/icons8-bird-100.png'

function FilterBar({postListRef}){

    const history = useHistory()

    function filterBirds(bird){
        history.push(`/feed?filter=${bird}`) 
        postListRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })       
    }

    const birds = useSelector( state => state.bird.entity)

    const renderBirds = birds.userBirds?.map( b => {
        return  <button onClick={()=>filterBirds(b.name)} key={b.id} className=' overflow-hidden inline-block align-middle mr-4 p-1 drop-shadow-md'>
                    <img className='bg-cover h-[65px] w-[65px] bg-white rounded-full hover:sm:animate-scale-up drop-shadow-md' alt='bird' src={b.thumbnail} />
                    <p className='text-center text-[10px]'>{b.name}</p>
                </button>
    } )

    return ( 
        <div className='absolute top-0 pt-[8vh] h-[17vh] p-1 bg-white w-full max-w-[1050px] whitespace-nowrap overflow-x-auto drop-shadow-xl'>

            {
                birds && [ 
                    <button onClick={()=>history.push('/feed')} key='0' className='overflow-hidden inline-block align-middle mr-4 ' >
                        <img className='bg-cover h-[60px] w-[65px] rounded-full bg-slate-100 hover:sm:animate-scale-up' alt='bird' src={bird} />
                        <p className='text-center text-[10px]'>All Birds</p>
                    </button>,...renderBirds
                ]
            }

        </div> 
    );
}

export default FilterBar;