import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../Redux/Slices/postSlice";
import { deleteAccount } from "../../Redux/Slices/userSlice";
import { updateUserInfo } from "../../Redux/Slices/userSlice";
import SubmitButton from '../../Components/SubmitButton'

function Account2() {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector( state => state.user.entity)
    const userStatus = useSelector( state => state.user.status)
    const posts = useSelector( state => state.post)

    const [ deleteBtnClicked, setDeleteBtn ] = useState(false)
    const [ editBtnClicked, setEditButton ] = useState(false)
    const [ editEmailObj, setEditEmailObj ] = useState({email: user.email})

    const renderPosts = posts?.entity?.map( p => {

        return <div key={p.id} className='grid grid-cols-4 py-[12px] px-[12px] sm:px-2 items-center hover:sm:bg-slate-300 '>

                    <p className='text-left'>{p.created_date}</p>

                    <p className='text-center'>{p.filtered_bird.name}</p>

                    <button onClick={()=>navigateTo(p.id)} className='underline'>view</button>

                    <button onClick={()=>submitDeletePost(p.id)} className='underline t' >delete</button>
                
                </div>
    })

    function submitDeletePost(id){
        dispatch(deletePost({post_id: id}))
    }

    function updateEmailObj(e){
        setEditEmailObj({email: e.target.value})
    }

    function navigateTo(post_id){
        history.push(`/feed/${post_id}`)
    }

    function toggleDelete(){
        setDeleteBtn(!deleteBtnClicked)
    }

    function toggleEdit(){
        setEditButton(!editBtnClicked)
    }

    function submitEdit(){
        dispatch(updateUserInfo(editEmailObj)).then(res => {
            if(res.meta.requestStatus === 'fulfilled') toggleEdit()
        })
    }

    function submitDeleteAccount(e){
        e.preventDefault()
        dispatch(deleteAccount()).then(res => {
            if(res.meta.requestStatus === 'fulfilled') history.push('/')
        })
    }

    
    return ( 

     <div className='page form'>

        <h1 className='pageTitle'>Account</h1>

            <div id='profile' 
                className='formSection'>

                <div className='formSectionTitleContainer flex justify-between '>

                    <h3>Profile</h3>

                    <button onClick={toggleEdit} className={`${editBtnClicked && 'hidden'} text-xs underline`}>Edit</button>

                </div>

                <div className='p-[20px] text-sm'>

                    <p>Email</p>

                    <p className={`${editBtnClicked && 'hidden'}`}>{user.email}</p>

                    <div className={`${!editBtnClicked && 'hidden'} flex flex-col gap-2 text-sm`}>
                        
                        <input className='formInput' value={editEmailObj.email} onChange={updateEmailObj} />
                        
                        <div className='formInputContainer flex'>
                            <button onClick={toggleEdit} className='submitButton border-slate-300 bg-slate-200 '>back</button>
                            <button onClick={submitEdit} className='submitButton'>submit</button>
                        </div>

                    </div>

                </div>

            </div>

            <div id='posts'
                className='formSection'>

                <div className='formSectionTitleContainer'>
                    <h3>Posts</h3>
                </div>

                <div className=' formSectionInputContainer text-xs sm:text-sm divide-y divide-slate-300'>
                    {renderPosts}
                </div>

            </div>

            <div id='account-delete' 
                className='formSection'>

                <div className='formSectionTitleContainer'>
                    
                    <h3>Account</h3>

                    <button onClick={toggleDelete} className={` ${deleteBtnClicked && 'hidden'} text-xs underline`} >Delete</button>
                    <p className={`${!deleteBtnClicked && 'hidden'} text-xs`}>Are you sure?</p>
                
                </div>

                <form onSubmit={submitDeleteAccount} className={`${!deleteBtnClicked && 'hidden'} formSectionInputContainer text-sm flex`}>
                    <button onClick={toggleDelete} type='button' className='submitButton border-slate-300 bg-slate-200'>back</button>
                    <SubmitButton label='Delete Account' status={userStatus} />
                </form>

            </div>   

    </div> 
    );
}

export default Account2;