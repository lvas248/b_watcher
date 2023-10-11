import { useState, useRef } from "react";
import Map, { GeolocateControl, Marker, FullscreenControl } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css";

function MyMap({display, toggleMap, setLocation}){

    const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

    const [ marker, setMarker ] = useState({lng: -73.9712,
        lat: 40.7831})

    function handleMarkerChange(e){
        setMarker({ lng: e.lngLat.lng, lat: e.lngLat.lat})
    }

    function handleLocationSelect(){
        setLocation(marker)
        toggleMap()
    }

    return ( 
        <div className={`${!display && 'hidden'} max-w-[400px] m-auto relative`}>

            <Map
                mapboxAccessToken={mapboxApiKey}
                initialViewState={{
                    longitude: -73.9712,
                    latitude: 40.7831,
                    zoom: 10
                  }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ 
                    height: '300px', 
                    width: 'auto',
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
                        setMarker({lng: p.coords.longitude, lat: p.coords.latitude}, )
                    }}
                />

                <Marker 
                    longitude={marker.lng}
                    latitude={marker.lat}
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