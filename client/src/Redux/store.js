import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice'
import sessionReducer from './Slices/sessionSlice';
import postReducer from './Slices/postSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer,
        post: postReducer
    }
})

export default store;