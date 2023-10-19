import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserInfo = createAsyncThunk(
    'updateEmail/user',
    async( obj,{ rejectWithValue })=>{
        const response = await fetch('/update_user',{
            method:'PATCH',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({ user: obj})
        })
        const data = await response.json()

        if(response.ok) return data.email
        return rejectWithValue(data)
    }
)

const initialState = {
    entity: { email: ''},
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        removeUser: ( state )=>{
            state.entity = initialState
            state.error = null
            state.status = 'idle'
        },
        addUser: ( state, action )=>{
            state.entity.email = action.payload
            state.error = null
            state.status = 'idle'
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase( updateUserInfo.pending, ( state ) =>{
                state.status = 'pending'
                state.error = null
            } )
            .addCase( updateUserInfo.rejected, ( state, action) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( updateUserInfo.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity.email = action.payload
            })
    }
})

export const { removeUser, addUser } = userSlice.actions
export default userSlice.reducer;