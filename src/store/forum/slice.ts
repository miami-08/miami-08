/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import TForum from 'types/TForum';

export const initialState: TForum = {
    forumData: null,
    pending: false,
    error: null,
};

const forumSlice = createSlice({
    name: 'forum',
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
        setForumData(state, action) {
            state.pending = false;
            state.error = null;
            state.forumData = action.payload;
        },
    },
});

export const { dataFetching, setForumData, dataFailed } = forumSlice.actions;

export default forumSlice.reducer;
