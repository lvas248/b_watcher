import { useSelector } from "react-redux";
import bird from '../../Assets/Icons/icons8-bird-100.png'

function FilterBar(){

    const userBirds = useSelector( state => state.bird.entity.userBirds)

    const renderBirds = userBirds.map( b => {
        return  <button key={b.id} className='p-2 grid place-content-center'>
                    <img className='bg-cover h-[67px] bg-white rounded-full p-2' alt='bird' src={bird} />
                    <p className='text-center'>{b.name}</p>
                </button>
    } )

    return ( 
        <div className='sticky top-0 flex gap-2  w-full bg-slate-200 py-1 overflow-hidden'>
            {renderBirds}
        </div> 
    );
}

export default FilterBar;