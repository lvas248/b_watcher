import BackGroundLayout from './BackgroundLayout';
import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'

function Landing() {

    const [ renderLogin, setRenderLogin ] = useState(true)

    function toggleRenderLogin(){
        setRenderLogin(!renderLogin)
    }

    
    return ( 
        <div className='relative mt-[8vh] h-[92vh] bg-slate-200 max-w-[1050px] m-auto overflow-hidden grid'>


            <BackGroundLayout />

            <div className='absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                

                <h1 className='text-[50px] text-center'>Bird Watcher</h1>



                { renderLogin ? <Login toggle={toggleRenderLogin}/> : <Signup toggle={toggleRenderLogin} /> }                     

                    

            </div>


        </div> 
    );
}

export default Landing;