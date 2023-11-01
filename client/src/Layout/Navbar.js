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
            

            <div className='navContainer'>
                
                <button onClick={()=>navigateTo('')} className='logo' >
                    <p>Bird</p>
                    <img className='h-[25px]' alt='bird' src={bird} />
                    <p>Watcher</p>
                </button>
                
                <div className='md:hidden pr-[3svw]'>
                    <Hamburger toggled={isOpen} toggle={setIsOpen}  />
                </div>

                <div className={`absolute top-[8svh] w-full bg-slate-200 z-50 font-bold flex flex-col md:mediumDropDown ${isOpen ? 'divide-y divide-slate-300 border-b border-black': 'hidden md:flex' } `}
                >

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='active'
                        className={`navItem ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/feed': '/login'}
                    >ENTIRIES</NavLink>

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='active '
                        className={`navItem ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/map': '/login'}
                    >MAP</NavLink>

                    

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='active'
                        className={`navItem ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/post': '/login'}
                    >POST</NavLink>

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='active'
                        className={`navItem ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/account': '/login'}
                    >ACCOUNT</NavLink>


                    {
                        loggedIn ? (
                            <div >
                                <LogoutButton toggleOpen={toggleOpen}/>
                            </div>
                        ):(                
                            <NavLink 
                                onClick={toggleOpen}
                                activeClassName='active'
                                className='navItem'
                                to='/login'
                            >LOGIN</NavLink>
                        )
                    }

                </div>

            </div>


     
    );
}

export default Navbar;

