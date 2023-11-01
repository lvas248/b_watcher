import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearSessionErrors, signupUser } from '../../Redux/Slices/sessionSlice'
import SubmitButton from '../../Components/SubmitButton'

function Signup(){

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
            if(res.meta.requestStatus === 'fulfilled') navigateTo('feed')
            else clearSubmitObj()
        })
    }

    function navigateTo(path){
        history.push(`/${path}`)
    }

    return ( 
        
        <div className='page w-full '>

        <form 
            onSubmit={submitSignup}
            className='form max-w-[600px]' >

            <div className='formSection border-none'>

                <div className='formSectionTitleContainer border-none'>
                    <h1>Sign Up</h1>
                </div>  

                <div className='formSectionInputContainer'>

                    <div className='flex justify-between'>
                        <h1 className='text-sm'>Email</h1>
                        <p className='error'>{error?.email[0]}</p>
                    </div>                    
                    
                    <input 
                            className='formInput' 
                            type='email' 
                            name='email' 
                            value={submitObj.email} 
                            onChange={updateSubmitObj}
                    />        

                </div>

                <div className='formSectionInputContainer'>

                    <div className='flex justify-between'>
                        <h1 className='text-sm'>Password</h1>
                        <p className='error'>{error?.password}</p>
                    </div>                    
                    
                    <input 
                        className='formInput' 
                        type='password' 
                        name='password'
                        value={submitObj.password} 
                        onChange={updateSubmitObj}
                    />

                </div>

                <div className='formSectionInputContainer'>

                    <div className='flex justify-between'>
                        <h1 className='text-sm'>Confirm Password</h1>
                        <p className='error'>{error?.password_confirmation}</p>
                    </div>

                    <input 
                        className='formInput' 
                        type='password' 
                        name='password_confirmation'
                        value={submitObj.password_confirmation} 
                        onChange={updateSubmitObj}
                    />

                </div>

            </div>


                
            <button onClick={()=>navigateTo('login')} type='button' className='text-xs underline text-right'>or login</button>


            <SubmitButton label='sign up' status={sessionStatus}/>

        </form> 

    </div>

    );
}

export default Signup;