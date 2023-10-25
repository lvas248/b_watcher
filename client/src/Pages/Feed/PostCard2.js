import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector, useDispatch } from 'react-redux'
import { updatePost, deletePost } from '../../Redux/Slices/postSlice'
import MyMap from '../../Components/MyMap'
import pinIcon from '../../Assets/Icons/pin.png'
import moreIcon from '../../Assets/Icons/icons8-dots-90.png'
import LoadingIcon from '../../Components/LoadingIcon'

function PostCard2({post}) {

    const dispatch = useDispatch()
    const history = useHistory()

    const [ moreBtnclicked, setMoreBtnClicked ] = useState(false)
    const [ edit, setEdit ] = useState(false)
    const [ displayMap, setDisplayMap ] = useState(false)
    
    const [ editObj, setEditObj ] = useState({
        bird_id: post?.filtered_bird?.id,
        caption: post?.caption,
        place_attributes:{
            id: post?.place?.id,
            address: post?.place?.address,
            longitude: post?.place?.longitude,
            latitude: post?.place?.latitude,
        }
    })

    const allBirds = useSelector( state => state.bird.entity.allBirds)
    
    const postStatus = useSelector( state => state.post.status)

    const renderBirdOptions = allBirds?.map( b => {
        return <option key={b.id} value={b.id}>{b.name}</option>
    })  

    function toggleMap(){
        setDisplayMap(!displayMap)
    }

    function navigateTo(path){
        history.push(path)
    }

    function updateEditObj(e){
        const copy = {...editObj}
        copy[e.target.name] = e.target.value
        setEditObj(copy)
    }


    function updatePlaceAttributes(coords){
        const copy = {...editObj.place_attributes, longitude: coords.longitude, latitude: coords.latitude}
        setEditObj({...editObj, place_attributes: copy })
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

    function submitDelete(){
        dispatch(deletePost({post_id: post.id, bird_id: post.filtered_bird.id})).then(res => console.log(res))
    }

    return ( 

        <div id={post.id} className='max-w-[1050px]'>

            <div className='max-h-[600px] max-w-[600px] bg-slate-200 m-auto'>
                <img alt='' src={post?.image_url} />
            </div>

            <div id='rightPanel'
                    className='flex flex-col gap-2 p-4 border-x-2 border-b-2 max-w-[600px] m-auto'
            >
                <div  id='birdIconTitle'
                    className='flex justify-between items-center'>

                    <div className='flex items-center gap-4'>
                        <div className='rounded-full bg-slate-200 border border-black '> 
                            <img className='bg-cover rounded-full h-[40px] w-[40px] ' alt='bird' src={post?.filtered_bird?.thumbnail} />
                        </div>

                        
                        { edit ? ( 
                                <select name='bird_id' value={editObj?.bird_id} onChange={updateEditObj} className='text-xl font-bold border-black border px-2' >{renderBirdOptions}</select>
                            ):( 
                                <h1 className='text-xl font-bold'>{post?.filtered_bird?.name}</h1>
                            )
                        }

                    </div>

                    <button onClick={toggleMoreBtn} className={`${ moreBtnclicked && 'hidden' } h-[18px] w-[18px]`}> <img className='bg-cover' alt='more' src={moreIcon} /> </button>

                                        
                    <div id='buttonscCntainer' className={`${!moreBtnclicked && 'hidden'} flex gap-2 text-xs`}>

                        
                        <button onClick={submitDelete} className={`${!edit && 'hidden'} text-white border p-2 rounded-xl bg-red-400`}>delete</button>
                        
                        <button onClick={submitUpdate} className={`${!edit && 'hidden'} text-white border p-2 rounded-xl bg-green-600`}>update</button>

                        <button onClick={toggleMoreBtn} className=''>{ postStatus === 'pending' ? <LoadingIcon /> : 'cancel' }</button>
                        
                    </div>     

                
                </div>

                <div id='location'
                    className='flex flex-col gap-5 items-center'
                >
                    <div className='flex place-self-start items-center'>

                        <div className='h-[18px] w-[18px] '>
                            <img className='bg-cover' alt='bird' src={pinIcon} />
                        </div>

                        { edit ? (
                                    <button onClick={toggleMap} className={'text-xs underline'}>change location</button>                      
                                ) : (
                                    <button onClick={()=>navigateTo(`/map/${post.id}`)} className='text-left text-[10px] uppercase font-semibold underline overflow-hidden truncate w-[85vw]'>{post?.place?.address}</button>
                                )
                        }

                    </div>

                    <MyMap display={displayMap} toggleMap={toggleMap} setPlace={updatePlaceAttributes} currentLocation={{longitude: editObj.place_attributes.longitude, latitude: editObj.place_attributes.latitude}} />
       

                
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