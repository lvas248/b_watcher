import BackGroundLayout from './BackgroundLayout';
import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'


function Landing() {

    const [ renderLogin, setRenderLogin ] = useState(true)

    function toggleRenderLogin(){
        setRenderLogin(!renderLogin)
    }

    const images = [ 
        {id: 1, src: 'https://images.unsplash.com/photo-1528753053312-73f5af145136?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1740'},
        {id: 2, src: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1888'},
        {id: 3, src: 'https://images.unsplash.com/photo-1616216724550-684bcd255c9f?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1636'},
        {id: 4, src: 'https://images.unsplash.com/photo-1549586073-f4c3b7ff044a?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJpcmR8ZW58MHx8MHx8fDA%3D&w=800'},
    ]

    const renderImages = images.map( i =>{
        return <div key={i.id} className='h-[25vw] max-h-[300px] flex'>
                    <div className={`h-[20vw] w-[22vw] max-w-[275px] max-h-[250px] ${ i.id % 2 === 0 && 'mt-auto'} `}>
                        <img className='object-cover h-full w-full rounded-3xl' alt='bird' src={i.src} />
                    </div>
                </div>
    })

    
    return ( 
        <div className='relative mt-[8vh] h-[92vh] overflow-hidden  max-w-[1400px] m-auto flex flex-col place-content-center p-10'>


            <h1 className='ml-[20vw] text-[65px]'>Bird Watcher </h1>
           

            <div className='w-full flex'>
                <p className='ml-auto mr-[10vw] w-[67%] sm:w-[40%] text-xs'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

            {/* <p>Record, Identify, and Map your bird sightings.</p> */}

            <div className='flex gap-2 mt-[5vh] mx-auto'>

                { renderImages }

            </div>

            {/* <BackGroundLayout />

            <div className='absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                
                <h1 className='text-[50px] text-center'>Bird Watcher</h1>

                { renderLogin ? <Login toggle={toggleRenderLogin}/> : <Signup toggle={toggleRenderLogin} /> }                     

            </div> */}


        </div> 
    );
}

export default Landing;