import { useState, useRef, useEffect } from "react";
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import Geosearch from "./Geosearch";
import "mapbox-gl/dist/mapbox-gl.css";

function MyMap({display, toggleMap, setPlace, currentLocation=false}){

  
    const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

    const mapRef = useRef(null)

    const [ marker, setMarker ] = useState({ longitude: -73.9712, latitude: 40.7831 })

    function zoomToSelectedResult(r){

        const [ longitude, latitude ] = r.center

        setMarker({longitude: longitude, latitude: latitude})

        r.bbox ? mapRef.current?.fitBounds(r.bbox) : mapRef.current?.flyTo({center: r.center, zoom: 15})
   
    }

    function handleMarkerChange(e){
        setMarker({ longitude: e.lngLat.lng, latitude: e.lngLat.lat})
    }

    function handleLocationSelect(){
        setPlace(marker)
        toggleMap()
    }

    useEffect( ()=>{
        if(currentLocation.longitude){
            zoomToSelectedResult({center: [ currentLocation?.longitude, currentLocation?.latitude]})
        } 
    }, [currentLocation])

    return ( 
        <div className={`${!display && 'hidden'} h-full m-auto relative w-[400px]`}>


            <Map
                ref={mapRef}
                mapboxAccessToken={mapboxApiKey}
                initialViewState={{
                    longitude: marker.longitude,
                    latitude: marker.latitude,
                    zoom: 10
                  }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ 
                    height: '300px', 
                    width: 'auto',
                    margin: 'auto',
                    border: '1px solid black'
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

                <NavigationControl />


                <Marker 
                    longitude={marker?.longitude}
                    latitude={marker?.latitude}
                    draggable
                    onDragEnd={handleMarkerChange}
                />

                
                <div className='absolute top-1 left-1 w-[80%]'>
                    <Geosearch mapboxApiKey={mapboxApiKey} zoomToSelectedResult={zoomToSelectedResult} />
                </div>


                <div className='absolute bottom-2 z-50 w-full flex items-center'>
                    <button onClick={toggleMap} type='button' className=' bg-white border border-black p-2 w-[50%] max-w-[200px] m-auto'>Back</button>
                    <button onClick={handleLocationSelect} type='button' className=' bg-white border border-black p-2 w-[50%] max-w-[200px] m-auto'>Select</button>
                </div>

            </Map>

        </div>  
    );
}

export default MyMap;