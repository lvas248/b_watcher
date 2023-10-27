import ImageCarousel from "./ImageCarousel";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

function Landing() {

    const history = useHistory()

    const loggedIn = useSelector( state => state.session.loggedIn )

    function navigateTo(path){
        history.push(`/${path}`)
    }

    return ( 
        <div className='pt-[15vh] h-screen overflow-auto'>

            <div className='px-[24px] flex flex-col'>

                <div className='pt-[40px] pb-[24px] overflow-hidden'>
                    <h1 className='text-[48px] font-bold text-center animate-glide-up-delayed h-fit '>Your Bird Watching Companion </h1>
                </div>

                <div className='overflow-hidden'>
                    <p className='text-[18px] text-center animate-fade-in'>
                        Document, Map, and Preserve Your Encounters
                    </p>
                </div>

                <div className='m-auto flex gap-10'>

                    <button onClick={()=>navigateTo('login')} className={`${loggedIn && 'hidden'} m-auto mt-[5vh] w-[150px] p-[20px] rounded-full text-sm border bg-black text-white`}>Login</button>
                    <button onClick={()=>navigateTo('signup')} className={`${loggedIn && 'hidden'} m-auto mt-[5vh] w-[150px] p-[20px] rounded-full text-sm border bg-black text-white`}>Signup</button>
                
                    <button onClick={()=>navigateTo('feed')} className={`${!loggedIn && 'hidden'} m-auto mt-[5vh] w-[150px] p-[20px] rounded-full text-sm border bg-black text-white`}>Go To Feed</button>
                
                </div>

            </div>

            <ImageCarousel />

            <div className='pt-[40px] pb-[24px] overflow-hidden flex flex-col gap-4'>
                <h1 className='text-[32px] text-center animate-glide-up-delayed h-fit '>Diary Entries</h1>
                <p className=' max-w-[550px] m-auto text-[18px] text-center animate-fade-in'>
                    Effortlessly document your birdwatching adventures. Each entry allows you to record not only the bird species you encounter but also an image, date, and location.                
                </p>
                
                <div className='m-auto max-w-[600px]'>
                    <img className='object-cover border border-black' alt='bird' src='https://images.unsplash.com/photo-1569411378499-565391f5ffe0?auto=format&fit=crop&q=80&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                </div>

            </div>

            <div className='pt-[40px] pb-[24px] overflow-hidden flex flex-col gap-4'>
                <h1 className='text-[32px] text-center animate-glide-up-delayed h-fit '>Map Your Encounter</h1>
                <p className=' max-w-[550px] m-auto text-[18px] text-center animate-fade-in'>
                    Map out exactly where you spotted your feathered friends. The interactive map feature lets you pin each sighting, making it easy to visualize your birdwatching journey and discover new hotspots.                </p>
                
                <div className='m-auto max-w-[600px]'>
                    <img className='object-cover border border-black' alt='bird' src='https://res.cloudinary.com/dfbe9u9zm/image/upload/v1698417254/Screenshot_2023-10-27_at_10.33.56_AM_hqjtue.png' />
                </div>

            </div>


        </div> 
    );
}

export default Landing;