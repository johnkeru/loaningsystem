import { createSlice } from "@reduxjs/toolkit";

export const lenderSlice = createSlice({
    name: "lenders",
    initialState: {
        lenders: [],
    },
    reducers: {
        init_lenders: (state, action) => {
            state.lenders = action.payload;
        },
        add_lender: (state, action) => {
            state.lenders.unshift(action.payload);
        },
        update_lender: (state, action) => {
            const id = action.payload.id;
            const data = action.payload;
            const index = state.lenders.findIndex((lender) => lender.id === id);
            if (index !== -1) {
                state.lenders[index] = { ...state.lenders[index], ...data };
            }
        },
        remove_lender: (state, action) => {
            state.lenders = state.lenders.filter(
                (lender) => lender.id !== action.payload
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { init_lenders, add_lender, update_lender, remove_lender } =
    lenderSlice.actions;
export default lenderSlice.reducer;
