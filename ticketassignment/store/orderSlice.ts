/**
 * Order slice to manage order-related state including fetching orders.
 * Utilizes Redux Toolkit's createAsyncThunk and createSlice for async actions and state management.
 */

import { gql } from "@apollo/client";
import client from "@/graphql/apolloClient";
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { Order } from "@/assets/types/Order";
import { StoreStateArray } from "@/store/StoreStateTypes";

/**
 * State interface for managing an array of orders.
 * Extends the base StoreStateArray.
 */
interface OrderState extends StoreStateArray<Order> {}

/**
 * Initial state of the order slice.
 */
const initialState: OrderState = {
    data: [],
    errors: null,
    status: "idle",
};

/**
 * GraphQL query to fetch orders.
 */
const ordersQuery = gql`
    query GetOrders {
        orders {
            id
            purchasedAmount
            ticket {
                id
                quantity
                event {
                    id
                    eventName
                    eventDate
                }
            }
        }
    }
`;

/**
 * Async thunk to fetch orders asynchronously.
 */
export const getOrders = createAsyncThunk<Order[], void>(
    "orders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await client.query({
                query: ordersQuery,
                fetchPolicy: "network-only",
            });

            return response.data.orders;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Redux slice for order management.
 */
const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        /**
         * Clears the order state data.
         */
        clear(state) {
            state.data = [];
        },
    },
    extraReducers: (builder) => {
        // Handle fetch orders
        builder
            .addCase(getOrders.pending, (state) => {
                state.status = "waiting";
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "success";
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.status = "fail";
                state.errors = action.payload as string;
            });
    },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;