import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../Redux/Slices/postSlice";
import { deleteAccount } from "../../Redux/Slices/userSlice";
import { updateUserInfo } from "../../Redux/Slices/userSlice";



function Account2() {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector( state => state.user.entity)
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

    function submitDeleteAccount(){
        dispatch(deleteAccount()).then(res => {
            if(res.meta.requestStatus === 'fulfilled') history.push('/')
        })
    }

    
    return ( 

     <div className='mt-[8vh] min-h-[92vh] relative p-10 flex flex-col gap-5 max-w-[1200px] m-auto'>

        <h1 className='uppercase font-bold text-xl'>Account</h1>

            <div id='profile' 
                className='accountSection'>

                <div className='border-b border-slate-300 flex justify-between py-[12px] px-[20px]'>
                    <h3 className=' text-2xl '>Profile</h3>
                    <button onClick={toggleEdit} className={`${editBtnClicked && 'hidden'} text-xs underline`}>Edit</button>
                </div>

                <div className='p-[20px] text-sm'>
                    <p>Email</p>

                    <p className={`${editBtnClicked && 'hidden'}`}>{user.email}</p>

                    <div className={`${!editBtnClicked && 'hidden'} flex flex-col gap-2 text-sm`}>
                        
                        <input className='py-[6px] px-[12px] w-full border border-black' value={editEmailObj.email} onChange={updateEmailObj} />
                        
                        <div className='flex place-content-end m-auto w-full'>
                            <button onClick={toggleEdit} className='accountButton border-slate-300'>back</button>
                            <button onClick={submitEdit} className='accountButton bg-slate-300 '>submit</button>
                        </div>

                    </div>

                </div>

            </div>

            <div id='posts'
                className='accountSection'>

                <div className='border-b border-slate-300 flex py-[12px] px-[20px]'>
                    <h3 className=' text-2xl '>Posts</h3>
                </div>

                <div className=' text-xs sm:text-sm m-auto px-[12px] py-[6px] divide-y  divide-slate-300'>
                    {renderPosts}
                </div>

            </div>

            <div id='account-delete' 
                className='accountSection'>
                <div className='border-b border-slate-300 flex justify-between items-center py-[12px] px-[20px]'>
                    <h3 className=' text-2xl '>Account</h3>

                    <button onClick={toggleDelete} className={` ${deleteBtnClicked && 'hidden'} text-xs underline`} >Delete</button>
                    <p className={`${!deleteBtnClicked && 'hidden'} text-xs`}>Are you sure?</p>
                
                </div>

                <div className={`${!deleteBtnClicked && 'hidden'} p-[20px] flex place-content-end text-sm py-[12px] px-[20px]`}>
                    <button onClick={toggleDelete} className='accountButton border-slate-300'>back</button>
                    <button onClick={submitDeleteAccount} className='accountButton bg-slate-300' >Delete Account</button>
                </div>
            </div>   

    </div> 
    );
}

export default Account2;