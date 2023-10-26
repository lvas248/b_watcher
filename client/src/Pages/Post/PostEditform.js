import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import MyMap from '../../Components/MyMap';
import SubmitButton from '../../Components/SubmitButton';
import { updatePost } from '../../Redux/Slices/postSlice';

function PostEditForm(){


    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    
    const post = useSelector(state => state.post.entity.find(p => p.id === parseInt(id)));
    const allBirds = useSelector( state => state.bird.entity.allBirds)
    const postStatus = useSelector( state => state.post.status)


    const [ editObj, setEditObj ] = useState({})

    const [ displayMap, setDisplayMap ] = useState(false)

    useEffect(()=>{
        setEditObj({
            bird_id: post?.filtered_bird?.id,
            caption: post?.caption,
            place_attributes:{
                id: post?.place?.id,
                longitude: post?.place?.longitude,
                latitude: post?.place?.latitude,
            }
        })
    },[post])

    const renderBirdOptions = allBirds?.map( b => {
        return <option key={b.id} value={b.id}>{b.name}</option>
    }) 

    function updateEditObj(e){
        const copy = {...editObj}
        copy[e.target.name] = e.target.value
        setEditObj(copy)
    }

    function toggleMap(){
        setDisplayMap(!displayMap)
    }

    function setPlace(coords){
        setEditObj({...editObj, place_attributes: { ...editObj.place_attributes, latitude: coords.latitude, longitude: coords.longitude}})
    }

    function submitUpdate(e){
        e.preventDefault()
        dispatch(updatePost({
            post_id: post.id,
            post: editObj
        })).then( res => {
            if(res.meta.requestStatus === 'fulfilled'){
                history.push(`/feed/${post.id}`)
            }
        })
    }
   
    return ( 
    
        <form onSubmit={submitUpdate} className='mt-[8vh] p-[40px] h-[92vh]  gap-5 overflow-auto max-w-[1200px] m-auto'>
  
           <h1 className='text-2xl font-bold underline mb-[5vh]'>Edit Post </h1>

            <div className='flex flex-col lg:flex-row  gap-5'>

                <div className='accountSection lg:w-1/2'>

                    <div
                        className='py-[12px] px-[20px] border-b border-slate-300'
                    >
                        <h3 className='text-2xl'>Image</h3>
                    </div>

                    <div
                        className='aspect-square w-full p-[20px] my-auto'
                    >
                        <img className='object-cover border border-black' alt='bird' src={post?.image_url}/>

                    </div>                    
                </div>

            
                <div className='lg:w-1/2 flex flex-col gap-5'>

                    <div id='bird'
                        className='accountSection'>

                        <div className='border-b border-slate-300 py-[12px] px-[20px]'>
                            <h3 className='text-2xl'>Bird</h3>
                        </div>

                        <div className='p-[20px]'>

                            <select name='bird_id' value={editObj?.bird_id} onChange={updateEditObj} className=' border-black border px-[12px] py-[6px] w-full text-center' >{renderBirdOptions}</select>

                        </div>


                    </div>

                    <div id='location'
                        className='accountSection'>

                        <div className='border-b border-slate-300 py-[12px] px-[20px]'>
                            <h3 className='text-2xl'>Address</h3>
                        </div>


                        <div className='p-[20px]'>

                            <button onClick={toggleMap} type='button' className={`${displayMap && 'hidden'} bg-white border border-black text-sm w-full px-[12px] py-[6px] hover:bg-black hover:text-white`}>{ editObj?.place_attributes?.latitude ? 'Location Selected' : 'Select Location'}</button>
                        
                            <MyMap display={displayMap} toggleMap={toggleMap} setPlace={setPlace} currentLocation={{longitude: editObj?.place_attributes?.longitude, latitude: editObj?.place_attributes?.latitude}}/>
                                        
                        </div>        


                    </div>

                    <div id='caption'
                        className='accountSection'>

                        <div className='border-b border-slate-300 py-[12px] px-[20px]'>
                            <h3 className='text-2xl'>Caption</h3>
                        </div>

                        <div className='p-[20px]'>

                            <textarea name='caption' value={editObj.caption} onChange={updateEditObj} className='w-full border border-black min-h-[100px] py-[6px] px-[12px]'/>
                        
                        </div>


                    </div>  

                    <SubmitButton label='update' status={postStatus} />
  
                </div>

            </div>


        </form> 
    );
}

export default PostEditForm;