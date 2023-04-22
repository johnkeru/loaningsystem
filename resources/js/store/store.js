import { configureStore } from "@reduxjs/toolkit";
import listingsSlice from "./reducers/listings_slice";
import current_user_slice from "./reducers/current_user_slice";

export default configureStore({
    reducer: {
        listing: listingsSlice,
        current_user: current_user_slice,
    },
});
