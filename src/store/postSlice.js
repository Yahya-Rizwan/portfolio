import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice ({
    name: "allPosts",
    initialState,
    reducers: {
        addPost: (state, action)=>{
            return action.payload;
        },
    }
})

export const {addPost}  = postSlice.actions;

export default postSlice.reducer;