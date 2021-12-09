/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import TUserProfile from 'types/TUserProfile';

export const initialState: TUserProfile = {
    userInfo: null,
    pending: false,
    error: null,
};

const userSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        dataFetching(state) {
            state.pending = true;
            state.error = null;
        },
        dataFailed(state, action) {
            state.pending = false;
            state.error = action.payload;
        },
        setUserData(state, action) {
            state.pending = false;
            state.error = null;
            state.userInfo = action.payload;
        },
        resetUserData(state) {
            state.pending = false;
            state.error = null;
            state.userInfo = null;
        },
    },
});

export const {
    dataFetching, setUserData, dataFailed, resetUserData,
} = userSlice.actions;

export default userSlice.reducer;
