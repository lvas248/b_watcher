import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePost } from '../../Redux/Slices/postSlice'
import birdIcon from '../../Assets/Icons/icons8-bird-100.png'
import pinIcon from '../../Assets/Icons/pin.png'
import moreIcon from '../../Assets/Icons/icons8-dots-90.png'

function PostCard2({post}) {

    const dispatch = useDispatch()

    const [ moreBtnclicked, setMoreBtnClicked ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    
    const [ editObj, setEditObj ] = useState({
        bird_id: post?.filtered_bird?.id,
        caption: post?.caption,
        location_attributes:{
            id: post?.location?.id,
            address: post?.location?.address
        }
    })

    const birds = useSelector( state => state.bird.entity)
   
    const renderBirdOptions = birds?.map( b => {
        return <option key={b.id} value={b.id}>{b.name}</option>
    })  

    function updateEditObj(e){
        const copy = {...editObj}
        copy[e.target.name] = e.target.value
        setEditObj(copy)
        console.log(copy)
    }

    function updateLocationAttributes(e){
        const copy = {...editObj.location_attributes}
        copy[e.target.name] = e.target.value
        setEditObj({...editObj, location_attributes: copy }) 
    }

    function toggleEdit(){
        setEdit(!edit)
    }

    function toggleMoreBtn(e){
        toggleEdit()
        setMoreBtnClicked(!moreBtnclicked)
    }

    function submitUpdate(){
        dispatch(updatePost({
            post_id: post.id,
            post: editObj
        })).then( res => {
            if(res.meta.requestStatus === 'fulfilled'){
                setEdit(false)
                setMoreBtnClicked(false)
            }
        })
    }

    return ( 

        <div className='py-2'>
            <div className=''>
                <img alt='' src={post?.image_url} />
            </div>

            <div id='rightPanel'
                    className='flex flex-col gap-2 p-4 border-x-2 border-b-2 '
            >
                <div  id='birdIconTitle'
                    className='flex justify-between items-center'>

                    <div className='flex items-center gap-4'>
                        <div className='h-[40px] w-[40px] p-1 rounded-full bg-slate-200 border-2 border-black '>
                            <img className='bg-cover  ' alt='bird' src={birdIcon} />
                        </div>

                        
                        { edit ? ( 
                                <select name='bird_id' value={editObj?.bird_id} onChange={updateEditObj} className='text-xl font-bold border-black border px-2' >{renderBirdOptions}</select>
                            ):( 
                                <h1 className='text-xl font-bold'>{post?.filtered_bird?.name}</h1>
                            )
                        }

                    </div>

                                        
                    <div id='buttons container' className='flex gap-2 text-xs'>

                        <button onClick={toggleEdit} className={`${( !moreBtnclicked || edit ) && 'hidden'}`} >edit</button>
                        
                        <button onClick={()=>console.log('deleted')} className={`${!edit && 'hidden'} text-red-500`}>delete</button>
                        
                        <button onClick={submitUpdate} className={`${!edit && 'hidden'} text-green-600`}>update</button>

                        <button onClick={toggleMoreBtn} className=''> { moreBtnclicked ? 'cancel' : <div className='h-[18px] w-[18px]'><img className='bg-cover' alt='more' src={moreIcon} /></div>} </button>
                        
                    </div>     

                
                </div>

                <div id='location'
                    className='flex items-center place-content-left'
                >
                    <div className='h-[18px] w-[18px] '>
                        <img className='bg-cover' alt='bird' src={pinIcon} />
                    </div>

                    
                    { edit ? (
                            <input className='text-[10px] uppercase font-semibold border-black border px-2 w-[50%]' name='address' value={editObj?.location_attributes.address} onChange={updateLocationAttributes} />
                        ) : (
                            <p className='text-[10px] uppercase font-semibold underline'>{post?.location?.address}</p>
                        )
                    }

                
                </div>

                <div id='caption'
                    className='text-sm grid  my-[2vh]'
                >
                    { edit ? (
                        <textarea className='text-sm p-2 border-black border' name='caption' value={editObj?.caption} onChange={updateEditObj} />
                    ):(
                        <p className='text-sm p-2 text-left'>{post?.caption}</p>
                    )}
                </div>

                <div id='created_date'
                    className=''
                >
                    <p className='text-[10px] text-right'>{post?.created_date}</p>

                </div>


            </div>

        </div>

    );
}

export default PostCard2;