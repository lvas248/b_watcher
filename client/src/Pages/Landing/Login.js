import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginuser, clearSessionErrors } from '../../Redux/Slices/sessionSlice'

import SubmitButton from '../../Components/SubmitButton'

function Login({toggle}){

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect( ()=>{
        return ()=>{
            dispatch(clearSessionErrors())
        }
    },[dispatch])

    const error = useSelector( state => state.session.error)
    const sessionStatus = useSelector( state => state.session.status)

    const initialLoginState = {
        email: 'lvas248@gmail.com',
        password: '123' 
    }
    const [ loginObj, setLoginObj ] = useState(initialLoginState)

    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.name] = e.target.value
        setLoginObj(copy)
    }

    function clearLoginObj(){
        setLoginObj(initialLoginState)
    }

    function submitLogin(e){
        e.preventDefault()
        dispatch(loginuser(loginObj)).then(res => {
            if(res.meta.requestStatus === 'fulfilled') navigateTo('feed')
            else clearLoginObj()
        })
    }

    function navigateTo(path){
        history.push(`/${path}`)
    }

    return (    
        <div className='page w-full '>

            <form 
                onSubmit={submitLogin}
                className='form max-w-[600px]' >

                <div className='formSection border-none'>

                    <div className='formSectionTitleContainer border-none'>
                        <h1>Login</h1>
                    </div>  

                    <div className='formSectionInputContainer'>

                        <h1 className='text-sm'>Email</h1>
                        <input 
                                className='formInput' 
                                type='email' 
                                name='email' 
                                value={loginObj.email} 
                                onChange={updateLoginObj}
                            />                        
                    </div>

                    <div className='formSectionInputContainer'>
                        <h1 className='text-sm'>Password</h1>
                        <input 
                            className='formInput' 
                            type='password' 
                            name='password'
                            value={loginObj.password} 
                            onChange={updateLoginObj}
                        />

                    </div>

                </div>

                <div className='flex justify-between'>
                    <p className='error'>{error?.error}</p>                
                    <button onClick={()=>navigateTo('signup')} type='button' className='text-xs underline text-right'>or signup</button>
                </div>


                <SubmitButton label='Login' status={sessionStatus}/>

            </form> 

        </div>
    );
}

export default Login;