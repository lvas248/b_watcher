import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice'
import sessionReducer from './Slices/sessionSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer
    }
})

export default store;