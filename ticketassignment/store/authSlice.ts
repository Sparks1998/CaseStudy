/**
 * Authentication slice for managing user login state using Redux Toolkit.
 * Handles user login, logout, and state management.
 */

import { gql } from "@apollo/client";
import client from "@/graphql/apolloClient";
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { User } from "@/assets/types/user";
import { removeAuthToken } from "@/utils/storage";
import { StoreState } from "@/store/StoreStateTypes";

/**
 * Interface representing the authentication state.
 * Extends the base StoreState with a boolean flag for login status.
 */
interface LoginState extends StoreState<User> {
	isLoggedIn : boolean;
}

/**
 * Initial state for the authentication slice.
 */
const initialState: LoginState = {
    data: null,
    isLoggedIn: false,
    status: "idle",
    errors: null,
};

/**
 * Interface representing the arguments required for user login.
 */
interface LoginArgs {
	email : string;
	password : string;
	rememberToken : boolean;
}

/**
 * GraphQL mutation for logging in a user.
 */
const loginMutation = gql`
    mutation Login($email: String!, $password: String!, $rememberToken: Boolean!) {
        login(userData: {email: $email, password: $password, rememberToken: $rememberToken}) {
            id
            firstName
            lastName
            email
        }
    }
`;

/**
 * Async thunk for logging in a user.
 * Handles the login process by making a GraphQL mutation request.
 */
export const loginUser = createAsyncThunk<User, LoginArgs>(
    "auth/login",
    async ({ email, password, rememberToken }: LoginArgs, { rejectWithValue }) => {
        try {
            const response = await client.mutate({
                mutation: loginMutation,
                variables: { email, password, rememberToken },
            });

            return response.data.login;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Redux slice for authentication.
 * Manages the state related to user login and logout.
 */
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /**
         * Logs the user out by clearing the state and removing the auth token.
         */
        logout(state) {
            state.data = null;
            state.status = "idle";
            state.errors = null;
            state.isLoggedIn = false;
            removeAuthToken().then();
        },

        /**
         * Marks the user as logged in.
         */
        setAsLoggedIn(state) {
            state.isLoggedIn = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "waiting";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "fail";
                state.errors = action.payload as string;
            });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;