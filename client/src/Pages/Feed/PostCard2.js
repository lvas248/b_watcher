import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import pinIcon from '../../Assets/Icons/pin.png'

function PostCard2({post}) {

    const history = useHistory()

    function navigateTo(path){
        history.push(path)
    }

    return ( 

        <div id={post.id} className='max-w-[1050px] '>

            <div className='max-h-[600px] max-w-[600px]  m-auto '>
                <img className='sm:rounded-t-3xl' alt='' src={post?.image_url} />
            </div>

            <div id='rightPanel'
                    className='flex flex-col gap-2 p-4 border-x-2 border-b-2 max-w-[600px] m-auto sm:rounded-b-3xl'
            >
                <div  id='birdIconTitle'
                    className='flex justify-between items-center'>

                    <div className='flex items-center gap-4'>
                        <div className='rounded-full bg-slate-200 border border-black '> 
                            <img className='bg-cover rounded-full h-[40px] w-[40px] ' alt='bird' src={post?.filtered_bird?.thumbnail} />
                        </div>

                        <h1 className='text-xl font-bold'>{post?.filtered_bird?.name}</h1>

                    </div>

                    <button onClick={()=>navigateTo(`/edit_post/${post.id}`)} className='text-xs underline'>Edit</button>

                </div>

                <div id='location'
                    className='flex flex-col gap-5 items-center '
                >
                    <div className='flex place-self-start items-center'>

                        <div className='h-[18px] w-[18px] '>
                            <img className='bg-cover' alt='bird' src={pinIcon} />
                        </div>

                        <button onClick={()=>navigateTo(`/map/${post.id}`)} className='text-left text-[10px] uppercase font-semibold underline overflow-hidden truncate w-[80vw] max-w-[500px]'>{post?.place?.address}</button>

                    </div>

       

                
                </div>

                <div id='caption'
                    className='text-sm grid  my-[2svh]'
                >

                    <p className='text-sm p-2 text-left'>{post?.caption}</p>
     
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