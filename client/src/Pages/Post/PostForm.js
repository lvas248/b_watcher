import { useState } from "react";
import { submitPost } from "../../Redux/Slices/postSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import bird from '../../Assets/Icons/icons8-bird-100.png'
import SubmitButton from "../../Components/SubmitButton";
import MyMap from "../../Components/MyMap";

function PostForm() {

    const dispatch = useDispatch()
    const history = useHistory()

    const allBirds = useSelector( state => state.bird.entity.allBirds)
    const postStatus = useSelector( state => state.post.status)
    const errors = useSelector( state => state.post.error)

    const [ displayMap, setDisplayMap ] = useState(false)
    const [ radio, setRadio ] = useState('select')
    const [ imgFile, setImgFile ] = useState()
    const [ imgPreview, setImgPreview ] = useState()
    const [ postObj, setPostObj ] = useState({
        place_attributes:{
            longitude: '',
            latitude: ''
        },
        caption: '',
        bird_id: '', 
        bird_attributes:{
            name: '',
            description: ''
        }
    })


    function updatePostObj(e){
        const copy = {...postObj}
        copy[e.target.name] = e.target.value
        setPostObj(copy)
    }
    function updateBirdAttributes(e){

        const copy = {...postObj.bird_attributes}
        copy[e.target.name] = e.target.value
        setPostObj({...postObj, bird_attributes: copy})

    }
  
    function setPlace(coords){
        setPostObj({...postObj, place_attributes: { ...postObj.place_attributes, latitude: coords.latitude, longitude: coords.longitude}})
    }

    function toggleMap(){
        setDisplayMap(!displayMap)
    }

    function updateRadio(e){
        setPostObj({...postObj, bird_id: 0, bird_attributes: {name: '', description: ''}})
        setRadio(e.target.id)
    }

    function handleFileChange(e){
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onload = () =>{
                setImgFile(file)
                setImgPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }else{
            debugger
            setImgFile(null)
            setImgPreview(null)
        }
    }

    function submitForm(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append( 'post', JSON.stringify(postObj))
        formData.append( 'image', imgFile)
        dispatch(submitPost(formData)).then(res => {
            console.log(res)
            if(res.meta.requestStatus === 'fulfilled') history.push('/feed')
        })

    }

    const renderBirdOptions = allBirds?.map( b => {
        return <option key={b.id} value={b.id}>{b.name}</option>
    })

    return ( 

        <div className='page overflow-auto '>

    
            <form onSubmit={submitForm} className='form'>

                <h1 className='pageTitle'>New post</h1>


                <div className='flex flex-col md:flex-row  gap-5'>

                    <div className='flex flex-col gap-5 md:w-[50%]'>


                        <div id='bird' 
                            className='formSection'>

                            <div className='formSectionTitleContainer'>

                                <h3>Bird</h3>



                                <div id='radios' className='items-center'>   

                                    <p className='error text-right'>{errors?.errors['bird.name'] && 'Must select or create bird'}</p>

                                    <div className='flex items-center text-xs gap-5 '>

                                        <div className='flex items-center gap-2'>
                                            <input checked={radio === 'select'} type='radio' name='selectCreate' id='select' onChange={updateRadio} />
                                            <label>Select</label>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <input checked={radio === 'create'} type='radio' name='selectCreate' id='create'  onChange={updateRadio} />
                                            <label>Create Bird</label>
                                        </div>

                                    </div>


                                </div>

                            </div>

                            <div className='formSectionInputContainer'>

                                <div id='select' 
                                    className='grid'
                                >
                                    <select name='bird_id' onChange={updatePostObj} className={`${radio !== 'select' && 'hidden'} formInput`}>
                                        {[<option key='0' value=''>Bird Select</option>, ...renderBirdOptions]}
                                    </select>
                                </div>

                                <div id='createBirdForm' 
                                    className={`${ radio !== 'create' && 'hidden'} grid gap-4`}
                                >
                                    <div className='flex flex-col gap-1'>

                                        <div className='flex justify-between'>
                                            <p className='text-sm'>New Bird Name: </p>
                                            <p className='error'>{errors?.errors['bird.name']}</p>
                                        </div>

                                        <input name='name' value={postObj.bird_attributes?.name} onChange={updateBirdAttributes} className='formInput '/>
                                    </div>

                                    <div className='flex flex-col gap-1'>

                                        <div className='flex justify-between'>
                                            <p className='text-sm'>Description: </p>
                                            <p className='error'>{errors?.errors['bird.description']}</p>
                                        </div>

                                        <textarea name='description' value={postObj.bird_attributes?.description} onChange={updateBirdAttributes} className='formInput h-[5svh]'/>
                                   
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div id='address'
                            className='formSection'
                        >
                            <div className='formSectionTitleContainer'>

                                <h3>Address</h3>

                                <p className='error'>{errors?.errors['place.longitude']}</p>

                            </div>

                            <div className='formSectionInputContainer'>

                                <button onClick={toggleMap} type='button' className={`${displayMap && 'hidden'} formInput bg-white text-center hover:bg-black hover:text-white`}>{ postObj.place_attributes.latitude ? 'Location Selected' : 'Select Location'}</button>
                                
                                <MyMap display={displayMap} toggleMap={toggleMap} setPlace={setPlace} currentLocation/>

                            </div>


                            
                        </div>

                        <div id='caption'
                            className='formSection'
                        >
                            <div className='flex justify-between items-center border-b border-slate-300 py-[12px] px-[20px]'>
                                <h3 className='text-2xl'>Caption</h3>
                                <p className='error'>{errors?.errors?.caption}</p>
                            </div>

                            <div className='formSectionInputContainer'>
                                <textarea  id='caption' name='caption' value={postObj.caption} onChange={updatePostObj} className='formInput min-h-[100px]' />
                            </div>

                        </div>


                    </div>

                    <div id='image'
                        className='formSection md:w-[50%]'
                    >
                        <div className='flex justify-between items-center border-b border-slate-300 py-[12px] px-[20px]'>
                            <h3 className='text-2xl'>Image</h3>
                            {/* <p className='error'>{errors?.errors?.caption}</p> */}
                        </div>

                        <div className='p-[20px]'>

                            <input required className='formInput' type='file' onChange={handleFileChange}/>

                        </div>


                        <div className='col-span-2 formImageSection'>


                            <img className={` ${!imgPreview && 'hidden'} formImage`} alt='bird' src={imgPreview} />

                            <div className={`${imgPreview && 'hidden'} formImageContainer`}>
                                <img alt='bird' src={ imgPreview || bird} className='col-span-2 formImage border-none' />
                            </div>

                        </div>


                    </div>

                </div>


                <SubmitButton label='Submit Post' status={postStatus}  />


            </form> 


        </div>
    )
}

export default PostForm;