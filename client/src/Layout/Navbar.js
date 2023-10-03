import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../Components/LogoutButton";

function Navbar(){
    
    const loggedIn = useSelector( state => state.session.loggedIn)
    
    return ( 
        <div className='flex justify-between p-5 border-4 border-black page bgBlue text-black text-xl font-bold'>

            <h3>BirdWatcher</h3>

            <div
                className='flex justify-around gap-5'
            >
                <NavLink 
                    activeClassName='underline'
                    className=''
                    to='/feed'
                >FEED</NavLink>

                <NavLink 
                    activeClassName='underline'
                    className=''
                    to='/account'
                >ACCOUNT</NavLink>


                {
                    loggedIn ? (
                       <LogoutButton />
                    ):(                
                        <NavLink 
                            activeClassName='underline'
                            className=''
                            to='/login'
                        >LOGIN</NavLink>
                    )
                }







            </div>


        </div> 
    );
}

export default Navbar;