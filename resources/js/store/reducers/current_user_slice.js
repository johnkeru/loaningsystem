import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
    name: "current_user_slice",
    initialState: {
        userInfo: null,
        isLogged: false,
    },
    reducers: {
        setLoggedIn: (state) => {
            state.isLogged = true;
        },
        setLoggedOut: (state) => {
            state.isLogged = false;
        },
        user_info: (state, action) => {
            state.listings = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { user_info, setLoggedIn, setLoggedOut } =
    currentUserSlice.actions;
export default currentUserSlice.reducer;
