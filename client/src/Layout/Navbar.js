import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react'
import LogoutButton from "../Components/LogoutButton";
import { Squash as Hamburger } from 'hamburger-react'

function Navbar(){
    
    const loggedIn = useSelector( state => state.session.loggedIn)
    const [ isOpen, setIsOpen ] = useState(false)
    
    function toggleOpen(){
        setIsOpen(!isOpen)
    }

    return ( 
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 m-auto max-w-[1050px] bgBlue border-2 border-black w-full flex flex-col p-3  ${isOpen ? 'h-[25vh]' : 'h-[8vh]'} transform-h duration-300 overflow-hidden z-50`}>
            
            <div className='flex justify-between items-center font-bold'>

                <h3>BirdWatcher</h3>
                
                <div className=''>
                    <Hamburger toggled={isOpen} toggle={setIsOpen}  />
                </div>

            </div>

            <div
                className={` ${!isOpen && 'hidden'} flex flex-col place-content-end gap-5 font-bold`}
            >
                <NavLink 
                    onClick={toggleOpen}
                    activeClassName='underline'
                    className='m-auto'
                    to='/feed'
                >FEED</NavLink>

                <NavLink 
                    onClick={toggleOpen}
                    activeClassName='underline'
                    className='m-auto'
                    to='/post'
                >POST</NavLink>

                <NavLink 
                    onClick={toggleOpen}
                    activeClassName='underline '
                    className='m-auto'
                    to='/account'
                >ACCOUNT</NavLink>


                {
                    loggedIn ? (
                       <LogoutButton toggleOpen={toggleOpen}/>
                    ):(                
                        <NavLink 
                            onClick={toggleOpen}
                            activeClassName='underline'
                            className='m-auto'
                            to='/login'
                        >LOGIN</NavLink>
                    )
                }

            </div>


        </div> 
    );
}

export default Navbar;