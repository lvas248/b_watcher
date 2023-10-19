import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./sessionSlice";
import { removeUserBirds } from "./birdSlice";
import { removePosts } from "./postSlice";

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

export const deleteAccount = createAsyncThunk(
    'delete/user',
    async( obj,{ dispatch, rejectWithValue })=>{
        const response = await fetch('/delete_account',{
            method:'DELETE',
        })
        const data = await response

        if(response.ok){
            dispatch(logout())
            dispatch(removeUserBirds())
            dispatch(removePosts())
            return 
        }
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
            .addCase( deleteAccount.pending, ( state )=>{
                state.status = 'pending'
            })
            .addCase( deleteAccount.rejected, ( state, action )=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( deleteAccount.fulfilled, ( state, action ) => {
                state.status = 'idle'
                state.error = null
                state.entity.email = ''
            } )
    }
})

export const { removeUser, addUser } = userSlice.actions
export default userSlice.reducer;