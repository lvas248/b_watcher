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

    // ${ isOpen ? 'min-h-[40svh] max-h-[80svh] sm:min-h-[8svh] sm:max-h-[8svh]' : 'min-h-[8svh] max-h-[8svh] '} 

    return ( 
            

            <div className='flex w-full justify-between items-center font-bold place border-b border-black h-[8svh] max-w-[1200px] m-auto'>
                
                <button onClick={()=>navigateTo('')} className='flex gap-1 items-center pl-[3svw]' >
                    <p className='font-serif'>Bird</p>
                    <img className='h-[25px]' alt='bird' src={bird} />
                    <p className='font-serif'>Watcher</p>
                </button>
                
                <div className='md:hidden pr-[3svw]'>
                    <Hamburger toggled={isOpen} toggle={setIsOpen}  />
                </div>

                <div className={`absolute top-[8svh] w-full bg-slate-200 z-50 font-bold flex flex-col md:mediumDropDown ${isOpen ? 'divide-y divide-slate-300 border-b border-black': 'hidden md:flex' } `}
                >

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='underline'
                        className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/feed': '/login'}
                    >ENTIRIES</NavLink>

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='underline '
                        className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/map': '/login'}
                    >MAP</NavLink>

                    

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='underline'
                        className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/post': '/login'}
                    >POST</NavLink>

                    <NavLink 
                        onClick={toggleOpen}
                        activeClassName='underline'
                        className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
                        to={loggedIn ? '/account': '/login'}
                    >ACCOUNT</NavLink>


                    {
                        loggedIn ? (
                            <div className='m-auto py-5 w-full text-center'>
                                <LogoutButton toggleOpen={toggleOpen}/>
                            </div>
                        ):(                
                            <NavLink 
                                onClick={toggleOpen}
                                activeClassName='underline'
                                className='m-auto py-5'
                                to='/login'
                            >LOGIN</NavLink>
                        )
                    }

                </div>

            </div>


     
    );
}

export default Navbar;


// import { NavLink, useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState } from 'react'
// import LogoutButton from "../Components/LogoutButton";
// import { Squash as Hamburger } from 'hamburger-react'
// import bird from '../Assets/Icons/icons8-binocular-100.png'

// function Navbar(){

//     const history = useHistory()
//     const loggedIn = useSelector( state => state.session.loggedIn)
//     const [ isOpen, setIsOpen ] = useState(false)
    
//     function toggleOpen(){
//         setIsOpen(!isOpen)
//     }

//     function navigateTo(path){
//         history.push(`/${path}`)
//     }

//     return ( 
//         <div className={`navbar verticalBar md:flex md:flex-row transform-h px-[6svw] py-3 md:justify-between z-50  ${ isOpen ? 'min-h-[40svh] max-h-[80svh] sm:min-h-[8svh] sm:max-h-[8svh]' : 'min-h-[8svh] max-h-[8svh] '} ` }>
            

//             <div className='flex  justify-between items-center font-bold place'>
                

//                 <button onClick={()=>navigateTo('')} className='flex gap-1 items-center' >
//                     <p className='font-serif'>Bird</p>
//                     <img className='h-[25px]' alt='bird' src={bird} />
//                     <p className='font-serif'>Watcher</p>
//                 </button>
                
//                 <div className='md:hidden'>
//                     <Hamburger toggled={isOpen} toggle={setIsOpen}  />
//                 </div>


//             </div>

//             <div 
//                 className={` pt-10 md:pt-0 flex flex-col md:flex-row md:gap-5 font-bold ${isOpen ? 'divide-y md:divide-none divide-slate-300 ': 'hidden md:flex' } `}
//             >

//                 <NavLink 
//                     onClick={toggleOpen}
//                     activeClassName='underline'
//                     className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
//                     to={loggedIn ? '/feed': '/login'}
//                 >ENTIRIES</NavLink>

//                 <NavLink 
//                     onClick={toggleOpen}
//                     activeClassName='underline '
//                     className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
//                     to={loggedIn ? '/map': '/login'}
//                 >MAP</NavLink>

                

//                 <NavLink 
//                     onClick={toggleOpen}
//                     activeClassName='underline'
//                     className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
//                     to={loggedIn ? '/post': '/login'}
//                 >POST</NavLink>

//                 <NavLink 
//                     onClick={toggleOpen}
//                     activeClassName='underline'
//                     className={`m-auto py-5 w-full text-center ${!loggedIn && 'hidden'}`}
//                     to={loggedIn ? '/account': '/login'}
//                 >ACCOUNT</NavLink>


//                 {
//                     loggedIn ? (
//                         <div className='m-auto py-5 w-full text-center'>
//                             <LogoutButton toggleOpen={toggleOpen}/>
//                         </div>
//                     ):(                
//                         <NavLink 
//                             onClick={toggleOpen}
//                             activeClassName='underline'
//                             className='m-auto py-5'
//                             to='/login'
//                         >LOGIN</NavLink>
//                     )
//                 }

//             </div>

//         </div> 
//     );
// }

// export default Navbar;