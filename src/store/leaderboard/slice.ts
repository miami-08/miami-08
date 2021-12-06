/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import TLeaderBoard from 'types/TLeaderBoard';

export const initialState: TLeaderBoard = {
    leaderboardInfo: [],
    pending: false,
    error: null,
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
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
        setLeaderboard(state, action) {
            state.pending = false;
            state.error = null;
            state.leaderboardInfo = action.payload;
        },
    },
});

export const { dataFetching, setLeaderboard, dataFailed } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
