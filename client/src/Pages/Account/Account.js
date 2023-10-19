import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from 'react'

function Account(){

    const history = useHistory()
    const userInfo = useSelector( state => state.user.entity )
    const userBirds = useSelector( state => state.bird.entity.userBirds)
    const posts = useSelector( state => state.post.entity)
    
    const [ userObj, setUserObj ] = useState(userInfo)
    const [ edit, setEdit ] = useState(false)
    const [ deleteCheck, setDeleteCheck ] = useState(false)

    const renderPosts = posts.map( p => {
        return <div  className='grid grid-cols-4 border p-1 items-center'>
            <p className='border-r'>{p.created_date}</p>
            <p className='border-r text-center'>{p.filtered_bird.name}</p>
            <button onClick={()=>navigateTo(p.id)} className='border-r underline'>view post</button>
            <button className='text-red-600 underline'>delete</button>
        </div>
    })

    function navigateTo(post_id){
        history.push(`/feed/${post_id}`)
    }

    function toggleEdit(){
        setEdit(!edit)
    }

    function toggleDelete(){
        setDeleteCheck(!deleteCheck)
    }

    function updateEmail(e){
        setUserObj({...userObj, email: e.target.value})
    }

    return ( 
        <div className='page mt-[8vh] relative p-10'>
            
            <h1 className='text-3xl'>Account</h1>


            <div id='userinfo' 
                className='flex flex-col gap-2 py-4'>
                <p className='font-bold'>User Info:</p>
                
                <div className='px-2 flex gap-2'>
                    
                    <label>Username: </label>

                    { 
                        edit ? (
                            <form className='flex gap-2'>
                                <input value={userObj.email} onChange={updateEmail} className={`${!edit && 'hidden'} px-1 w-fit border`}  /> 
                                <button>submit</button>
                                <button onClick={toggleEdit}>cancel</button>
                            </form>
                        ):(
                            <p className={`${edit && 'hidden' } px-1`}>{userObj.email}</p> 
                        )
                    }

                    <button onClick={toggleEdit} className={` ${edit && 'hidden'} px-2 bgBlue rounded-xl border-2 border-black`}>edit</button>    

                </div>

            </div>

            <div id='stats'
                className='flex flex-col gap-2 py-4'>
                <p className='font-bold '>Stats: </p>
                <div className='px-2'>
                    <p>Posts: {posts.length} </p>
                    <p>Birds: {userBirds.length}</p>

                </div>

            </div>

            <div id='posts' 
                className='flex flex-col gap-2 py-4 '>

                <div className='flex gap-2'>
                    <p className='font-bold'>Posts</p>
                    <button className='underline text-xs'>Delete All</button>
                </div>


                <div className=' text-[10px] sm:text-xs m-auto'>
                    {renderPosts}
                </div>
                
            </div>


            <div id='deleteAccount' 
                className='grid items-center text-white mt-[5vh] max-w-[500px] m-auto'>

                <div className={`${!deleteCheck && 'hidden'} flex`}>
                    <button onClick={toggleDelete} className='w-full bg-yellow-300 border-2 border-black font-bold p-2' >Cancel</button>
                    <button className='place-self-center w-full bg-red-600 border-2 border-black font-bold p-2' > Delete Account</button>
                </div>

                <button onClick={toggleDelete} className={`${deleteCheck && 'hidden'} text-center text-white w-full p-2 bg-red-600 border-2 border-black font-bold`}>DELETE ACCOUNT</button>
           
            </div>




        </div> 
    );
}

export default Account;