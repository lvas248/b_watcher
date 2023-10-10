import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToBirds, removeBird } from "./birdSlice";

export const submitPost = createAsyncThunk(
    'submit/post',
    async(formData, { dispatch, rejectWithValue })=>{
        const response = await fetch('/post',{
            method:'POST',
            // headers: {
            //     'Content-type':'application/json'
            // },
            body: formData
        })
        const data = await response.json()

        if(response.ok){
            dispatch(addToBirds(data.filtered_bird))
            return data
        }
        
        return rejectWithValue(data)
    }
)

export const updatePost = createAsyncThunk(
    'update/post',
    async( obj, { dispatch, rejectWithValue })=>{
        const response = await fetch(`/post/${obj.post_id}`,{
            method:'PATCH',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({post: obj.post})
        })
        const data = await response.json()

        if(response.ok){
            dispatch(addToBirds(data.filtered_bird))
            return data
        }
        
        return rejectWithValue(data)
    }
)

export const deletePost = createAsyncThunk(
    'delete/post',
    async( obj, { dispatch, rejectWithValue, getState })=>{
        const response = await fetch(`/post/${obj.post_id}`,{
            method:'DELETE'
        })
        const data = await response
        
        if(response.ok){
            const state = getState()
            const postsWithBird = state.post.entity.filter( p => p.filtered_bird.id === obj.bird_id)
            if(postsWithBird.length === 1) dispatch(removeBird(obj.bird_id))
            return obj.post_id
        }
        
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

            .addCase(updatePost.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase(updatePost.rejected, ( state, action ) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase(updatePost.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity = state.entity.map( p =>{
                    if(p.id === action.payload.id) return action.payload
                    else return p
                })
            })

            .addCase(deletePost.pending, ( state ) =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase(deletePost.rejected, ( state, action ) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase(deletePost.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity = state.entity.filter( p => p.id !== action.payload)
            })
    }


})

export const { addPosts, removePosts } = postSlice.actions
export default postSlice.reducer;