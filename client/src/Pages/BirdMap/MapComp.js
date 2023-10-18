import { useEffect, useRef, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css";

function MapComp({posts, bounds}) {


    const mapRef = useRef(null)
    const history = useHistory()
    const { id } = useParams()

    const [ displayBlurb, setDisplayBlurb ] = useState( id ? true : false)

    const post = posts.find( p => p.id === parseInt(id))

    // const defaultLocation = { longitude: -98.5795, latitude: 39.8283,  zoom: 2.3 }
    const postLocation = { longitude: post?.place?.longitude, latitude: post?.place?.latitude, zoom: 13}  

    function zoomTo(place){
        if(mapRef.current) mapRef.current.flyTo(place)
    }

    useEffect(()=>{
            if(post){
                zoomTo({
                    center: [post.place.longitude, post.place.latitude],
                    zoom: 12,
                    duration: 1000
                })            
            }else if(!Number.isNaN(bounds.longitude)){
                zoomTo(
                    {
                        center: [bounds.longitude, bounds.latitude],
                        zoom: 9.5,
                        duration: 1000
                    }
                )
            }

    },[post, bounds])

    function selectPost(p=''){
        history.push(`/map/${p?.id}`)
        setDisplayBlurb(true)

    }

    function zoomInOnSelection(){
        setDisplayBlurb(true)
        zoomTo({center: [post?.place?.longitude,  post?.place?.latitude ], zoom: 16})
    }

    function zoomeToBounds(){
        setDisplayBlurb(false)
        zoomTo({center: [bounds.longitude, bounds.latitude], zoom: bounds.zoom })
    }

    function navigateToFeed(){
        history.push(`/feed/${post.id}`)
    }
    function navigateToFeedAndAddFilter(){
        history.push(`/feed?filter=${post.filtered_bird.name}`)
    }

    const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

    const renderMarkers = posts?.map( p => {
        return <Marker
                    key={p.id}
                    latitude={p.place.latitude}
                    longitude={p.place.longitude}
                    onClick={()=>selectPost(p)}
                >
                    <button  className={` ${(post?.id !== p.id )&& 'hover:animate-scale-large'} `}>
                        <img className={`${post?.id === p.id ? 'h-[50px] border-4 border-[#3A9BDC]' : 'h-[30px]'  }  rounded-full border border-black hover:z-50`} alt='marker' src={p?.filtered_bird?.thumbnail} />
                    </button>
                </Marker>
    })

    return ( 
        <div className='p-5 max-w-[1050px] m-auto'>

            <Map
                ref={mapRef}
                mapboxAccessToken={mapboxApiKey}
                initialViewState={postLocation.longitude ? postLocation : bounds}

                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ 
                    height: '85vh', 
                    width: 'auto',
                    margin: 'auto',
                    border: '2px solid black'
                }}
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    onGeolocate={()=>setDisplayBlurb(false)}

                />
                <NavigationControl />

                <div id='customButtons' 
                    className='absolute top-2 right-20 flex gap-2 z-10 font-bold '>
                    <button onClick={zoomeToBounds} className=' border p-1 rounded bgBlue text-white drop-shadow-md' >View All Birds</button>
                    <button onClick={zoomInOnSelection} className={`${!post && 'hidden'} border p-1 rounded drop-shadow-md bgBlue text-white`}>Zoom on Selected</button>
                </div>

                {renderMarkers}

                <div id='blurb'
                    className={`${( !displayBlurb || (post === undefined) ) && 'hidden'} absolute bottom-[5%] left-[50%] transform -translate-x-1/2 w-[80%] text-xs bg-white p-2 rounded-lg animate-fade-in drop-shadow-md`}
                >
                    <button onClick={()=>setDisplayBlurb(false)} className='float-right w-fit h-fit p-2 text-center'>X</button>
                    
                    <p>{post?.filtered_bird?.name}</p>
                    <p>Posted On: {post?.created_date}</p>

                    <div className='flex gap-2'>
                        <button onClick={navigateToFeed} className='text-left underline'>view post</button>         
                        <button  onClick={navigateToFeedAndAddFilter} className='text-left underline'>view all {post?.filtered_bird?.name} posts</button>             
                    </div>

                </div>
                


           

                          
            </Map>

        </div>
     );
}

export default MapComp;