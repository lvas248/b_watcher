import card from '../../Assets/card.png'
import map from '../../Assets/map.png'
import bird from '../../Assets/bird.png'
import { useHistory } from 'react-router-dom'

function Landing2() {

    const history = useHistory()

    const bottomCards = [
        {
            id: 1,
            image: card,
            title: 'Post',
            caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            id: 2,
            image: map,
            title: 'Map',
            caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            id: 3,
            image: bird,
            title: 'Title',
            caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }
    ]
    const rightPanelImages = [
        { id: 1, image: 'https://images.unsplash.com/photo-1540878724756-d5c4517dea9c?auto=format&fit=crop&q=80&w=1920&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        { id: 2, image: 'https://images.unsplash.com/photo-1560951750-1e85780f946b?auto=format&fit=crop&q=80&w=1882&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
        { id: 3, image: 'https://images.unsplash.com/photo-1581687004185-f912200c4a31?auto=format&fit=crop&q=80&w=1770&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},

    ]

    const renderBottomCards = bottomCards.map( c => {
        return <div key={c.id} className='flex p-5 '>

                    <div className='w-1/2 p-1'>
                        <img className='object-fit max-h-[200px] ml-auto border border-black' alt='card' src={c.image} />
                    </div>
                    <div className='w-1/3 pl-5 grid place-content-center'>
                        <p className='text-3xl '>{c.id}</p>
                        <h1>{c.title}</h1>
                        <p className='text-xs sm:hidden lg:flex'>{c.caption}</p>
                    </div>

                </div>
    })

    const renderRightPanelImages = rightPanelImages.map( i =>{
        return <div key={i.id} className='py-5 pr-10 h-1/3'>
                    <img className='image max-w-[375px] max-h-[192px] mx-auto border border-black' alt='bird' src={i.image} />
                </div>
    })

    function navigateTo(e){
        history.push(`/${e.target.name}`)
    }

    return ( 


    <div className='mt-[8vh] h-[92vh] overflow-auto pb-[8vh] relative'>
          
        <div id='topPanel'
            className='w-full bg-slate-200 flex max-h-[750px] '>
            <div id='leftPanel'
                className='w-full  h-2/3'>
                    
                    <div id='leftPanel top image-container' 
                        className='w-full h-2/5 p-10 '>
                        <img className='object-cover h-full w-full max-h-[400px] border border-black' alt='bird' src='https://images.unsplash.com/photo-1601852816455-e1341014b750?auto=format&fit=crop&q=80&w=1744&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                    </div>

                    <div id='leftPanel bottom'
                        className='w-full h-2/5 p-10 pt-0 flex flex-col '>

                            <div className='w-full h-full grid place-content-center'>
                                <h1 className='text-[50px] sm:text-[60px] lg:text-[80px] text-wrap font-bold'>Bird Watcher</h1>
                            </div>


                            <div
                                className='w-full h-full grid place-content-center'    
                            >
                                <p className='text-xs text-center m-auto w-3/4 py-5'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint. </p>
                               
                                <div className='flex flex-col gap-2'>
                                    <button onClick={navigateTo} name='login' className='text-center w-3/4 lg:w-1/2 p-1 m-auto bg-black text-white'>Login</button>
                                    <button onClick={navigateTo} name='signup' className='text-center w-3/4 lg:w-1/2 p-1 m-auto bg-black text-white'>Signup</button>

                                </div>

                            </div>
                    </div>
                    

            </div>
            <div id='rightPanel' 
                className='hidden w-1/3 h-full py-5  sm:flex flex-col justify-around'>
                
                { renderRightPanelImages }

            </div>
 
        </div>

        <div id='bottomPanel' 
            className='w-full py-5 justify-around items-center flex flex-col sm:flex-row  '>

            {renderBottomCards}
        </div>


    </div> 
);
}

export default Landing2;