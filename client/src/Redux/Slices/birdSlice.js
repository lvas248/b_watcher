import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBirds = createAsyncThunk(
    'get/birds',
    async( _,{ rejectWithValue })=>{
        const response = await fetch('/birds')
        const data = await response.json()
        if(response.ok){
            return data
        }
        return rejectWithValue(data)
    }
)


const initialState = {
    entity: {
        userBirds: [],
        allBirds: []
    },
    status: 'idle',
    error: null
}

const birdSlice = createSlice({
    name: 'bird',
    initialState,
    reducers:{
        addUserBirds: ( state, action )=>{
            state.entity.userBirds = action.payload
        },
        removeAllBirds: ( state )=>{
            state.entity = {}
        }, 
        addToBirds: ( state, action ) =>{
            //Add to userBirds if it doesn't exist
           const bird =  state.entity.userBirds.find( b => b.id === action.payload.id)
           if(!bird){
            state.entity.userBirds = [action.payload, ...state.entity.userBirds].sort((a,b)=> {
               if( a.name < b.name ) return -1
               else if (a.name > b.name) return 1
               else return 0
            })
            //Add to all birds, if doesn't exist
            const birdInAllBirds =  state.entity.allBirds.find( b => b.id === action.payload.id)
            if(!birdInAllBirds){
                state.entity.allBirds = [action.payload, ...state.entity.allBirds].sort((a,b)=> {
                   if( a.name < b.name ) return -1
                   else if (a.name > b.name) return 1
                   else return 0
                })
           }
        }
        }, 
        removeBird: ( state, action)=>{
            state.entity.userBirds = state.entity.userBirds.filter( b => b.id !== action.payload)
        }

    },
    extraReducers: (builder) =>{
        builder
        .addCase(getAllBirds.pending, state =>{
            state.status = 'pending'
            state.error = null
        })
        .addCase(getAllBirds.rejected, ( state, action ) =>{
            state.status = 'idle'
            state.error = action.payload
        })
        .addCase(getAllBirds.fulfilled, ( state, action ) =>{
            state.status = 'idle'
            state.error = null
            state.entity.allBirds = action.payload
        })
    }

})

export const { addUserBirds, removeAllBirds, addToBirds, removeBird } = birdSlice.actions
export default birdSlice.reducer;