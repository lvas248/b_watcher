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
        location_attributes:{
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
  
    function setLocation(coords){
        setPostObj({...postObj, location_attributes: { ...postObj.location_attributes, latitude: coords.lat, longitude: coords.lng}})
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
    
    <form onSubmit={submitForm} className='form gap-4 font-bold text-lg'>

        <h3>New Post</h3>

        <div id='radios' className='flex gap-10 '>

            <p className='formLabel text-lg'>Bird:</p>
            
            <div className='flex items-center gap-2'>
                <input checked={radio === 'select'} type='radio' name='selectCreate' id='select'  onChange={updateRadio} />
                <label className='text-xs'>Select</label>
            </div>

            <div className='flex items-center gap-2'>
                <input checked={radio === 'create'} type='radio' name='selectCreate' id='create'  onChange={updateRadio} />
                <label className='text-xs'>Create Bird</label>
            </div>

        </div>

        <div id='select' 
            className='grid'>
            <select name='bird_id' onChange={updatePostObj} className={`${radio !== 'select' && 'hidden'} border-2 border-black  text-center text-xs p-1`}>
                {[<option key='0' value=''>Bird Select</option>, ...renderBirdOptions]}
            </select>
        </div>

        <div id='createBirdForm' 
            className={`${ radio !== 'create' && 'hidden'} grid gap-4`}
        >
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                    <label className='formLabel'>New Bird Name: </label>
                    <p className='error'>{errors?.errors['bird.name']}</p>
                </div>
                <input name='name' value={postObj.bird_attributes?.name} onChange={updateBirdAttributes} className='formInput text-xs border-2 border-black px-2'/>
            </div>

            <div className='flex flex-col gap-1'>
                <div className='flex justify-between'>
                    <label className='formLabel'>Description: </label>
                    <p className='error'>{errors?.errors['bird.description']}</p>
                </div>
                <textarea name='description' value={postObj.bird_attributes?.description} onChange={updateBirdAttributes} className='formInput text-xs border-2 border-black px-2 h-[5vh]'/>
            </div>
        </div>

        <div id='addressSearch'
            className='flex flex-col gap-1'>

            <div className='flex justify-between'>
                <label className='formLabel'>Address: </label>
                <p className='error'>{errors?.errors['location.address']}</p>
            </div>

            <button onClick={toggleMap} type='button' className={`${displayMap && 'hidden'} formInput text-xs w-full px-2 hover:bg-black hover:text-white`}>{ postObj.location_attributes.latitude ? 'Location Selected' : 'Select Location'}</button>
            
            <div>
                <MyMap display={displayMap} toggleMap={toggleMap} setLocation={setLocation} />
            </div>
        
        </div>

        <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
                <label className='formLabel'>Caption: </label>
                <p className='error'>{errors?.errors?.caption}</p>
            </div>
            <textarea id='caption' name='caption' value={postObj.caption} onChange={updatePostObj} className='formInput text-xs px-2 w-full' />
        </div>
        
        <div id='addImage '
            className=' p-1 flex flex-col gap-4'
        >
            <div className='col-span-2 w-[150px] h-[150px] aspect-w-1 aspect-h-1 border-2 m-auto'>
                <img alt='bird' src={ imgPreview || bird} className='col-span-2 object-cover object-center w-full h-full' />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-xs'>Image: </label>

                <input className='text-xs border-2 border-black p-1' type='file' onChange={handleFileChange}/>

            </div>

        </div>


       
        <SubmitButton label='Submit Post' status={postStatus}  />


    </form> );
}

export default PostForm;