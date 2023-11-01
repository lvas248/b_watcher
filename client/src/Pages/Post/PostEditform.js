import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import MyMap from '../../Components/MyMap';
import SubmitButton from '../../Components/SubmitButton';
import { updatePost, deletePost } from '../../Redux/Slices/postSlice';
import LoadingIcon from '../../Components/LoadingIcon';

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

    function submitDelete(){
        dispatch(deletePost({post_id: post.id})).then( res => {
            if(res.meta.requestStatus === 'fulfilled') history.push('/feed')
        })
    }
   
    return ( 
    
        <form onSubmit={submitUpdate} className='form'>
  
            <div className='formSectionTitleContainer'>

                <h1 className='pageTitle'>Edit Post </h1>
                <button onClick={submitDelete} type='button' className='py-[6px] text-xs underline'>{postStatus === 'idle' ? 'delete post' : <LoadingIcon />} </button>

            </div>

            <div className='flex flex-col md:flex-row  gap-5'>
                

                <div className='formSection md:w-1/2'>

                    <div
                        className='formSectionTitleContainer'
                    >
                        <h3>Image</h3>
                    </div>

                    <div className='formImageSection'>

                        <div className='formImageContainer'
                            >
                             <img className='formImage' alt='bird' src={post?.image_url}/>

                        </div>                          
                    </div>

                   
                </div>

            
                <div className='md:w-1/2 flex flex-col gap-5'>

                    <div id='bird'
                        className='formSection'>

                        <div className='formSectionTitleContainer'>
                            <h3>Bird</h3>
                        </div>

                        <div className='formSectionInputContainer'>

                            <select name='bird_id' value={editObj?.bird_id} onChange={updateEditObj} className='formInput text-center' >{renderBirdOptions}</select>

                        </div>


                    </div>

                    <div id='location'
                        className='formSection'>

                        <div className='formSectionTitleContainer'>
                            <h3>Address</h3>
                        </div>

                        <div className='formSectionInputContainer'>

                            <button onClick={toggleMap} type='button' className={`${displayMap && 'hidden'} formInput text-center hover:bg-black hover:text-white`}>{ editObj?.place_attributes?.latitude ? 'Location Selected' : 'Select Location'}</button>
                        
                            <MyMap display={displayMap} toggleMap={toggleMap} setPlace={setPlace} currentLocation={{longitude: editObj?.place_attributes?.longitude, latitude: editObj?.place_attributes?.latitude}}/>
                                        
                        </div>        


                    </div>

                    <div id='caption'
                        className='formSection'>

                        <div className='formSectionTitleContainer'>
                            <h3>Caption</h3>
                        </div>

                        <div className='formSectionInputContainer'>

                            <textarea name='caption' value={editObj.caption} onChange={updateEditObj} className='formInput min-h-[100px]'/>
                        
                        </div>


                    </div>  

                    <SubmitButton label='update' status={postStatus} />
  
                </div>

            </div>


        </form> 
    );
}

export default PostEditForm;