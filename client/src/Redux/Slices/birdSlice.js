import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    entity: [],
    status: 'idle',
    error: null
}

const birdSlice = createSlice({
    name: 'bird',
    initialState,
    reducers:{
        addBirds: ( state, action )=>{
            state.entity = action.payload
        },
        removeBirds: ( state )=>{
            state.entity = []
        }, 
        addToBirds: ( state, action ) =>{
           const bird =  state.entity.find( b => b.id === action.payload.id)
           if(!bird){
            state.entity = [action.payload, ...state.entity].sort((a,b)=> {
               if( a.name < b.name ) return -1
               else if (a.name > b.name) return 1
               else return 0
            })
           }
        }

    }

})

export const { addBirds, removeBirds, addToBirds } = birdSlice.actions
export default birdSlice.reducer;