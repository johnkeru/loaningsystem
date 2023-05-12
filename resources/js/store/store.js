import { configureStore } from "@reduxjs/toolkit";
import lendersSlice from "./reducers/lenders_slice";
import borrowersSlice from "./reducers/borrowers_slice";

export default configureStore({
    reducer: {
        lendersSlice,
        borrowersSlice,
    },
});
