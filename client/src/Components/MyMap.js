import { useState} from "react";
import Map, { GeolocateControl, Marker, FullscreenControl } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css";

function MyMap({display, toggleMap, setPlace, currentLocation=false}){

    const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

    const [ marker, setMarker ] = useState({ longitude: currentLocation.longitude || -73.9712,
        latitude: currentLocation.latitude || 40.7831})

    function handleMarkerChange(e){
        setMarker({ longitude: e.lngLat.lng, latitude: e.lngLat.lat})
    }

    function handleLocationSelect(){
        setPlace(marker)
        toggleMap()
    }

    return ( 
        <div className={`${!display && 'hidden'} h-full m-auto relative`}>

            <Map
                mapboxAccessToken={mapboxApiKey}
                initialViewState={{
                    longitude: marker.longitude,
                    latitude: marker.latitude,
                    zoom: 10
                  }}
                
                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ 
                    height: '300px', 
                    width: '400px',
                    margin: 'auto',
                    border: '2px solid black'
                }}                
            >

                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    onError={(error) => {
                        console.error('Geolocation error:', error);
                      }}
                    onGeolocate={(p)=>{
                        setMarker({longitude: p.coords.longitude, latitude: p.coords.latitude}, )
                    }}
                />

                <Marker 
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    draggable
                    onDragEnd={handleMarkerChange}
                />

                <FullscreenControl />

                <div className='absolute bottom-2 z-50 w-full flex items-center'>
                    <button onClick={handleLocationSelect} type='button' className=' bg-white border border-black p-2 w-[50%] max-w-[200px] m-auto'>Select</button>
                </div>

            </Map>

        </div>  
    );
}

export default MyMap;