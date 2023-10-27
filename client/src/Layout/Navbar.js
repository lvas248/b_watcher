import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react'
import LogoutButton from "../Components/LogoutButton";
import { Squash as Hamburger } from 'hamburger-react'
import bird from '../Assets/Icons/icons8-binocular-100.png'

function Navbar(){

    const history = useHistory()
    const loggedIn = useSelector( state => state.session.loggedIn)
    const [ isOpen, setIsOpen ] = useState(false)
    
    function toggleOpen(){
        setIsOpen(!isOpen)
    }

    function navigateTo(path){
        history.push(`/${path}`)
    }

    return ( 
        <div className={`navbar verticalBar md:flex  md:flex-row transform-h px-[6vw] py-3 ${isOpen ? 'h-[30vh]' : 'h-[8vh]'}  md:h-[8vh] md:justify-between z-50`}>
            

            <div className='flex my-auto justify-between font-bold place'>
                

                <button onClick={()=>navigateTo('')} className='flex gap-1 items-center' >
                    <p className='font-serif'>Bird</p>
                    <img className='h-[30px]' alt='bird' src={bird} />
                    <p className='font-serif'>Watcher</p>

                </button>
                
                <div className='md:hidden'>
                    <Hamburger toggled={isOpen} toggle={setIsOpen}  />
                </div>

            </div>

            <div 
                className={` ${!isOpen && 'hidden md:flex'} flex flex-col md:flex-row  gap-5 font-bold `}
            >

                <NavLink 
                    onClick={toggleOpen}
                    activeClassName='underline'
                    className='m-auto'
                    to={loggedIn ? '/feed': '/login'}
                >FEED</NavLink>

                <NavLink 
                    onClick={toggleOpen}
                    activeClassName='underline'
                    className='m-auto'
                    to={loggedIn ? '/map': '/login'}
                >MAP</NavLink>

                

                <NavLink 
                    onClick={toggleOpen}
                    activeClassName='underline'
                    className='m-auto'
                    to={loggedIn ? '/post': '/login'}
                >POST</NavLink>

                <NavLink 
                    onClick={toggleOpen}
                    activeClassName='underline '
                    className='m-auto'
                    to={loggedIn ? '/account': '/login'}
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