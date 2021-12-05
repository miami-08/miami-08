/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import TAuthStatus from 'types/TAuthStatus';

export const initialState: TAuthStatus = {
    pending: false,
    error: null,
    serviceId: null,
};

const authStore = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInFetching(state) {
            state.pending = true;
            state.error = null;
        },
        logInLoaded(state) {
            state.pending = false;
            state.error = null;
        },
        logInFailed(state, action) {
            state.pending = false;

            const { payload = null } = action;

            state.error = payload;
        },
        logOutFetching(state) {
            state.pending = true;
            state.error = null;
        },
        logOutLoaded(state) {
            state.pending = false;
            state.error = null;
        },
        logOutFailed(state, action) {
            state.pending = false;
            state.error = action.payload;
        },
        signupFetching(state) {
            state.pending = true;
            state.error = null;
        },
        signUpLoaded(state) {
            state.pending = false;
            state.error = null;
        },
        signUpFailed(state, action) {
            state.pending = false;
            state.error = action.payload;
        },
        setOAuthServiceId(state, action) {
            state.serviceId = action.payload;
        },
        resetOAuthServiceId(state) {
            state.serviceId = null;
        },
    },
});

export const {
    logInFetching,
    logInLoaded,
    logInFailed,
    logOutFetching,
    logOutLoaded,
    logOutFailed,
    signupFetching,
    signUpLoaded,
    signUpFailed,
    setOAuthServiceId,
    resetOAuthServiceId,
} = authStore.actions;

export default authStore.reducer;
