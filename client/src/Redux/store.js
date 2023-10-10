import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice'
import sessionReducer from './Slices/sessionSlice'
import postReducer from './Slices/postSlice'
import birdReducer from './Slices/birdSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer,
        post: postReducer,
        bird: birdReducer
    }
})

export default store;