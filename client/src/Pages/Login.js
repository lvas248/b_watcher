import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginuser, clearSessionErrors } from '../Redux/Slices/sessionSlice'

import SubmitButton from '../Components/SubmitButton'

function Login(){

    useEffect( ()=>{
        return ()=>{
            dispatch(clearSessionErrors())
        }
    },[])

    const dispatch = useDispatch()
    const history = useHistory()

    const error = useSelector( state => state.session.error)
    const sessionStatus = useSelector( state => state.session.status)

    const initialLoginState = {
        email: '',
        password: '' 
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
        <form 
            onSubmit={submitLogin}
            className='form'>

            <label className='formLabel'>EMAIL</label>
            <input 
                className='formInput' 
                type='email' 
                name='email' 
                value={loginObj.email} 
                onChange={updateLoginObj}
            />
            <label className='formLabel'>PASSWORD</label>
            <input 
                className='formInput' 
                type='password' 
                name='password'
                value={loginObj.password} 
                onChange={updateLoginObj}
            />

            <SubmitButton label='Login' status={sessionStatus}/>

            <p className={`${!error && 'invisible'} error`}>{error?.error}</p>

            <button onClick={()=>navigateTo('signup')} type='button' className='text-xs underline text-right'>or signup</button>
            
        </form> 
    );
}

export default Login;