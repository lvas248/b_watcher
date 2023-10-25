import { useState } from 'react'

function Geosearch({mapboxApiKey, zoomToSelectedResult}) {

    const [ searchText, setSearchText ] = useState('')
    const [ searchResults, setSearchResults ] = useState([])

    function selectResult(r){
        zoomToSelectedResult(r)
        setSearchText(r.place_name)
        clearResults()
    }

    function handleSearch(){
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(searchText)}.json?access_token=${mapboxApiKey}`)
        .then(res => res.json())
        .then( data=> setSearchResults(data.features) )
    }

    function clearSearchText(){
        setSearchText('')
        clearResults()
    }

    function clearResults(){
        setSearchResults([])
    }

    const renderResults = searchResults?.map( r =>{
        return <button onClick={()=>selectResult(r)} type='button' className='text-left pl-1 text-[10px] hover:bg-slate-400' key={r.id}><p>{r.place_name}</p></button>
    })


    return ( 
    
        <div className='border-2 border-black text-xs bg-white w-full m-auto'>

            <div className='flex justify-between'>

                <input value={searchText} placeholder='address...' className='p-1 w-full' onChange={e => setSearchText(e.target.value)} />
                
                <div className=' border-l-2 border-black bg-white font-bold flex justify-between'>
                    <button className='p-1 border-r-2 border-black text-center' onClick={clearSearchText} type='button' >Clear</button>
                    <button className='p-1' onClick={handleSearch} type='button'>Search</button>
                </div>
            </div>
            
            <div className={`${renderResults.length < 1 && 'hidden'} relative border-t-2 border-black  `}>
                <div className='flex flex-col w-full bg-white divide-y border '>
                    {renderResults}
                </div>
            </div>
        </div> 
    );
}

export default Geosearch;