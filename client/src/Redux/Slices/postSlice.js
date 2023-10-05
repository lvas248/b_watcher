import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitPost = createAsyncThunk(
    'submit/post',
    async(formData, { rejectWithValue })=>{
        const response = await fetch('/post',{
            method:'POST',
            // headers: {
            //     'Content-type':'application/json'
            // },
            body: formData
        })
        const data = await response.json()

        if(response.ok)return data
        
        return rejectWithValue(data)
    }
)


const initialState = {
    entity: [],
    status: 'idle',
    error: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        addPosts: ( state, action )=>{
            state.entity = action.payload
            state.error = null
            state.status = 'idle'
        },
        removePosts: ( state )=>{
            state.entity = []
            state.error = null
            state.status = 'idle'
        }

    },
    extraReducers: (builder) =>{
        builder
            .addCase(submitPost.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase(submitPost.rejected, ( state, action ) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase(submitPost.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity = [action.payload ,...state.entity]
            })
    }


})

export const { addPosts, removePosts } = postSlice.actions
export default postSlice.reducer;