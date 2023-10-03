import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signupUser } from '../Redux/Slices/sessionSlice'
import SubmitButton from '../Components/SubmitButton'

function Login(){

    const dispatch = useDispatch()
    const history = useHistory()

    const error = useSelector( state => state.session.error)
    const sessionStatus = useSelector( state => state.session.status)

    const initialLoginState = {
        email: '',
        password: '',
        password_confirmation: '' 
 
    }
    const [ submitObj, setSubmitObj ] = useState(initialLoginState)

    function updateSubmitObj(e){
        const copy = {...submitObj}
        copy[e.target.name] = e.target.value
        setSubmitObj(copy)
    }

    function clearSubmitObj(){
        setSubmitObj(initialLoginState)
    }

    function submitSignup(e){
        e.preventDefault()
        dispatch(signupUser(submitObj)).then(res => {
            if(res.meta.requestStatus === 'fulfilled') history.push('/feed')
            else clearSubmitObj()
        })
    }

    console.log(error)

    return (    
        <form 
            onSubmit={submitSignup}
            className='form'>

            <div className='flex justify-between'>
                <label className='formLabel'>EMAIL</label>
                <p className='error'>{error?.email}</p>
            </div>

            <input 
                className='formInput' 
                type='email' 
                name='email' 
                value={submitObj.email} 
                onChange={updateSubmitObj}
            />

            <div className='flex justify-between'>
                <label className='formLabel'>PASSWORD</label>
                <p className='error'>{error?.password}</p>
            </div>            
            
            <input 
                className='formInput' 
                type='password' 
                name='password'
                value={submitObj.password} 
                onChange={updateSubmitObj}
            />

            <div className='flex justify-between'>
                <label className='formLabel'>PASSWORD CONFIRMATION</label>
                <p className='error'>{error?.password_confirmation}</p>
            </div>            <input 
                className='formInput' 
                type='password' 
                name='password_confirmation'
                value={submitObj.password_confirmation} 
                onChange={updateSubmitObj}
            />

            <SubmitButton label='SIGN UP' status={sessionStatus}/>

            <p className={`${!error && 'invisible'} error`}>{error?.error}</p>

            
        </form> 
    );
}

export default Login;