import { useState } from 'react'
import Map, { GeolocateControl, Marker, FullscreenControl } from 'react-map-gl'
import "mapbox-gl/dist/mapbox-gl.css";

function SelectMap() {
    const mapboxApiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

    const [ marker, setMarker ] = useState(
        {
            lng: -73.9712,
            lat: 40.7831
        })

        function handleLocationSelect(){
            setPlace(marker)
            toggleMap()
        }

    return ( 
    
    <div>

    </div> );
}

export default SelectMap;