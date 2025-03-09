/**
 * Central Redux store configuration.
 * Combines reducers from different slices (auth, event, order) into a single store.
 */

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import orderSlice from "@/store/orderSlice";

/**
 * Redux store configuration.
 */
export const store = configureStore({
    reducer: {
        auth: authSlice,
        event: eventSlice,
        order: orderSlice,
    },
});

/**
 * Type representing the root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function for the Redux store.
 */
export type AppDispatch = typeof store.dispatch;