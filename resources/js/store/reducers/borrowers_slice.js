import { createSlice } from "@reduxjs/toolkit";

export const borrowersSlice = createSlice({
    name: "borrowers",
    initialState: {
        borrowers_list: [],
        borrowers_count: 0,
        borrowed_from_list: [],
        borrowed_from_count: 0,
    },
    reducers: {
        init: (state, action) => {
            state.borrowers_list = action.payload.borrowers_list;
            state.borrowers_count = action.payload.borrowers_count;
            state.borrowed_from_list = action.payload.borrowed_from_list;
            state.borrowed_from_count = action.payload.borrowed_from_count;
        },
    },
});

export const { init, add, update, remove } = borrowersSlice.actions;
export default borrowersSlice.reducer;
