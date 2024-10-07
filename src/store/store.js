import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import PostSlice from './postSlice';

const store = configureStore({
    reducer:{
        auth : authSlice,
        allPosts: PostSlice,
    }
})
export default store;